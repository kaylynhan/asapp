import json

import logging
import csv
import re
import sys

GPA_INDEX = 0
WORKLOAD_INDEX = 1
RATING_INDEX = 2

DAYS = ['M', 'W', 'F', 'Tu', 'Th']

MISSING_COURSES = ['CAT 125R']
logging.basicConfig(filename='combine.log', filemode='w', level=logging.DEBUG, format='%(levelname)s - %(name)s:%(filename)s:%(lineno)d - %(message)s')


def format_time(time):
	for i in range(len(time)):
		t = time[i]
		if t == 'TBA':
			time[0] = 'TBA'
			time.append('TBA')
			continue

		hour = int(re.findall('\d+', t.split(':')[0])[0])
		if 'p' in t and hour != 12:
			hour += 12

		minute = re.findall('\d+', t.split(':')[1])[0]
		if hour < 10:
			hour = f'0{hour}'

		time[i] = f'{hour}{minute}'


def add_to_obj(course_obj, department, num, final_obj):
	final_obj[f'{department} {num}'] = {
		'number': num,
		'department': department,
		'name': course_obj['name'].strip(),
		'description': course_obj['description'].strip(),
		'prereqs': course_obj['prereqs'].strip()
	}


def fix_course_obj():

	with open('course.json') as in_file:
		course_list = json.load(in_file)

	added_courses = {}

	for key in course_list:
		course_obj = course_list[key]
		course_info = key.split()

		if '(' in key and ')' in key:
			department = re.findall('\(\d*\w*\)', key)[0]
			department = department[1:len(department) - 1]
			num = key.split()[-1]

			add_to_obj(course_obj, department, num, added_courses)

		elif '/' in key:
			course_ids = key.split('/')
			all_department = None
			all_num = None

			if len(course_ids[0].split()) == 1:
				all_num = course_ids[-1].split()[1]
			elif len(course_ids[0].split()) == 2:
				all_department = course_ids[0].split()[0]
			else:
				print("Error")
				sys.exit()

			for i, course_id in enumerate(course_ids):
				department = num = None
				if len(course_id.split()) == 2:
					department = course_id.split()[0]
					num = course_id.split()[1]
					add_to_obj(course_obj, department, num, added_courses)

				elif len(course_id.split()) == 1:

					if all_num is not None:
						num = all_num
						department = course_id

					if all_department is not None:
						department = all_department
						num = course_id

					add_to_obj(course_obj, department, num, added_courses)

				else:
					logging.error(f'Could not find course id from "{course_id}"')
					continue

		elif ' or ' in key:
			assert len(course_info) == 4

			department = course_info[0]
			course_ids = [course_info[1], course_info[3]]
			for num in course_ids:
				add_to_obj(course_obj, department, num, added_courses)

		elif '-' in key and len(course_info) == 3:
			letters = course_info[2]
			department = course_info[0]
			base_num = course_info[1]
			for letter in letters.split('-'):
				add_to_obj(course_obj, department, base_num + letter, added_courses)

		elif '-' in key and len(course_info) == 2:
			keys = key.split('-')

			assert len(keys[0].split()) == 2
			department = keys[0].split()[0]
			course_nums = key.split()[1].split('-')
			for num in course_nums:
				add_to_obj(course_obj, department, num, added_courses)

		else:
			try:
				num = key.split()[1]
				department = key.split()[0]
			except IndexError:
				num = 'N/A'
				department = 'N/A'

			add_to_obj(course_obj, department, num, added_courses)
			# course['link'] = \
			#     f'http://cape.ucsd.edu/responses/Results.aspx?courseNumber={course["department"]}+{course["number"]}'

	course_list = added_courses

	# Fix random whitespace errors
	bad_keys = set()
	for key in course_list:

		# Some course numbers start with 0*
		if ' 0' in key:
			bad_keys.add(key)

		if ':' in key:
			bad_keys.add(key)

	for key in bad_keys:
		new_key = re.sub('\s+0', ' ', key).strip()
		new_key = re.sub(':', '', new_key).strip()
		course_list[new_key] = course_list[key]
		del course_list[key]

	# for course_id in MISSING_COURSES:
	# 	course_obj = {}
	# 	course_obj['id'] = course_id
	# 	course_obj['number'] = course_id.split()[1]
	# 	course_obj['department'] = course_id.split()[0]
	# 	course_obj['name'] = 'N/A'
	# 	course_obj['description'] = 'N/A'
	# 	course_obj['prereqs'] = ''
	# 	course_obj['units'] = -1
	# 	course_list[course_id] = course_obj

	return course_list


def parse_courses(course_list):

	with open('dataWI2020.csv') as in_file:
		csv_reader = csv.reader(in_file)

		# Holds the meetings that occur for all sections in a course
		course_meetings = []
		curr_course_id = None
		curr_section_char = None
		section_meeting_types = set()
		recent_section = None
		recent_course_id = None
		section_found = True

		for line in csv_reader:

			course_id = re.sub(' +', ' ', line[0])
			section_id = line[1]

			try:
				course_obj = course_list[course_id]
			except KeyError:
				logging.warning(f'{course_id} was not found in course catalog')

				course = {}
				course['id'] = course_id
				course['number'] = course_id.split()[1]
				course['department'] = course_id.split()[0]
				course['name'] = 'N/A'
				course['description'] = 'N/A'
				course['prereqs'] = ''
				course['units'] = 0
				course_list[course_id] = course

			meeting_type = line[2]
			meeting_code = line[3]
			while len(meeting_code) < 3:
				meeting_code = "0" + meeting_code

			try:
				potential_units = re.findall('\(\d+\)', course_obj['name'])
				if len(potential_units) != 1:
					raise IndexError
				potential_units = re.findall('\d+', potential_units[0])
				numb_units = int(potential_units[0])
			except IndexError:
				numb_units = 0

				if course_obj['name'] == 'N/A':
					continue
				logging.warning(f'Cannot parse number of units from "{course_obj["name"]}"')

			day_str = line[4]
			day = []
			for d in DAYS:
				if d in day_str:
					day.append(d)

			time = line[5].split('-')
			building = line[6]
			room_num = line[7]
			last_name = line[8]
			first_name = line[9]
			name = re.sub(' +', ' ', f'{last_name}, {first_name}').strip()
			if name == "" or name == ",":
				name = 'STAFF'

			course_list[course_id]['units'] = numb_units

			format_time(time)

			# New course_meetings for following must be made
			if course_id != curr_course_id or curr_section_char != meeting_code[0]:

				if not section_found and recent_section and recent_course_id == curr_course_id:
					recent_section['meetings'].extend(course_meetings)

					section_found = True

				course_meetings.clear()
				section_meeting_types.clear()
				curr_course_id = course_id
				curr_section_char = meeting_code[0]

			# A meeting for every section of this course
			# Assume it always occurs before sections in the file
			if section_id == "":

				if section_found:
					course_meetings.clear()

				for d in day:
					course_meetings.append({
						'day': d,
						'start_time': time[0],
						'end_time': time[1],
						'building': building,
						'room_num': room_num,
						'type': meeting_type,
						'code': meeting_code,
						'id': section_id + meeting_code + d
					})

				section_found = False

				section_meeting_types.add(meeting_type)

				continue

			section_meeting_types.add(meeting_type)

			section_found = True

			if not 'sections' in course_list[course_id]:
				course_list[course_id]['sections'] = []

			section_meetings = []
			for d in day:
				section_meetings.append({
					'day': d,
					'start_time': time[0],
					'end_time': time[1],
					'building': building,
					'room_num': room_num,
					'type': meeting_type,
					'code': meeting_code,
					'id': section_id + meeting_code + d
				})

			section = {
				'id': section_id,
				'number': meeting_code,
				'professor': name,
				'meetings': course_meetings + section_meetings
			}

			# lecture_code = 0
			# for meeting in course_meetings:
			# 	if meeting['type'] == 'LE':
			# 		lecture_code = meeting['code'][0]
			# section['lecture_code'] = lecture_code

			recent_section = section
			recent_course_id = course_id

			course_list[course_id]['sections'].append(section)

	return course_list


def parse_CAPE():
	pass


def parse_CAPEs():
	with open('cape.csv') as in_file:
		csv_reader = csv.DictReader(in_file)

		total_cape_list = []
		for line in csv_reader:
			total_cape_list.append(line)

	cape_dict = {}  # instructor, course_id
	cape_courses = {}  # course_id
	for cape in total_cape_list:
		cape['Instructor'] = cape['Instructor'].strip()
		cape['Course'] = cape['Course'].split('-')[0].strip()
		instructor = cape['Instructor']
		course_id = cape['Course']
		if instructor not in cape_dict:
			cape_dict[instructor] = {}

		if course_id not in cape_dict[instructor]:
			cape_dict[instructor][course_id] = []

		cape_dict[instructor][course_id].append(cape)

		if course_id not in cape_courses:
			cape_courses[course_id] = []

		cape_courses[course_id].append(cape)

	course_cape_dict = {}
	for course_id in cape_courses:

		course_total_stats = [0, 0, 0]
		course_total_capes = [0, 0, 0]
		recent_cape_link = None

		for cape in cape_courses[course_id]:
			num_evals = int(cape['Evals Made'])
			num_enrolled = int(cape['Enroll'])

			if not recent_cape_link:
				recent_cape_link = cape['cape_link']

			workload = cape['Study Hrs/wk']
			class_rating = float(cape['Rcmnd Class'].split()[0])
			gpa = re.findall('\(\d*\.\d+\)', cape['Avg Grade Received'])

			if len(gpa) == 1:
				gpa = re.findall('\d*\.\d+', gpa[0])[0]
				gpa = float(gpa)

				course_total_stats[GPA_INDEX] += num_enrolled * gpa
				course_total_capes[GPA_INDEX] += num_enrolled

			try:
				workload = float(workload)

				course_total_stats[WORKLOAD_INDEX] += num_evals * workload
				course_total_capes[WORKLOAD_INDEX] += num_evals
			except ValueError:
				logging.warning(f'Workload: {workload} cannot be converted to a number')

			# Use class_rating for course ratings
			course_total_stats[RATING_INDEX] += num_evals * class_rating
			course_total_capes[RATING_INDEX] += num_evals

		# Account for stats with no available CAPE data
		for i in range(3):
			if course_total_capes[i] == 0:
				course_total_stats[i] = -1
				course_total_capes[i] = 1

		for i in range(3):
			course_total_stats[i] /= course_total_capes[i]

		if course_id not in course_cape_dict:
			course_cape_dict[course_id] = {}

		course_cape_dict[course_id] = {
			'gpa': course_total_stats[GPA_INDEX],
			'workload': course_total_stats[WORKLOAD_INDEX],
			'class_rating': course_total_stats[RATING_INDEX],
			'link': recent_cape_link
		}

	instructor_cape_dict = {}
	for instructor in cape_dict:
		instructor_cape_dict[instructor] = {}
		for course_id in cape_dict[instructor]:

			instructor_total_stats = [0, 0, 0]
			instructor_total_capes = [0, 0, 0]

			recent_cape_link = None

			cape_list = cape_dict[instructor][course_id]
			for cape in cape_list:
				num_evals = int(cape['Evals Made'])
				num_enrolled = int(cape['Enroll'])

				if not recent_cape_link:
					recent_cape_link = cape['cape_link']

				workload = cape['Study Hrs/wk']
				prof_rating = float(cape['Rcmnd Instr'].split()[0])
				gpa = re.findall('\(\d*\.\d+\)', cape['Avg Grade Received'])

				if len(gpa) == 1:
					gpa = re.findall('\d*\.\d+', gpa[0])[0]
					gpa = float(gpa)

					instructor_total_stats[GPA_INDEX] += num_enrolled * gpa
					instructor_total_capes[GPA_INDEX] += num_enrolled

				try:
					workload = float(workload)

					instructor_total_stats[WORKLOAD_INDEX] += num_evals * workload
					instructor_total_capes[WORKLOAD_INDEX] += num_evals
				except ValueError:
					logging.warning(f'Workload: {workload} cannot be converted to a number')

				# Use prof_rating for instructor ratings
				instructor_total_stats[RATING_INDEX] += num_evals * prof_rating
				instructor_total_capes[RATING_INDEX] += num_evals

			# Account for stats with no available CAPE data
			for i in range(3):
				if instructor_total_capes[i] == 0:
					instructor_total_stats[i] = -1
					instructor_total_capes[i] = 1

			for i in range(3):
				instructor_total_stats[i] /= instructor_total_capes[i]

			instructor_cape_dict[instructor][course_id] = {
				'gpa': instructor_total_stats[GPA_INDEX],
				'workload': instructor_total_stats[WORKLOAD_INDEX],
				'prof_rating': instructor_total_stats[RATING_INDEX],
				'link': recent_cape_link
			}

	return instructor_cape_dict, course_cape_dict


def combine_data(instructor_cape_dict, course_cape_dict, course_dict):
	to_delete = []
	missing_courses = set()

	for course_id in course_dict:
		if 'sections' not in course_dict[course_id]:
			to_delete.append(course_id)
			continue

		for section in course_dict[course_id]['sections']:
			prof = section['professor']
			try:
				section['gpa'] = instructor_cape_dict[prof][course_id]['gpa']
				section['workload'] = instructor_cape_dict[prof][course_id]['workload']
				section['prof_rating'] = instructor_cape_dict[prof][course_id]['prof_rating']
				section['link'] = instructor_cape_dict[prof][course_id]['link']
			except KeyError:
				if course_id not in course_cape_dict:
					missing_courses.add(course_id)
					section['gpa'] = -1
					section['workload'] = 0
					section['prof_rating'] = -1
					continue

				section['gpa'] = course_cape_dict[course_id]['gpa']
				section['workload'] = course_cape_dict[course_id]['workload']
				section['prof_rating'] = course_cape_dict[course_id]['class_rating']
				section['link'] = course_cape_dict[course_id]['link']

		if course_id not in course_cape_dict:
			course_dict[course_id]['gpa'] = -1
			course_dict[course_id]['workload'] = 0
			course_dict[course_id]['prof_rating'] = -1
			continue

		course_dict[course_id]['gpa'] = course_cape_dict[course_id]['gpa']
		course_dict[course_id]['workload'] = course_cape_dict[course_id]['workload']
		course_dict[course_id]['class_rating'] = course_cape_dict[course_id]['class_rating']

	for to_del in to_delete:
		del course_dict[to_del]

	with open('missing_course_capes.txt', 'w') as out_file:
		missing_courses = sorted(list(missing_courses))
		for course in missing_courses:
			out_file.write(f'{course}\n')


def parse_finals(course_dict):
	with open('final_data.csv') as in_file:
		csv_reader = csv.DictReader(in_file)

		for line in csv_reader:
			course_id = re.sub(' +', ' ', line['Course Name'])
			section_code = line['Section Number'][0]
			date = line['Date']
			time = line['Time'].split('-')
			format_time(time)

			if course_id not in course_dict:
				logging.error(f'{course_id} is not a valid course')
				continue

			course = course_dict[course_id]
			for section in course['sections']:
				if section['number'][0] == section_code:
					section['final'] = {
						'date': date,
						'start_time': time[0],
						'end_time': time[1]
					}


def fix_meeting_unique_id(course_dict):
	for course_id in course_dict:
		for section in course_dict[course_id]['sections']:
			for meeting in section['meetings']:
				meeting['id'] = section['id'] + meeting['code'] + meeting['day']


# Specific to WI20
def test_case(course_dict):
	# Take the weighted average of "CSE 110", "Griswold, William G."
	assert abs(course_dict['CSE 110']['sections'][0]['gpa'] - 3.092997) < 0.001
	assert len(course_dict['CSE 110']['sections']) == 2
	assert len(course_dict['CSE 120']['sections']) == 2
	assert len(course_dict['CSE 120']['sections']) == 2
	assert len(course_dict['BILD 3']['sections']) == 20
	assert len(course_dict['BILD 3']['sections'][0]['meetings']) == 3
	assert len(course_dict['BILD 3']['sections'][9]['meetings']) == 3
	assert len(course_dict['BILD 3']['sections'][10]['meetings']) == 4
	assert len(course_dict['CSE 152']['sections']) == 1
	assert len(course_dict['CSE 152']['sections'][0]['meetings']) == 4
	assert len(course_dict['SIO 162']['sections']) == 1
	assert len(course_dict['SIO 162']['sections'][0]['meetings']) == 3
	assert 'SIO 180' not in course_dict
	assert len(course_dict['CSE 167']['sections']) == 1
	assert len(course_dict['CSE 167']['sections'][0]['meetings']) == 3
	assert 'CENG 15' in course_dict
	assert len(course_dict['CENG 15']['sections'][0]['meetings']) == 4

	print("Test cases passed")


def main():
	instructor_cape_dict, course_cape_dict = parse_CAPEs()
	course_list = fix_course_obj()
	course_dict = parse_courses(course_list)

	combine_data(instructor_cape_dict, course_cape_dict, course_dict)
	fix_meeting_unique_id(course_dict)
	parse_finals(course_dict)

	test_case(course_dict)

	json_arr = []
	for course in course_dict:
		json_arr.append(course_dict[course])

	with open('combined.json', 'w') as out_file:
		json.dump(json_arr, out_file, indent=4)


if __name__ == '__main__':
	main()

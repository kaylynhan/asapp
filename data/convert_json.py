import json
import csv
import re

# Assumes there are two meetings for each course: Lecture and (Lab or Discussion)

# Needs course.json (course.csv converted to json online)
# Actually don't need it but its a lot easier

# Needs data.csv in format:
# course_id, meeting_type, section_numb, day, time, building, room_num, last_name, first_name


with open('course.json') as in_file:
    course_list = json.load(in_file)

# Fix random whitespace errors
bad_keys = []
for key in course_list:
    course = course_list[key]
    course['name'] = course['name'].strip()
    course['description'] = course['description'].strip()
    course['prereqs'] = course['prereqs'].strip()

    # Some course numbers start with 0*
    if ' 0' in key:
        bad_keys.append(key)

for key in bad_keys:
    print(key)
    new_key = re.sub('\s+0', ' ', key).strip()
    print(new_key)
    course_list[new_key] = course_list[key]
    del course_list[key]

with open('data.csv') as in_file, open('error.txt', 'w') as error_file:
    csv_reader = csv.reader(in_file)
    current_lec = None
    current_letter = None
    for line in csv_reader:

        course_id = re.sub(' +', ' ', line[0])

        try:
            course_obj = course_list[course_id]
        except KeyError:
            error_file.write(f'{course_id} is not a valid course\n')
            continue

        meeting_type = line[1]
        section_numb = line[2]
        try:
            potential_units = re.findall('\(\d+\)', course_obj['name'])
            if len(potential_units) != 1:
                raise IndexError
            potential_units = re.findall('\d+', potential_units[0])
            numb_units = int(potential_units[0])
        except IndexError:
            print(f'Cannot parse number of units from {course_obj["name"]}')
            numb_units = 0
        day = line[3]
        time = line[4].split('-')
        building = line[5]
        room_num = line[6]
        last_name = line[7]
        first_name = line[8]
        name = re.sub(' +', ' ', first_name + last_name).strip()

        course_list[course_id]['units'] = numb_units

        for i in range(len(time)):
            t = time[i]
            hour = int(re.findall('\d+', t.split(':')[0])[0])
            if 'p' in t and hour != 12:
                hour += 12

            minute = re.findall('\d+', t.split(':')[1])[0]
            if hour < 10:
                hour = f'0{hour}'

            time[i] = f'{hour}{minute}'

        if not 'section_dict' in course_list[course_id]:
            course_list[course_id]['section_dict'] = {}

        if section_numb.endswith('00'):
            current_letter = section_numb[0]
            current_lec = {
                'day': day,
                'start_time': time[0],
                'end_time': time[1],
                'building': building,
                'room_num': room_num,
                'meeting_type': meeting_type
            }
            course_list[course_id]['section_dict'][section_numb] = {
                'section_numb': section_numb,
                'professor': name,
                'meetings': [current_lec]
            }
            continue
            
        meeting = {
            'day': day,
            'start_time': time[0],
            'end_time': time[1],
            'building': building,
            'room_num': room_num,
            'meeting_type': meeting_type
        }

        section = {
            'section_numb': section_numb,
            'professor': name,
            'meetings': [current_lec, meeting]
        }

        course_list[course_id]['section_dict'][section_numb] = section


with open('total.json', 'w') as out_file:
    out_file.write(json.dumps(course_list, indent=4))

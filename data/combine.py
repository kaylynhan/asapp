import json
import csv
import re

with open('total.json') as in_file:
    course_dict = json.load(in_file)

with open('cape.csv') as in_file:
    csv_reader = csv.DictReader(in_file)

    cape_list = []
    for line in csv_reader:
        cape_list.append(line)

cape_dict = {}
for cape in cape_list:
    cape['Instructor'] = cape['Instructor'].strip()
    cape['Course'] = cape['Course'].split('-')[0].strip()
    cape_id = cape['Course'] + cape['Instructor']
    if cape_id not in cape_dict:
        cape_dict[cape_id] = []

    cape_dict[cape_id].append(cape)

overall_cape_dict = {}
for cape_id in cape_dict:
    overall_cape_dict[cape_id] = {}


print(cape_dict)

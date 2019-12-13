from bs4 import BeautifulSoup
import requests
import urllib.parse
import re
import pandas as pd

# get the website in which all department course catalog is listed
r = requests.get("https://ucsd.edu/catalog/front/courses.html")
soup = BeautifulSoup(r.text, "lxml")
soup_course_span = list(soup.find_all("span", class_="courseFacLink"))

root = "https://ucsd.edu/catalog"

# compile a list of course websites
a_tag_ls = soup.find_all(href=re.compile("../course"))
course_website_ls = []
for tag in a_tag_ls:
    url_2nd = tag["href"]
    url_2nd = url_2nd[2:]
    course_link = root+url_2nd
    course_website_ls.append(course_link)

# go to each individual websites, and scrape all the info needed.
data_ls = []
for dept_website in course_website_ls[0:6]:
    r = requests.get(dept_website)
    soup = BeautifulSoup(r.text, "lxml")
    course_name_raw_ls = soup.find_all("p", class_="course-name")

    course_code_ls = []
    course_name_ls = []
    course_desp_ls = []
    course_preq_ls = []
    for tag in course_name_raw_ls:
        course_str = tag.contents[0].split(".")

        # DEBUG TODO
        print(course_str[0])
        # DEBUG TODO

        # if someone messed up the period, then split it up differently. I am talking about you COMM 114M and 114T!
        if(len(course_str) == 1):
            course_str_one = course_str[0]
            course_str_ls = course_str_one.split(" ")
            course_code_ls.append(" ".join(course_str_ls[:2]))
            course_name_ls.append(" ".join(course_str_ls[2:]))
        else:
            # strip away empty strings before it applies
            course_code_ls.append(re.sub(" +", " ", course_str[0]))
            course_name_ls.append(course_str[1])

        tag = tag.find_next()

        # if someone messed up the strong tag, move on and solve the problem. I am talking about you ANTH291!
        if(not tag.contents):
            tag = tag.find_next()
        course_desp_ls.append(tag.contents[0])

        # if preq is not specified
        if(len(tag.contents) <= 2):
            course_preq_ls.append("None")

        # if there is a hilarious emphasis span around it, strip is off
        elif tag.span is not None and tag.span.has_attr("class") and tag.span.attrs["class"][0] == 'emphasis':
             course_preq_ls.append(tag.find_next(class_="emphasis").contents[0])

        else:
            course_preq_ls.append(tag.contents[2])
    temp_data = pd.DataFrame(list(zip(course_code_ls, course_name_ls, course_desp_ls, course_preq_ls)), columns=[
                             "Course_code", "Course_name", "Course_desp", "Course_preq"])
    data_ls.append(temp_data)

df = pd.concat(data_ls)

course_code = df['Course_code']


file_name = "course.csv"
df.to_csv(file_name, sep=',')

from bs4 import BeautifulSoup
import requests
import urllib.parse
import re
import pandas as pd

    

FILENAME = "FinalData"

#classPost = "&selectedSubjects=MATH"
classPost = "&selectedSubjects=AIP&selectedSubjects=AWP&selectedSubjects=ANES&selectedSubjects=ANBI&selectedSubjects=ANAR&selectedSubjects=ANTH&selectedSubjects=ANSC&selectedSubjects=AESE&selectedSubjects=BENG&selectedSubjects=BNFO&selectedSubjects=BIEB&selectedSubjects=BICD&selectedSubjects=BIPN&selectedSubjects=BIBC&selectedSubjects=BGGN&selectedSubjects=BGRD&selectedSubjects=BGSE&selectedSubjects=BILD&selectedSubjects=BIMM&selectedSubjects=BISP&selectedSubjects=BIOM&selectedSubjects=CMM&selectedSubjects=CENG&selectedSubjects=CHEM&selectedSubjects=CHIN&selectedSubjects=CCS&selectedSubjects=CLIN&selectedSubjects=CLRE&selectedSubjects=COGS&selectedSubjects=COMM&selectedSubjects=COGR&selectedSubjects=CSS&selectedSubjects=CSE&selectedSubjects=CGS&selectedSubjects=CAT&selectedSubjects=TDDM&selectedSubjects=TDHD&selectedSubjects=TDMV&selectedSubjects=TDPF&selectedSubjects=TDTR&selectedSubjects=DSC&selectedSubjects=DSE&selectedSubjects=DERM&selectedSubjects=DSGN&selectedSubjects=DOC&selectedSubjects=DDPM&selectedSubjects=ECON&selectedSubjects=EDS&selectedSubjects=ERC&selectedSubjects=ECE&selectedSubjects=EMED&selectedSubjects=ENG&selectedSubjects=ENVR&selectedSubjects=ESYS&selectedSubjects=ETIM&selectedSubjects=ETHN&selectedSubjects=EXPR&selectedSubjects=FMPH&selectedSubjects=FPM&selectedSubjects=FILM&selectedSubjects=GPCO&selectedSubjects=GPEC&selectedSubjects=GPGN&selectedSubjects=GPIM&selectedSubjects=GPLA&selectedSubjects=GPPA&selectedSubjects=GPPS&selectedSubjects=GLBH&selectedSubjects=HITO&selectedSubjects=HIAF&selectedSubjects=HIEA&selectedSubjects=HIEU&selectedSubjects=HILA&selectedSubjects=HISC&selectedSubjects=HINE&selectedSubjects=HIUS&selectedSubjects=HIGR&selectedSubjects=HILD&selectedSubjects=HDS&selectedSubjects=HMNR&selectedSubjects=HUM&selectedSubjects=INTL&selectedSubjects=JAPN&selectedSubjects=JWSP&selectedSubjects=LATI&selectedSubjects=LHCO&selectedSubjects=LISL&selectedSubjects=LIAB&selectedSubjects=LIFR&selectedSubjects=LIGN&selectedSubjects=LIGM&selectedSubjects=LIHL&selectedSubjects=LIIT&selectedSubjects=LIPO&selectedSubjects=LISP&selectedSubjects=LTAM&selectedSubjects=LTCO&selectedSubjects=LTCS&selectedSubjects=LTEU&selectedSubjects=LTFR&selectedSubjects=LTGM&selectedSubjects=LTGK&selectedSubjects=LTIT&selectedSubjects=LTKO&selectedSubjects=LTLA&selectedSubjects=LTRU&selectedSubjects=LTSP&selectedSubjects=LTTH&selectedSubjects=LTWR&selectedSubjects=LTEN&selectedSubjects=LTWL&selectedSubjects=LTEA&selectedSubjects=MMW&selectedSubjects=MBC&selectedSubjects=MATS&selectedSubjects=MATH&selectedSubjects=MSED&selectedSubjects=MAE&selectedSubjects=MED&selectedSubjects=MUIR&selectedSubjects=MCWP&selectedSubjects=MUS&selectedSubjects=NANO&selectedSubjects=NEU&selectedSubjects=NEUG&selectedSubjects=OPTH&selectedSubjects=ORTH&selectedSubjects=PATH&selectedSubjects=PEDS&selectedSubjects=PHAR&selectedSubjects=SPPS&selectedSubjects=PHIL&selectedSubjects=PHYS&selectedSubjects=POLI&selectedSubjects=PSY&selectedSubjects=PSYC&selectedSubjects=RMAS&selectedSubjects=RAD&selectedSubjects=MGTF&selectedSubjects=MGT&selectedSubjects=MGTA&selectedSubjects=MGTP&selectedSubjects=RELI&selectedSubjects=RMED&selectedSubjects=REV&selectedSubjects=SOMI&selectedSubjects=SOMC&selectedSubjects=SIOC&selectedSubjects=SIOG&selectedSubjects=SIOB&selectedSubjects=SIO&selectedSubjects=SOCG&selectedSubjects=SOCE&selectedSubjects=SOCI&selectedSubjects=SE&selectedSubjects=SURG&selectedSubjects=TDAC&selectedSubjects=TDDE&selectedSubjects=TDGE&selectedSubjects=TDGR&selectedSubjects=TDHT&selectedSubjects=TDPW&selectedSubjects=TDPR&selectedSubjects=TWS&selectedSubjects=TMC&selectedSubjects=USP&selectedSubjects=UROL&selectedSubjects=VIS&selectedSubjects=WARR&selectedSubjects=WCWP&selectedSubjects=WES"
rawPost = "selectedTerm=WI20&xsoc_term=&loggedIn=false&tabNum=&schedOption1=true&_schedOption1=on&_schedOption11=on&_schedOption12=on&schedOption2=true&_schedOption2=on&_schedOption4=on&_schedOption5=on&_schedOption3=on&_schedOption7=on&_schedOption8=on&_schedOption13=on&_schedOption10=on&_schedOption9=on&schDay=M&_schDay=on&schDay=T&_schDay=on&schDay=W&_schDay=on&schDay=R&_schDay=on&schDay=F&_schDay=on&schDay=S&_schDay=on&schStartTime=12%3A00&schStartAmPm=0&schEndTime=12%3A00&schEndAmPm=0&_selectedDepartments=1&schedOption1Dept=true&_schedOption1Dept=on&_schedOption11Dept=on&_schedOption12Dept=on&schedOption2Dept=true&_schedOption2Dept=on&_schedOption4Dept=on&_schedOption5Dept=on&_schedOption3Dept=on&_schedOption7Dept=on&_schedOption8Dept=on&_schedOption13Dept=on&_schedOption10Dept=on&_schedOption9Dept=on&schDayDept=M&_schDayDept=on&schDayDept=T&_schDayDept=on&schDayDept=W&_schDayDept=on&schDayDept=R&_schDayDept=on&schDayDept=F&_schDayDept=on&schDayDept=S&_schDayDept=on&schStartTimeDept=12%3A00&schStartAmPmDept=0&schEndTimeDept=12%3A00&schEndAmPmDept=0&courses=&sections=&instructorType=begin&instructor=&titleType=contain&title=&_hideFullSec=on&_showPopup=on"
rawPost = rawPost + classPost

# rawPost = "selectedTerm=FA19&xsoc_term=&loggedIn=false&tabNum=&selectedSubjects=CAT+&_selectedSubjects=1&schedOption1=true&_schedOption1=on&_schedOption11=on&_schedOption12=on&schedOption2=true&_schedOption2=on&_schedOption4=on&_schedOption5=on&_schedOption3=on&_schedOption7=on&_schedOption8=on&_schedOption13=on&_schedOption10=on&_schedOption9=on&schDay=M&_schDay=on&schDay=T&_schDay=on&schDay=W&_schDay=on&schDay=R&_schDay=on&schDay=F&_schDay=on&schDay=S&_schDay=on&schStartTime=12%3A00&schStartAmPm=0&schEndTime=12%3A00&schEndAmPm=0&_selectedDepartments=1&schedOption1Dept=true&_schedOption1Dept=on&_schedOption11Dept=on&_schedOption12Dept=on&schedOption2Dept=true&_schedOption2Dept=on&_schedOption4Dept=on&_schedOption5Dept=on&_schedOption3Dept=on&_schedOption7Dept=on&_schedOption8Dept=on&_schedOption13Dept=on&_schedOption10Dept=on&_schedOption9Dept=on&schDayDept=M&_schDayDept=on&schDayDept=T&_schDayDept=on&schDayDept=W&_schDayDept=on&schDayDept=R&_schDayDept=on&schDayDept=F&_schDayDept=on&schDayDept=S&_schDayDept=on&schStartTimeDept=12%3A00&schStartAmPmDept=0&schEndTimeDept=12%3A00&schEndAmPmDept=0&courses=&sections=&instructorType=begin&instructor=&titleType=contain&title=&_hideFullSec=on&_showPopup=on"

# turn the raw Post data into a formatted dict to use with requests
data_dict = urllib.parse.parse_qsl(rawPost)
page = 1
data_dict.append(('page', page))
header = ["Course Name", "Section Number", "Date", "Time"]
output = pd.DataFrame( columns=header)

# Open a request and the csv
r = requests.post(
    "https://act.ucsd.edu/scheduleOfClasses/scheduleOfClassesStudentResult.htm", data=data_dict)

# Loop through the pages until we get an error
while ("Exception report" not in r.text):

    # Increment the page count
    page += 1
    data_dict[-1] = ('page', page)

    # turn the raw html into soup
    soup = BeautifulSoup(r.text, "lxml")

    # Find class section divs
    finalTimes = soup.find_all("tr", {"class": "nonenrtxt"})
    lectureTd = soup.find_all("span", string=re.compile("^LE$"))
    finalTimesFiltered = []
    for final in finalTimes: 
        if(len(final.findChildren()) > 3 and final.findChildren()[3].contents[0] == "FI"):
            finalTimesFiltered.append(final)
    finalTimes = finalTimesFiltered
    

    # Iterate through the list of results
    for finalDef in finalTimes:

        # Find the course number 
        curr = finalDef
        while(True):
            if(len(curr.findChildren()) < 5):
                curr = curr.find_previous_sibling()
                continue
            sectionNum = curr.findChildren()[5].contents[0]
            if(re.match(re.compile("[A-Z]00"), sectionNum)):
                break
            curr = curr.find_previous_sibling()

        # Find the department the class is in (the last h2)
        department = finalDef.find_previous("h2").span.string

        # And extract it from the formatting
        department = department[department.find("(") + 1: department.find(")")]

        # get course name etc
        numFind = finalDef.find_all_previous(
            "td", {"class": "crsheader"})
        for num in numFind:
            if re.match("[1-9].*", str(num.string)):
                course_name = department + num.string
                break

        # start scraping at loc 5
        ls_finalDef = list(finalDef)
        DATE_POS = 7
        TIME_POS = 11

        date = re.findall(r"\d{2}/\d{2}/\d{4}",
                          str(ls_finalDef[DATE_POS]))[0]
        DOW = re.findall(
            r"\d{1,2}:\d{2}[a|p]-\d{1,2}:\d{2}[a|p]", str(ls_finalDef[TIME_POS]))[0]
        finalStr = course_name + "," + sectionNum + "," + date + "," + DOW + "\n"
        row_content = [course_name, sectionNum, date, DOW]
        print(finalStr)
        row = dict(zip(header, row_content))
        output = output.append(row, ignore_index=True)


    # update the request to the next page
    r = requests.post(
        "https://act.ucsd.edu/scheduleOfClasses/scheduleOfClassesStudentResult.htm", data=data_dict)

output.to_csv("final_data.csv", index=False)


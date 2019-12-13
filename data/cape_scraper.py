from bs4 import BeautifulSoup
import os
import re
import pandas as pd

cape_file = os.listdir("./Cape_website")
cape_file = [x for x in cape_file if re.match(".*html", x)]

os.chdir("./CAPE_website")

# get the header
soup = BeautifulSoup(open(cape_file[0]), "html.parser")
thead = soup.table.thead
thead_elems = thead.findAll("th")
thead_content = [x.contents[0] for x in thead_elems]
thead_content.append("cape_link")

data = pd.DataFrame(columns=thead_content)
for idx, file in enumerate(cape_file):
    soup = BeautifulSoup(open(file), "html.parser")
    tr_list = soup.tbody.findAll("tr")
    for tr in tr_list:
        td_list = tr.findAll("td")
        tr_content = []
        for td in td_list:
            td_cleaned = [x for x in td.contents if x != '\n'][0]
            # if only one level down
            if str(type(td_cleaned)) == "<class 'bs4.element.NavigableString'>":
                tr_content.append(td_cleaned)
            # if two levels down
            else:
                tr_content.append(td_cleaned.contents[0])
            
            # scrape link to cape
        tr_dict = dict(zip(data.columns, tr_content))
        link = tr.a["href"]
        tr_dict["cape_link"] = link
        data = data.append(tr_dict, ignore_index=True)
    print(idx)

os.chdir("..")
data.to_csv("cape.csv", index=False)
            
            



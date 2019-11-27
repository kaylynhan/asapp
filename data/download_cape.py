import pyautogui
import sys
import os
import time
import pyperclip

try:
    os.mkdir('cape')
except OSError:
    print('Failed to make cape folder')


BASE_URL = 'http://cape.ucsd.edu/responses/Results.aspx?Name=&CourseNumber='
categories = ['cse']

pyautogui.click()
time.sleep(1)

for category in categories:
    print(f'Downloading {category}')
    pyperclip.copy(BASE_URL + category)
    pyautogui.hotkey('ctrl', 'l')
    time.sleep(1)
    pyautogui.hotkey('ctrl', 'v')
    pyautogui.hotkey('enter')
    time.sleep(10)
    pyautogui.hotkey('ctrl', 's')
    time.sleep(5)
    pyautogui.typewrite(category, interval=0.1)
    time.sleep(1)
    pyautogui.hotkey('enter')


from selenium import webdriver as wb
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait as wbw
from selenium.webdriver.support import expected_conditions as ec

URL = 'https://learningapps.org'
URL_LOGIN = 'https://learningapps.org/login?form'
EMAIL = 'ibragimov_kep@mail.ru'
PASS = 'qwerty4321'

TITLE = 'title'
DESCRIPTION = 'description'

service = Service(executable_path='/usr/bin/chromedriver')
options = wb.ChromeOptions()

driver = wb.Chrome(service=service, options=options)
driver_wait = wbw(driver=driver, timeout=10, poll_frequency=1)

driver.get(URL_LOGIN)

driver_wait.until(ec.element_to_be_clickable((By.ID, 'username'))).send_keys(EMAIL)
driver_wait.until(ec.element_to_be_clickable((By.ID, 'password'))).send_keys(PASS)

driver.find_element(By.ID, 'subBtn').click()

driver.get(URL)

driver_wait.until(
    ec.visibility_of_element_located((By.XPATH, '//*[@id="main"]/div[5]/div[4]/a'))
).click()

driver.find_element(By.XPATH, '//*[@id="majorTools"]/div[8]/div').click()

driver_wait.until(
    ec.visibility_of_element_located((By.XPATH, '//*[@id="majorTools"]/div[9]/div[3]/div[4]/a'))
).click()

title = driver_wait.until(
    ec.visibility_of_element_located((By.ID, 'LearningApp_title'))
)
title.clear()
title.send_keys(TITLE)

driver.find_element(By.ID, 'LearningApp_task').send_keys(DESCRIPTION)

driver.find_element(By.ID, 'subBtn').click()

driver.quit()

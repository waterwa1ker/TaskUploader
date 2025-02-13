import time

from page.login_page import LoginPage
from page.main_page import MainPage
from page.app_page import AppPage
from selenium import webdriver as wb
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait as wbw

import os

from dotenv import load_dotenv

from page.task_page import TaskPage
from utils.element_worker import ElementWorker


def main():

    load_dotenv()

    EMAIL = os.getenv("EMAIL")
    PASSWORD = os.getenv("PASSWORD")
    TITLE = os.getenv("TITLE")
    DESCRIPTION = os.getenv("DESCRIPTION")

    service = Service(executable_path='/usr/bin/chromedriver')
    options = wb.ChromeOptions()

    driver = wb.Chrome(service=service, options=options)
    driver_wait = wbw(driver=driver, timeout=10, poll_frequency=1)

    element_worker = ElementWorker(driver, driver_wait)

    login_page = LoginPage(element_worker)
    login_page.input_username(EMAIL)
    login_page.input_password(PASSWORD)
    login_page.click_submit_button()

    main_page = MainPage(element_worker)
    main_page.create_app()

    app_page = AppPage(element_worker)
    app_page.choose_cloze_text()
    app_page.create_new_app()

    task_page = TaskPage(element_worker)
    task_page.change_task_title(TITLE)
    task_page.change_task_description(DESCRIPTION)
    task_page.click_submit_button()

    time.sleep(10)

    driver.quit()

if __name__ == '__main__':
    main()


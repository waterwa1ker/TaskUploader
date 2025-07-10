import json
import time
from os import getenv

from dotenv import load_dotenv
from selenium import webdriver as wb
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait as wbw

from ai.ai_worker import AiWorker
from model.cloze_text import ClozeText
from page.app_page import AppPage
from page.login_page import LoginPage
from page.main_page import MainPage
from page.cloze_text_page import ClozeTextPage
from utils.element_worker import ElementWorker
from constants.task import Task


def main():

    load_dotenv()

    EMAIL = getenv("EMAIL")
    PASSWORD = getenv("PASSWORD")

    service = Service(executable_path='/usr/bin/chromedriver')
    options = wb.ChromeOptions()

    ai_worker = AiWorker()
    json_tasks = ai_worker.get_tasks('a')
    json_tasks = json.loads(json_tasks)
    tasks = []
    for json_task in json_tasks:
        print(json_task)
    #     tasks.append(ClozeText(**json_task))
    #
    # driver = wb.Chrome(service=service, options=options)
    # driver_wait = wbw(driver=driver, timeout=10, poll_frequency=1)
    #
    # element_worker = ElementWorker(driver, driver_wait)
    #
    # login_page = LoginPage(element_worker)
    # login_page.input_username(EMAIL)
    # login_page.input_password(PASSWORD)
    # login_page.click_submit_button()
    #
    # main_page = MainPage(element_worker)
    # main_page.create_app()
    #
    # app_page = AppPage(element_worker)
    # for task in tasks:
    #
    #     if task.get_task() == Task.CLOZE_TEXT:
    #         app_page.choose_cloze_text()
    #         app_page.create_new_app()
    #
    #         task_page = ClozeTextPage(element_worker, task)
    #         task_page.save_tasks()
    #     elif task.get_task() == Task.MULTIPLE_CHOICE:
    #         app_page.choose_multiple_choice()
    #         app_page.create_new_app()
    #
    #     time.sleep(10)

    driver.quit()

if __name__ == '__main__':
    main()


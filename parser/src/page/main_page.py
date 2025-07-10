from utils.element_worker import ElementWorker


class MainPage:

    def __init__(self, element_worker : ElementWorker):

        self.URL = 'https://learningapps.org/'
        self.CREATE_APP_SELECTOR = 'xpath'
        self.CREATE_APP_SELECTOR_VALUE = '/html/body/div[2]/div[5]/div[4]/a'

        self.element_worker = element_worker

        self.element_worker.open_page(self.URL)

    def create_app(self):
        self.element_worker.click_element(self.CREATE_APP_SELECTOR, self.CREATE_APP_SELECTOR_VALUE)
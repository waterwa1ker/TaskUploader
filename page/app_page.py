from utils.element_worker import ElementWorker


class AppPage:

    def __init__(self, element_worker : ElementWorker):

        self.CLOZE_TEXT_SELECTOR = 'xpath'
        self.CLOZE_TEXT_SELECTOR_VALUE = '/html/body/div[2]/div[6]/div/div[3]/div[8]/div'
        self.CREATE_NEW_APP_SELECTOR = 'xpath'
        self.CREATE_NEW_APP_SELECTOR_VALUE = '/html/body/div[2]/div[6]/div/div[3]/div[9]/div[3]/div[4]/a'

        self.element_worker = element_worker

    def choose_cloze_text(self):
        self.element_worker.click_element(self.CLOZE_TEXT_SELECTOR, self.CLOZE_TEXT_SELECTOR_VALUE)

    def create_new_app(self):
        self.element_worker.click_element(self.CREATE_NEW_APP_SELECTOR, self.CREATE_NEW_APP_SELECTOR_VALUE)
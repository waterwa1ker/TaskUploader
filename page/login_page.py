from utils.element_worker import ElementWorker


class LoginPage:

    def __init__(self, element_worker : ElementWorker):

        self.URL = 'https://learningapps.org/login?form'
        self.USERNAME_SELECTOR = 'id'
        self.USERNAME_SELECTOR_VALUE = 'username'
        self.PASSWORD_SELECTOR = 'id'
        self.PASSWORD_SELECTOR_VALUE = 'password'
        self.SUBMIT_BUTTON_SELECTOR = 'id'
        self.SUBMIT_BUTTON_SELECTOR_VALUE = 'subBtn'

        self.element_worker = element_worker
        self.element_worker.open_page(self.URL)

    def input_username(self, username):

        self.element_worker.input_value(self.USERNAME_SELECTOR, self.USERNAME_SELECTOR_VALUE, username)

    def input_password(self, password):

        self.element_worker.input_value(self.PASSWORD_SELECTOR, self.PASSWORD_SELECTOR_VALUE, password)

    def click_submit_button(self):

        self.element_worker.click_element(self.SUBMIT_BUTTON_SELECTOR, self.SUBMIT_BUTTON_SELECTOR_VALUE)
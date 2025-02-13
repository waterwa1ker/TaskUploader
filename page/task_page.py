from utils.element_worker import ElementWorker


class TaskPage:

    def __init__(self, element_worker : ElementWorker):

        self.TASK_TITLE_SELECTOR = 'id'
        self.TASK_TITLE_SELECTOR_VALUE = 'LearningApp_title'
        self.TASK_DESCRIPTION_SELECTOR = 'id'
        self.TASK_DESCRIPTION_SELECTOR_VALUE = 'LearningApp_task'
        self.SUBMIT_BUTTON_SELECTOR = 'id'
        self.SUBMIT_BUTTON_SELECTOR_VALUE = 'subBtn'

        self.element_worker = element_worker

    def click_submit_button(self):
        self.element_worker.click_element(self.SUBMIT_BUTTON_SELECTOR, self.SUBMIT_BUTTON_SELECTOR_VALUE)


    def change_task_title(self, title):
        self.element_worker.input_value(self.TASK_TITLE_SELECTOR, self.TASK_TITLE_SELECTOR_VALUE, title)

    def change_task_description(self, description):
        self.element_worker.input_value(self.TASK_DESCRIPTION_SELECTOR, self.TASK_DESCRIPTION_SELECTOR_VALUE, description)
from constants.task_type import TaskType
from model.cloze_text import ClozeText
from utils.element_worker import ElementWorker


class ClozeTextPage:

    def __init__(self, element_worker : ElementWorker, cloze_text : ClozeText):

        self.TASK_TITLE_SELECTOR = 'id'
        self.TASK_TITLE_SELECTOR_VALUE = 'LearningApp_title'
        self.TASK_DESCRIPTION_SELECTOR = 'id'
        self.TASK_DESCRIPTION_SELECTOR_VALUE = 'LearningApp_task'
        self.SUBMIT_BUTTON_SELECTOR = 'id'
        self.SUBMIT_BUTTON_SELECTOR_VALUE = 'subBtn'
        self.CLOZE_TEXT_SELECTOR = 'id'
        self.CLOZE_TEXT_SELECTOR_VALUE = 'clozetext'
        self.CLOZES_SELECTOR = 'id'
        self.CLOZES_SELECTOR_VALUE = 'cloze'
        self.FEEDBACK_SELECTOR = 'id'
        self.FEEDBACK_SELECTOR_VALUE = 'feedback'
        self.ADD_NEW_CLOZE_SELECTOR = 'id'
        self.ADD_NEW_CLOZE_SELECTOR_VALUE = 'addNewListElementBtn_list1'
        self.TASK_TYPE_BUTTON_SELECTOR = 'id'
        self.TASK_TYPE_BUTTON_SELECTOR_VALUE = 'type_btn'
        self.SELECT_FROM_LIST_SELECTOR = 'xpath'
        self.SELECT_FROM_LIST_SELECTOR_VALUE = '/html/body/div[2]/div[6]/div/div/div/div[2]/form/div[11]/div[3]/div[2]/div/div/ul/li[1]'
        self.WRITE_IN_SELECTOR = 'xpath'
        self.WRITE_IN_SELECTOR_VALUE = '/html/body/div[2]/div[6]/div/div/div/div[2]/form/div[11]/div[3]/div[2]/div/div/ul/li[2]'
        self.SAVE_BUTTON_SELECTOR = 'id'
        self.SAVE_BUTTON_SELECTOR_VALUE = 'saveBtn'
        self.CREATE_ANOTHER_APP_SELECTOR = 'xpath'
        self.CREATE_ANOTHER_APP_SELECTOR_VALUE = '/html/body/div[2]/div[6]/div/div[2]/span/a[1]'

        self.element_worker = element_worker
        self.cloze_text = cloze_text

    def save_tasks(self):


        if self.cloze_text.get_title() is not None:
            self.element_worker.input_value(self.TASK_TITLE_SELECTOR, self.TASK_TITLE_SELECTOR_VALUE, self.cloze_text.get_title())
        if self.cloze_text.get_description() is not None:
            self.element_worker.input_value(self.TASK_DESCRIPTION_SELECTOR, self.TASK_DESCRIPTION_SELECTOR_VALUE, self.cloze_text.get_description())
        if self.cloze_text.get_task_type() is not None:
            self.__choose_task_type__()
        if self.cloze_text.get_cloze_text() is not None:
            self.element_worker.input_value(self.CLOZE_TEXT_SELECTOR, self.CLOZE_TEXT_SELECTOR_VALUE, self.cloze_text.get_cloze_text())
        if self.cloze_text.get_clozes() is not None:
            self.__input_clozes__()
        if self.cloze_text.get_feedback() is not None:
            self.element_worker.input_value(self.FEEDBACK_SELECTOR, self.FEEDBACK_SELECTOR_VALUE, self.cloze_text.get_feedback())

        self.__click_submit_button__()
        self.__save_task__()

    def __click_submit_button__(self):
        self.element_worker.click_element(self.SUBMIT_BUTTON_SELECTOR, self.SUBMIT_BUTTON_SELECTOR_VALUE)

    def __save_task__(self):
        self.element_worker.click_element(self.SAVE_BUTTON_SELECTOR, self.SAVE_BUTTON_SELECTOR_VALUE)

    def __choose_task_type__(self):

        task_type = self.cloze_text.get_task_type()

        self.element_worker.click_element(self.TASK_TYPE_BUTTON_SELECTOR, self.TASK_TYPE_BUTTON_SELECTOR_VALUE)
        if task_type == TaskType.WRITE_IN:
            self.element_worker.click_element(self.WRITE_IN_SELECTOR, self.WRITE_IN_SELECTOR_VALUE)
        else:
            self.element_worker.click_element(self.SELECT_FROM_LIST_SELECTOR, self.SELECT_FROM_LIST_SELECTOR_VALUE)


    def __input_clozes__(self):
        clozes = self.cloze_text.get_clozes()
        for i in range(len(clozes)):
            if i != 0:
                self.element_worker.click_element(self.ADD_NEW_CLOZE_SELECTOR, self.ADD_NEW_CLOZE_SELECTOR_VALUE)
            selector_value = f'{self.CLOZES_SELECTOR_VALUE}{i+1}'
            self.element_worker.input_value(self.CLOZES_SELECTOR, selector_value, clozes[i])

    def __create_another_app__(self):
        self.element_worker.click_element(self.CREATE_ANOTHER_APP_SELECTOR, self.CREATE_ANOTHER_APP_SELECTOR_VALUE)

from constants.task_type import TaskType
from constants.task import Task

class ClozeText:

    def __init__(self, task : Task, title, description, task_type : TaskType, cloze_text, clozes : list, feedback):
        self.task = task
        self.title = title
        self.description = description
        self.task_type = task_type
        self.cloze_text = cloze_text
        self.clozes = clozes
        self.feedback = feedback

    def get_task(self) -> Task:
        return self.task

    def get_title(self) -> str:
        return self.title

    def get_description(self) -> str:
        return self.description

    def get_task_type(self) -> TaskType:
        return self.task_type

    def get_cloze_text(self) -> str:
        return self.cloze_text

    def get_clozes(self) -> list:
        return self.clozes

    def get_feedback(self) -> str:
        return self.feedback




        
from enum import Enum

class Task(str, Enum):

    CLOZE_TEXT = 'cloze_text'
    MULTIPLE_CHOICE = 'multiple_choice'
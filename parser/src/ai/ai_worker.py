import json
from os import getenv

import dotenv
import requests


class AiWorker:

    def __init__(self):

        dotenv.load_dotenv()

        self.BASIC_TOKEN = getenv('BASIC_TOKEN')
        #self.ACCESS_TOKEN = self.get_access_token()


    def get_access_token(self):

        URL = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth"

        payload = {
            'scope': 'GIGACHAT_API_PERS'
        }
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'RqUID': '7e8b7e58-ee2e-437f-9647-67d24cef1b18',
            'Authorization': f'Basic {self.BASIC_TOKEN}'
        }

        response = requests.post(URL, headers=headers, data=payload, verify=False)

        return json.loads(response.text)['access_token']

    def get_tasks(self, page_text) -> str:

        # URL = "https://gigachat.devices.sberbank.ru/api/v1/chat/completions"
        # SYSTEM_PROMPT = 'Ты опытный преподаватель по английскому языку с опытом работы более 20 лет.' \
        #                 'Твоя задача восстановить правильный порядок заданий.' \
        #                 'Страница разделена на две части вертикальной линией: левая и правая' \
        #                 'Считывание страницы происходит сверху-вниз, поэтому левая часть может смешаться с правой частью' \
        #                 'Ты должен, учитывая информацию выше, четко разделить левую и правую части страницы.' \
        #                 'Формат вывода:' \
        #                 '{ "left" : "ТЕКСТ_ИЗ_ЛЕВОЙ_ЧАСТИ_СТРАНИЦЫ", ' \
        #                 '"right" : "ТЕКСТ_ИЗ_ПРАВОЙ_ЧАСТИ_СТРАНИЦЫ" }'
        #
        # payload = json.dumps({
        #     "model": "GigaChat",
        #     "messages": [
        #         {
        #             "role" : "system",
        #             "content" : SYSTEM_PROMPT
        #         },
        #         {
        #             "role": "user",
        #             "content": f'{page_text}'
        #         }
        #     ],
        #     "stream": False,
        #     "repetition_penalty": 1
        # })
        # headers = {
        #     'Content-Type': 'application/json',
        #     'Accept': 'application/json',
        #     'Authorization': f'Bearer {self.ACCESS_TOKEN}'
        # }
        #
        # response = requests.post(URL, headers=headers, data=payload, verify = False)
        #
        # text = response.json()['choices'][0]['message']['content']

        return '[{ "task" : "cloze_text", "title" : "title1", "description" : "description", "task_type" : "WRITE_IN", "cloze_text" : "text -1- text2 -2- text3 -3-", "clozes" : ["a;b;c", "d;e", "f;g"], "feedback" : "feedback" }, {"title" : "title2", "description" : "description", "task_type" : "FROM_LIST", "cloze_text" : "text -1- text2 -2- text3 -3-", "clozes" : ["a;b;c", "d;e", "f;g"], "feedback" : "feedback"}, {"task" : "multiple_choice"}]'

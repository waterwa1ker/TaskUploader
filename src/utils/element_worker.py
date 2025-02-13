from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.common.by import By
from selenium.webdriver.remote import webelement

class ElementWorker:

    def __init__(self, driver, driver_wait):

        self.driver = driver
        self.driver_wait = driver_wait

    def open_page(self, url):
        self.driver.get(url)

    def click_element(self, selector, selector_value):

        element = self.__get_element(selector, selector_value)
        self.__click(element)


    def input_value(self, selector, selector_value, input_value):

        element = self.__get_element(selector, selector_value)

        self.__clear_value(element)
        self.__set_value(element, input_value)

    def __get_element(self, selector, selector_value) -> webelement:
        
        selector_dict = {
            'id': By.ID,
            'xpath': By.XPATH
        }

        return self.driver_wait.until(
            ec.visibility_of_element_located(
                (selector_dict[selector], selector_value)
            )
        )

    def __click(self, element):
        element.click()


    def __clear_value(self, element):
        element.clear()

    def __set_value(self, element, input_value):
        element.send_keys(input_value)
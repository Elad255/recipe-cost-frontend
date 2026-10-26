from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_user_can_log_in():
    driver = webdriver.Chrome()
    wait = WebDriverWait(driver, 15)          # one reusable waiter
    try:
        driver.get("http://localhost:5173/login")

        wait.until(EC.visibility_of_element_located(
            (By.CSS_SELECTOR, "input[placeholder='Email']"))).send_keys("playwright@test.com")
        wait.until(EC.visibility_of_element_located(
            (By.CSS_SELECTOR, "input[placeholder='Password']"))).send_keys("Test1234")
        wait.until(EC.element_to_be_clickable(
            (By.XPATH, "//button[text()='Log In']"))).click()

        logout = wait.until(EC.visibility_of_element_located(
            (By.XPATH, "//button[text()='Log out']")))
        assert logout.is_displayed()
    finally:
        driver.quit()
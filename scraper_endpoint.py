from flask import Flask, jsonify
import threading
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions

from flask_cors import CORS

app = Flask(__name__)
CORS(app)
amazon_list = []
bestbuy_list = []
e_list = []
s1 = Service(ChromeDriverManager().install())

def scrape_website(link,budget,pro_name, spec_list ,s1,op):
    driver = webdriver.Chrome(service=s1, options=op)
    driver.get(link)
    global amazon_list
    global bestbuy_list
    global e_list
    if link == 'https://www.bestbuy.ca/en-ca':
            driver.find_element(By.CLASS_NAME, 'textField_XaJoz').send_keys(pro_name)
            time.sleep(1)
            driver.find_element(By.XPATH, '//button[@class="searchButton_2mES- fitContainer_2HpHA"]').click()
            time.sleep(1)
            products_2 = WebDriverWait(driver, 2).until(expected_conditions.presence_of_all_elements_located((By.XPATH,'//div[@class="col-xs-12_198le col-sm-4_13E9O col-lg-3_ECF8k x-productListItem productLine_2N9kG"]')))

            for product in products_2:
                b_counter = 0
                try:
                    description_2 = product.find_element(By.XPATH, './/div[@class="productItemName_3IZ3c"]')
                    a_bool = True
                except:
                    a_bool = False
                try:
                    link_2 = product.find_element(By.XPATH, './/div/a')
                    link_2_ref = link_2.get_attribute('href')
                    b_bool = True
                except:
                    b_bool = False

                try:
                    price_2 = product.find_element(By.XPATH, './/span[@class="screenReaderOnly_2mubv large_3uSI_"]')
                    c_bool = True
                except:
                    c_bool = False

                p_cost = str(price_2.text).replace('$', '')
                p_total = float(p_cost)
                if len(spec_list) != 0:
                    p_description_2 = str(description_2.text).lower().replace('-', '').split()
                    for spec in spec_list:
                        if spec.lower() in p_description_2:
                            b_counter += 1
                        else:
                            pass
                    if b_counter > 1:
                        d_present = True
                    else:
                        d_present = False
                    if p_total < budget and d_present:
                        if a_bool and b_bool and c_bool:
                            b_obj = {"Description": f"{description_2.text}",
                                     "Price": f"{price_2.text}",
                                     "link": f"{link_2_ref}"
                                     }
                            bestbuy_list.append(b_obj)

                        else:
                            pass
                elif len(spec_list) == 0:
                    if p_total < budget:
                        if a_bool and b_bool and c_bool:
                            b_obj = {"Description": f"{description_2.text}",
                                     "Price": f"{price_2.text}",
                                     "link": f"{link_2_ref}"
                                     }
                            bestbuy_list.append(b_obj)

                        else:
                            pass
                    else:
                        pass
            driver.close()
    elif link == 'https://www.ebay.ca/':
            driver.find_element(By.ID, 'gh-ac').send_keys(pro_name)
            time.sleep(1)
            driver.find_element(By.ID, 'gh-btn').click()
            time.sleep(1)
            products_4 = WebDriverWait(driver, 1).until(expected_conditions.presence_of_all_elements_located((By.XPATH, '//li[@class="s-item s-item__pl-on-bottom"]')))
            for product in products_4:
                e_counter = 0
                try:
                    description_4 = product.find_element(By.XPATH, './/div[@class="s-item__title"]/span')
                    d_bool = True
                except:
                    d_bool = False
                try:
                    link_4 = product.find_element(By.XPATH, './/a[@class="s-item__link"]')
                    link_4_ref = link_4.get_attribute('href')
                    l_bool = True
                except:
                    l_bool = False

                try:
                    price_4 = product.find_element(By.XPATH, './/div[@class="s-item__detail s-item__detail--primary"]/span')
                    p_cost = str(price_4.text).replace('C', '').replace('$', '').strip()
                    p_total = float(p_cost)
                    p_bool = True
                except:
                    p_bool = False
                try:
                    img_4 = product.find_element(By.XPATH, './/img')
                    f_img4 = img_4.get_attribute('src')
                    i_bool = True

                except:
                    i_bool = False
                if len(spec_list) != 0:
                    p_description_4 = str(description_4.text).lower().replace('-', '').split()
                    for spec in spec_list:
                        if spec.lower() in p_description_4:
                            e_counter += 1
                        else:
                            pass
                    if e_counter > 1:
                        e_present = True
                    else:
                        e_present = False
                    if p_bool:
                        if e_present and p_total < budget:
                            if d_bool and l_bool and i_bool:
                                e_list.append({"Description": f"{description_4.text}","Price": f"{p_cost}","link": f"{link_4_ref}",  "image": f"{f_img4}"})
                            else:
                                pass
                        else:
                            pass
                    else:
                        pass
                elif len(spec_list) == 0:
                    if p_bool:
                        if p_total < budget:
                            if d_bool and l_bool:
                                e_list.append({"Description": f"{description_4.text}", "Price": f"{p_cost}",
                                               "link": f"{link_4_ref}"})

                            else:
                                pass
                        else:
                            pass
                    else:
                        pass
            driver.close()
    elif link == "https://www.amazon.ca/":
        driver.find_element(By.NAME, 'field-keywords').send_keys(pro_name)
        clickable = driver.find_element(By.ID, 'nav-search-submit-button')
        time.sleep(1)
        clickable.click()
        time.sleep(1)
        products_1 = WebDriverWait(driver, 3).until(expected_conditions.presence_of_all_elements_located((By.XPATH, '//div[contains(@class, "s-result-item s-asin")]')))
        for product in products_1:
            counter = 0
            try:
                description_1 = product.find_element(By.XPATH,'.//span[@class="a-size-base-plus a-color-base a-text-normal"]')
                des_bool = True
            except:
                des_bool = False

            try:
                whole_price = product.find_element(By.XPATH, './/span[@class="a-price-whole"]')
                fraction_price = product.find_element(By.XPATH, './/span[@class="a-price-fraction"]')
                if whole_price and fraction_price:
                    price_bool = True
            except:
                price_bool = False

            try:
                link_1 = product.find_element(By.XPATH, './/div[@class= "a-section a-spacing-none a-spacing-top-small s-title-instructions-style"]/h2/a')
                link_1_ref = link_1.get_attribute('href')
                link_bool = True
            except:
                link_bool = False

            try:
               ffd = product.find_element(By.XPATH, './/img[@class="s-image"]')
               f_src = ffd.get_attribute('src')
               ai_bool = True
            except:
                 ai_bool = False
            price_1 = int(whole_price.text)
            if len(spec_list) != 0:
                p_description_1 = str(description_1.text).lower().replace('-', ' ').split()
                for spec in spec_list:
                    if spec.lower() in p_description_1:
                        counter += 1
                    else:
                        pass
                if counter > 1:
                    is_present = True
                else:
                    is_present = False
                if price_1 < budget and is_present:
                    if price_bool and des_bool and link_bool:
                        result_object = {
                            "Description": f"{description_1.text}",
                            "Price": f"{whole_price.text}.{fraction_price.text}",
                            "link": f"{link_1_ref}"
                        }
                        amazon_list.append(result_object)
                    else:
                        pass

            elif len(spec_list) == 0:
                if price_1 < budget:
                    if price_bool and des_bool and link_bool:
                        result_object = {
                            "Description": f"{description_1.text}",
                            "Price": f"{whole_price.text}.{fraction_price.text}",
                            "link": f"{link_1_ref}"
                        }
                        amazon_list.append(result_object)
                    else:
                        pass
                else:
                    pass

        driver.close()
@app.route('/', methods=['POST'])
def start():
    request_data = request.get_json()
    product_name = request_data.get('p_name')
    budget = request_data.get('b_name')
    f_bug = int(budget)
    att_list = request_data.get('speclist')
    urls = ['https://www.bestbuy.ca/en-ca', 'https://www.ebay.ca/', 'https://www.amazon.ca/']
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Referer": "https://www.google.com/",
    }
    threads = []
    op = Options()
    op.add_argument('--disable-blink-features=AutomationControlled')
    op.add_argument('--disable-popup-blocking')
    # op.add_argument('--headless')
    for key, value in headers.items():
        op.add_argument(f"--{key}={value}")
    for url in urls:
        thread = threading.Thread(target=scrape_website, args=(url, f_bug, product_name, att_list,  s1, op))
        thread.start()
        threads.append(thread)
    for thread in threads:
        thread.join()
    new_obj = {"list_1": bestbuy_list,"list_2": e_list, "list_3": amazon_list}
    return jsonify(new_obj), 200

if __name__ == '__main__':
    app.run(debug=True)


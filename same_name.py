from flask import Flask, request, jsonify
import threading
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import TimeoutException, NoSuchElementException, NoSuchAttributeException, StaleElementReferenceException

bestbuy_list = []
s1 = Service(ChromeDriverManager().install())
local_s = threading.local()
def scrape_website(link,spec_list,budget,s1,op):


    # if link == 'https://www.walmart.ca/en':
    #     driver.find_element(By.ID, 'search-form-input').send_keys('jbl earbuds')
    #     driver.find_element(By.XPATH, '//button[@class="css-1v9c0kj e1xoeh2i2"]').click()
    #     products_3 = WebDriverWait(driver, 2).untilexpected_conditions.presence_of_all_elements_located((By.XPATH, '//div[@class="css-3ky18c epettpn0"]')))
    #     counter = 0
    #     wall_counter = []
    #     for product in products_3:
    #         try:
    #             description_3 = product.find_element(By.XPATH, './/p[@class="css-1p4va6y eudvd6x0"]')
    #             des_bool = True
    #         except:
    #             print("Product description error")
    #             des_bool = False
    #         try:
    #             link_3 = product.find_element(By.XPATH, '//div[@class="css-3ky18c epettpn0"]/a')
    #             link_3_ref = link_3.get_attribute('href')
    #             link_bool = True
    #         except:
    #             print("Link cannot be found")
    #             link_bool = False
    #
    #         try:
    #             price_3 = product.find_element(By.XPATH, './/span[@class="css-2vqe5n esdkp3p0"]')
    #             price_bool = True
    #         except:
    #             print("Price Error")
    #             price_bool = False
    #         p_cost = str(price_3.text).replace('$', '')
    #         p_total = float(p_cost)
    #         p_description_3 = str(description_3.text).lower().replace('-', '').split()
    #         if any(word.lower().replace('-', '') in p_description_3 for word in attribute_list):
    #             is_present = True
    #         else:
    #             is_present = False
    #         if p_total < budget and is_present:
    #             if des_bool and link_bool and price_bool:
    #                 print(f"Product Description: {description_3.text}")
    #                 print(f"Product Link: {link_3_ref}")
    #                 print(f"Product Price: {price_3.text}")
    #                 print("-------------------------------------------------------------")
    #             else:
    #                 pass
    #         else:
    #             pass
    #         if counter > 1 and p_total < budget:
    #             wall_counter.append(link_3_ref)
    #     for i in wall_counter:
    #         with open('wall_mart_links.txt', 'a') as w:
    #             w.write(i + '\n')
    #     driver.close()
    if link == 'https://www.bestbuy.ca/en-ca':
        try:
            local_s.bestbuy_list = []
            driver_bestbuy = webdriver.Chrome(service=s1, options=op)
            driver_bestbuy.get(link)
            driver_bestbuy.find_element(By.XPATH, '//input[@class="textField_XaJoz"]').send_keys('jbl earbuds')
            driver_bestbuy.find_element(By.XPATH, '//button[@class="searchButton_2mES- fitContainer_2HpHA"]').click()
            driver_bestbuy.implicitly_wait(3)
            products_2 = driver_bestbuy.find_elements(By.XPATH, '//div[@class="col-xs-12_198le col-sm-4_13E9O col-lg-3_ECF8k x-productListItem productLine_2N9kG"]')
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
                            local_s.bestbuy_list.append(b_obj)
                        else:
                            pass
                    else:
                        pass
                elif len(spec_list) == 0:
                    if p_total < budget:
                        if a_bool and b_bool and c_bool:
                            b_obj = {"Description": f"{description_2.text}",
                                     "Price": f"{price_2.text}",
                                     "link": f"{link_2_ref}"
                                     }
                            local_s.bestbuy_list.append(b_obj)
                        else:
                            pass
                    else:
                        pass
            driver_bestbuy.close()
        except NoSuchElementException:
            driver_bestbuy.close()
        except NoSuchAttributeException:
            driver_bestbuy.close()
        except TimeoutException:
            driver_bestbuy.close()
        except StaleElementReferenceException:
            driver_bestbuy.close()





def main():
    urls = ['https://www.bestbuy.ca/en-ca']
    attribute_list = []
    budget = float(input('Enter your budget (for eg 300,400,500): '))
    print(budget)
    # headers = {
    #     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    #     "Accept-Language": "en-US,en;q=0.5",
    #     "Accept-Encoding": "gzip, deflate, br",
    #     "Connection": "keep-alive",
    #     "Upgrade-Insecure-Requests": "1",
    #     "Referer": "https://www.google.com/",
    # }
    while True:
        x = input("Enter the attribute of the product: ")
        if x != 'X':
            attribute_list.append(x)
        else:
            break
    threads = []
    op = Options()
    # headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
    # op.add_argument(headers)
    op.add_argument('--disable-blink-features=AutomationControlled')
    op.add_argument('--disable-popup-blocking')
    # for key, value in headers.items():
    #     op.add_argument(f"--{key}={value}")
    # op.add_argument('--headless')
    for url in urls:
        thread = threading.Thread(target=scrape_website, args=(url,attribute_list,budget,s1,op))
        thread.start()
        threads.append(thread)

    # Wait for all threads to finish
    for thread in threads:
        thread.join()
    for i in local_s.bestbuy_list:
        print(i)

if __name__ == '__main__':
    main()

    
    # elif link == 'https://www.ebay.ca/':
    #     driver.find_element(By.ID, 'gh-ac').send_keys('jbl earbuds')
    #     driver.find_element(By.ID, 'gh-btn').click()
    #     products_4 = WebDriverWait(driver, 10).until(expected_conditions.presence_of_all_elements_located((By.XPATH, '//div[@class="s-item__wrapper clearfix"]')))
    #     for product in products_4:
    #         try:
    #             description_4 = product.find_element(By.XPATH, './/div[@class="s-item__title"]/span')
    #             des_bool = True
    #         except:
    #             print("Product description error")
    #             des_bool = False
    #         try:
    #             link_4 = product.find_element(By.XPATH, './/div[@class="s-item__info clearfix"]/a')
    #             link_4_ref = link_4.get_attribute('href')
    #             link_bool = True
    #         except:
    #             print("Link cannot be found")
    #             link_bool = False
    #
    #         try:
    #             price_4 = product.find_element(By.XPATH, './/div[@class="s-item__detail s-item__detail--primary"]/span/span')
    #             price_bool = True
    #         except:
    #             print("Price Error")
    #             price_bool = False
    #         print(price_4.text)
    #         p_cost = str(price_4.text).replace('C', '').replace('$', '').strip()
    #         p_total = float(p_cost)
    #         p_description_4 = str(description_4.text).lower().replace('-', '').split()
    #         if any(word.lower().replace('-', '') in p_description_4 for word in attribute_list):
    #             is_present = True
    #         else:
    #             is_present = False
    #         if p_total < budget and is_present:
    #             if des_bool:
    #                 print(f"Product Description: {description_4.text}")
    #
    #             if link_bool:
    #                 print(f"Product Link: {link_4_ref}")
    #
    #             if price_bool:
    #                 print(f"Product Price: {price_4.text}")
    #
    #             print('-------------------------------------------------------------------')
    #         else:
    #             print("################################################################")




    # elif link == 'https://www.canadiantire.ca/en.html':
    #     driver.find_element(By.ID, 'search-input-0').send_keys('jbl earbuds')
    #     driver.find_element(By.ID, 'trigger-search-icon').click()
    #     all_products = WebDriverWait(driver, 10).until(expected_conditions.presence_of_all_elements_located((By.XPATH, '//li[@class="nl-product__content"]')))
    #     for product in all_products:
    #         try:
    #             p_link = product.find_element(By.XPATH, './/a[@class="nl-product-card__no-button"]')
    #             p_link_ref = p_link.get_attribute('href')
    #             link_bool = True
    #         except:
    #             print('Link Error')
    #             link_bool = False
    #         try:
    #             product_description = product.find_element(By.XPATH, './/div[@class="nl-product-title-sku"]/span')
    #             des_bool = True
    #         except:
    #             print('Description Error')
    #             des_bool = False
    #         try:
    #             product_price = product.find_element(By.XPATH, './/span[@class="nl-price--total"]')
    #             x = str(product_price.text).replace('$', '')
    #             p_final = float(x)
    #             price_bool = True
    #         except:
    #             print("Price Error")
    #             price_bool = False
    #
    #         p_description = str(product_description.text).lower().replace('-', '').split()
    #         if any(word.lower() in p_description for word in attribute_list):
    #             is_present = True
    #         else:
    #             is_present = False
    #
    #         if p_final < budget and is_present:
    #             if price_bool:
    #                 print(f'Product Price: {product_price.text}')
    #             if des_bool:
    #                 print(f'Product Description: {product_description.text}')
    #             if link_bool:
    #                 print(f'Product Link: {p_link_ref}')
    #
    #             print('----------------------------------------------------')







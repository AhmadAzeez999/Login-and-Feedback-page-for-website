document.addEventListener("DOMContentLoaded", () => {
    alert("After getting the product results, if you want to save it you will have to log in via the account tab");
    const btn = document.getElementById('btn_sub');
    const b_con = document.getElementById('bestbuy-container');
    const e_con = document.getElementById('ebay-container');
    const a_con = document.getElementById('amazon-container');
    const res_con = document.querySelector(".m_result");
    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const input_name = document.getElementById('input1');
        const input_budget = document.getElementById('input2');
        const spec_input = document.querySelectorAll('.specInput');
        let spec_list = [];
        if (spec_input) {
            spec_input.forEach(element => {
                spec_list.push(element.value);
            });
        }
        if(input_budget.value === "0"){
            var mess_obj = {
                p_name: input_name.value,
                b_name: "10000000",
                speclist: spec_list
            };
        }
        else{
            var mess_obj = {
                p_name: input_name.value,
                b_name: input_budget.value,
                speclist: spec_list
            };
            }
        const sent_data = await fetch("http://127.0.0.1:5000", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mess_obj)
        });
        
        if (sent_data.status === 200) {
            res_con.style.opacity = "1";
            const f_data = await sent_data.json();
                if (f_data) {
                    if (f_data.list_1.length === 0) {
                        let ele_1 = document.createElement('div');
                        ele_1.classList.add('result-line');
                        dom = `<p>Could not fetch data due to some technical errors, please retry with different inputs or use it sometime later, sorry for the inconvinience</p>`;
                        ele_1.innerHTML = dom;
                        b_con.appendChild(ele_1);
                    } else {
                        f_data.list_1.forEach( (element,index) => {
                            let ele_1 = document.createElement('div');
                            ele_1.classList.add('result-line');
                            dom = `
                            <img src="https://via.placeholder.com/300X300" alt="Placeholder Image">
                            <div class="product-info">
                            <p class='product-des'>${"Product Description: " + element.Description}</p>
                            <p>${"Product Price: " + element.Price}</p>
                            </div>
                            <a href=${element.link} target="_blank">Product link</a>
                            <button id="btn_save_bestbuy${index}">Save</button>`;
                            ele_1.innerHTML = dom;
                            b_con.appendChild(ele_1);
                            let saver = document.getElementById(`btn_save_bestbuy${index}`);
                            saver.addEventListener('click', async () => {
                                const link_sent = await fetch("http://127.0.0.1:3000/save-link", 
                                {method: "post",
                                headers: {"Content-type": "application/json"},
                                body: JSON.stringify({"link": element.link})
                                }); 
                                if(link_sent.status === 200){
                                    alert("Your product has been saved, you can view it in your account");
                                }
                                else{
                                    alert("Your product was not saved, please log in via the account tab");
                                } 
                            });

                            })
                    }
                         if (f_data.list_2.length === 0) {
                                let ele_2 = document.createElement('div');
                                ele_2.classList.add('result-line');
                                dom = `<p>Could not fetch data due to some technical errors, please retry with different inputs or use it sometime later, sorry for the inconvinience</p>`;
                                ele_2.innerHTML = dom;
                                e_con.appendChild(ele_2);
                            }
                         else{
                            f_data.list_2.forEach( (element,index) => {
                                let ele_2 = document.createElement('div');
                                ele_2.classList.add('result-line');
                                dom = `
                                <img src="https://via.placeholder.com/300X300" alt="Placeholder Image">
                                <div class="product-info">
                                <p class='product-des'>${"Product Description: " + element.Description}</p>
                                <p>${"Product Price: " + element.Price}</p>
                                </div>
                                <a href=${element.link} target="_blank">Product link</a>
                                <button id="btn_save_ebay${index}">Save</button>`;
                                ele_2.innerHTML = dom;
                                e_con.appendChild(ele_2);
                                let saver = document.getElementById(`btn_save_ebay${index}`);
                                saver.addEventListener('click', async () => {
                                    const link_sent = await fetch("http://127.0.0.1:3000/save-link", 
                                    {method: "post",
                                    headers: {"Content-type": "application/json"},
                                    body: JSON.stringify({"link": element.link})
                                    }); 
                                    if(link_sent.status === 200){
                                        alert("Your product has been saved, you can view it in your account");
                                    }
                                    else{
                                        alert("Your product was not saved, please log in via the account tab");
                                    } 
                                });   
                                })
                        }
                            if(f_data.list_3.length === 0){
                                let ele_3 = document.createElement('div');
                                ele_3.classList.add('result-line');
                                dom = `<p>Could not fetch data due to some technical errors, please retry with different inputs or use it sometime later, sorry for the inconvinience</p>`;
                                ele_3.innerHTML = dom;
                                a_con.appendChild(ele_3);
                            }
                            else{
                            f_data.list_3.forEach((element, index) => {
                                    let ele_3 = document.createElement('div');
                                    ele_3.classList.add('result-line');
                                    dom = `
                                    <img src="https://via.placeholder.com/300X300" alt="Placeholder Image">
                                    <div class="product-info">
                                    <p class='product-des'>${"Product Description: " + element.Description}</p>
                                    <p>${"Product Price: " + element.Price}</p>
                                    </div>
                                    <a href=${element.link} target = "_blank">Product link</a>
                                    <button id="btn_save_amazon_${index}">Save</button>`;
                                    ele_3.innerHTML = dom;
                                    a_con.appendChild(ele_3);
                                    let saver_3 = document.getElementById(`btn_save_amazon_${index}`);
                                    saver_3.addEventListener('click', async () => {
        
                                        const link_sent = await fetch("http://127.0.0.1:3000/save-link", 
                                        {method: "post",
                                        headers: {"Content-type": "application/json"},
                                        body: JSON.stringify({"link": element.link})
                                        }); 
                                        if(link_sent.status === 200){
                                            alert("Your product has been saved, you can see it in the accounts tab");
                                        }
                                        else{
                                            alert("Your product was not saved, please log in from the accounts tab");
                                        } 
                                        
                                    });
                                });
                            }
                }
            }
            else{
                console.log("The data was not received");
            }         
        })
    })
                    
              
      
   

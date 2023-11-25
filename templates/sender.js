document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById('btn_sub');
    const b_con = document.getElementById('bestbuy-container');
    const e_con = document.getElementById('ebay-container');
    const a_con = document.getElementById('amazon-container');
    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const form_u = document.getElementById('myForm');
        const input_name = document.getElementById('input1');
        const input_budget = document.getElementById('input2');
        const spec_input = document.querySelectorAll('.specInput');
        let spec_list = [];
        if (spec_input) {
            spec_input.forEach(element => {
                spec_list.push(element.value);
            });
            let mess_obj = {
                p_name: input_name.value,
                b_name: input_budget.value,
                speclist: spec_list
            };
            const sent_data = await fetch(form_u.action, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(mess_obj)
            });
            if (sent_data.status === 200) {
                const f_data = await sent_data.json();
                if (f_data) {
                    if (f_data.list_1.length === 0) {
                        let ele_1 = document.createElement('div');
                        ele_1.classList.add('result-line');
                        dom = `<p>Due to some technical issue, could not fetch data, please try again later</p>`;
                        ele_1.innerHTML = dom;
                        b_con.appendChild(ele_1);
                    } else {
                        f_data.list_1.forEach(element => {
                            let ele_1 = document.createElement('div');
                            ele_1.classList.add('result-line');
                            dom = `
                            <div class="product-info">
                                <p>${"Product Description: " + element.Description}</p>
                                <p>${"Product Price: " + element.Price}</p>
                            </div>
                            <a href=${element.link}>Product link</a>`;
                            ele_1.innerHTML = dom;
                            b_con.appendChild(ele_1);
                        });
                    }
                    if (f_data.list_2.length === 0) {
                        let ele_2 = document.createElement('div');
                        ele_2.classList.add('result-line');
                        dom = `<p>Due to some technical issue, could not fetch data, please try again later</p>`;
                        ele_2.innerHTML = dom;
                        e_con.appendChild(ele_2);
                    } else {
                        f_data.list_2.forEach(element => {
                            let ele_2 = document.createElement('div');
                            ele_2.classList.add('result-line');
                            dom = `
                            <div class="product-info">
                                <p>${"Product Description: " + element.Description}</p>
                                <p>${"Product Price: " + element.Price}</p>
                            </div>
                            <a href=${element.link}>Product link</a>`;
                            ele_2.innerHTML = dom;
                            e_con.appendChild(ele_2);
                        });
                    }
                    if(f_data.list_3.length === 0){
                        let ele_3 = document.createElement('div');
                        ele_3.classList.add('result-line');
                        dom = `<p>Due to some technical issue, could not fetch data, please try again later</p>`;
                        ele_3.innerHTML = dom;
                        a_con.appendChild(ele_3);
                    }
                    else{
                        f_data.list_3.forEach(element => {
                            let ele_3 = document.createElement('div');
                            ele_3.classList.add('result-line');
                            dom = `
                            <div class="product-info">
                            <p>${"Product Description: " + element.Description}</p>
                            <p>${"Product Price: " + element.Price}</p>
                            </div>
                            <a href=${element.link}>Product link</a>`;
                            ele_3.innerHTML = dom;
                            a_con.appendChild(ele_3);
                        });
                    }
                } else {
                    console.log("Not received");
                }
            }
        } else {
            let mess_obj = {
                p_name: input_name.value,
                b_name: input_budget.value,
                speclist: spec_list
            };
            const sent_data = await fetch(form_u.action, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(mess_obj)
            });
            if (sent_data.status === 200) {
                const f_data = await sent_data.json();
                if (f_data) {
                    if (f_data.list_1.length === 0) {
                        let ele_1 = document.createElement('div');
                        ele_1.classList.add('result-line');
                        dom = `<p>Due to some technical issue, could not fetch data, please try again later</p>`;
                        ele_1.innerHTML = dom;
                        b_con.appendChild(ele_1);
                    } else {
                        f_data.list_1.forEach(element => {
                            let ele_1 = document.createElement('div');
                            ele_1.classList.add('result-line');
                            dom = `
                            <div class="product-info">
                                <p>${"Product Description: " + element.Description}</p>
                                <p>${"Product Price: " + element.Price}</p>
                            </div>
                            <a href=${element.link}>Product link</a>`;
                            ele_1.innerHTML = dom;
                            b_con.appendChild(ele_1);
                        });
                    }
                    if (f_data.list_2.length === 0) {
                        let ele_2 = document.createElement('div');
                        ele_2.classList.add('result-line');
                        dom = `<p>Due to some technical issue, could not fetch data, please try again later</p>`;
                        ele_2.innerHTML = dom;
                        e_con.appendChild(ele_2);
                    } else {
                        f_data.list_2.forEach(element => {
                            let ele_2 = document.createElement('div');
                            ele_2.classList.add('result-line');
                            dom = `
                            <div class="product-info">
                                <p>${"Product Description: " + element.Description}</p>
                                <p>${"Product Price: " + element.Price}</p>
                            </div>
                            <a href=${element.link}>Product link</a>`;
                            ele_2.innerHTML = dom;
                            e_con.appendChild(ele_2);
                        });
                    }
                    if(f_data.list_3.length === 0){
                        let ele_3 = document.createElement('div');
                        ele_3.classList.add('result-line');
                        dom = `<p>Due to some technical issue, could not fetch data, please try again later</p>`;
                        ele_3.innerHTML = dom;
                        a_con.appendChild(ele_3);
                    }
                    else{
                        f_data.list_3.forEach(element => {
                            let ele_3 = document.createElement('div');
                            ele_3.classList.add('result-line');
                            dom = `
                            <div class="product-info">
                            <p>${"Product Description: " + element.Description}</p>
                            <p>${"Product Price: " + element.Price}</p>
                            </div>
                            <a href=${element.link}>Product link</a>`;
                            ele_3.innerHTML = dom;
                            a_con.appendChild(ele_3);
                        });
                    }
                } else {
                    console.log("Not received");
                }
            } else {
                console.log("Not sent");
            }
        }
    });
});

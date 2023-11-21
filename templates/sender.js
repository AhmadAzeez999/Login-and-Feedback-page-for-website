

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById('btn_sub');
    const res_con = document.getElementById('bestbuy-container');
    const a_con = document.getElementById('amazon-container');
    btn.addEventListener('click',  async (e)=> {
    e.preventDefault();
    const form_u = document.getElementById('myForm');
    const input_name = document.getElementById('input1');
    const input_budget = document.getElementById('input2');
    console.log(input_name.value);
    console.log(input_budget.value);
          let mess_obj = {
              p_name:input_name.value,
              b_name: input_budget.value
          };
          const sent_data = await fetch(form_u.action, {
              method:"post",
              headers: {
                  "Content-Type":"application/json"
              },
              body: JSON.stringify(mess_obj)
          });
          if(sent_data.status === 200){
            const f_data = await sent_data.json();
            
            if(f_data){
              
                f_data.list_1.forEach(element => {
                    let ele_1 = document.createElement('div');
                    ele_1.classList.add('result-line');
                    dom = `
                    <div class = "product-info">
                    <p>${"Product Description: " + element.Description}</p>
                    <p>${"Product Price: " + element.Price}</p>
                    </div>
                    <a href = ${element.link}>Product link</a>`;
                    ele_1.innerHTML = dom;
                    res_con.appendChild(ele_1);
                });
                f_data.list_2.forEach(element => {
                    let ele_2 = document.createElement('div');
                    ele_2.classList.add('result-line');
                    dom = `
                    <div class = "product-info">
                    <p>${"Product Description: " + element.Description}</p>
                    <p>${"Product Price: " + element.Price}</p>
                    </div>
                    <a href = ${element.link}>Product link</a>`;
                    ele_2.innerHTML = dom;
                    a_con.appendChild(ele_2);
                })
            
             
            }
          }
          else{
            console.log("Not sent");
          }
    }
    )
   
})
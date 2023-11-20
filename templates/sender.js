document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById('btn_sub');
    const res_con = document.getElementById('res');
    btn.addEventListener('click',  async (e)=> {
    e.preventDefault();
    const form_u = document.getElementById('myForm');
    const input_name = document.getElementById('i_1');
    const input_budget = document.getElementById('i_2');
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
                f_data.forEach(element => {
                    let ele = document.createElement('div');
                    dom = `<p>${"Product Description: " + element.Description}</p>
                    <p>${"Product Price: " + element.Price}</p>
                    <a href=${element.link}>Product Link</a>`;
                    ele.classList.add('ini-item');
                    ele.innerHTML = dom;
                    res_con.appendChild(ele);

                });
                res_con.style.opacity = "1";
             
            }
          }
          else{
            console.log("Not sent");
          }
    }
    )
   
})
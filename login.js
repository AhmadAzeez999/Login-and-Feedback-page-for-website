document.addEventListener('DOMContentLoaded', () => {
    console.log("Script found");
     const btn_submit = document.getElementById('my_btn');
     btn_submit.addEventListener('click', async (e) => {
          e.preventDefault();
          let form = document.getElementById('myForm');
          let user_e = document.getElementById('user_email');
          let user_password = document.getElementById('user_pass');
          let mess_display = document.getElementById('mess-resp');
 
          let f_obj = {useremail: user_e.value,
                      password: user_password.value,
                      };
          const sent_data = await fetch(form.action, {
             method: "post",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify(f_obj)
          });
 
          if(sent_data.status === 200){
             let resp_data = await sent_data.json();
             mess_display.textContent = resp_data.resp;
             mess_display.style.opacity = "1";
             setTimeout(function(){
                mess_display.style.opacity = "0";
             }, 2000)
             
          }
          else{
             let res_recv = await resp_data.json();
             mess_display.textContent = resp_data.resp;
             mess_display.style.opacity = "1";
             setTimeout(function(){
                mess_display.style.opacity = "0";
             }, 2000);
          }
     })
     
 })
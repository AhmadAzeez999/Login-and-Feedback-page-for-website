
document.addEventListener('DOMContentLoaded', async () => {

     const btn_submit = document.getElementById('my_btn');
     let hid_mess = document.getElementById('hidden_greet');
     const final_dat = await fetch('http://127.0.0.1:3000/get-cred');
     if(final_dat.status === 200){
         const rec_dat = await final_dat.json();
         const username = rec_dat.resp;
         hid_mess.textContent = `What are your opinions for improvement ${username}!`;
         hid_mess.style.opacity = "1";
     }
     else{
         console.log("Error");
     }


     btn_submit.addEventListener('click', async (e) => {
          e.preventDefault();
          let form = document.getElementById('myForm');
          let user_m = document.getElementById('user_message');
          let mess_display = document.getElementById('mess-resp');
 
          let f_obj = {message: user_m.value};
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
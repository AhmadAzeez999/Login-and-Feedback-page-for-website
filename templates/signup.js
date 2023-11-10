document.addEventListener('DOMContentLoaded', () => {
   console.log("Script found");
    const btn_submit = document.getElementById('my_btn');
    btn_submit.addEventListener('click', async (e) => {
         e.preventDefault();
         let form = document.getElementById('myForm');
         let user_n = document.getElementById('user');
         let user_p = document.getElementById('pass');
         let user_e = document.getElementById('u_email');
         let user_c_pass = document.getElementById('con_pass');
         let mess_display = document.getElementById('mess-resp');

         let f_obj = {username: user_n.value,
                      useremail: user_e.value,
                     password: user_p.value,
                     confirmPassword: user_c_pass.value};
        console.log(f_obj);
         const sent_data = await fetch(form.action, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(f_obj)
         });

         if(sent_data.status === 201){
            let resp_data = await sent_data.json();
            console.log(resp_data);
            mess_display.textContent = resp_data.resp;
         }
         else{
            mess_display.textContent = resp_data.resp;
         }
    })
    
})
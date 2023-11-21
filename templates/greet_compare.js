document.addEventListener("DOMContentLoaded", async () => {
    console.log("Found");
    let hid_mess = document.getElementById('hidden_greet');
    const final_dat = await fetch('http://127.0.0.1:3000/get-cred');
    if(final_dat.status === 200){
        const rec_dat = await final_dat.json();
        const username = rec_dat.resp;
        hid_mess.textContent = `Hello ${username}, here you will be able to get detailed comparision of attributes of different products!`;
        hid_mess.style.opacity = "1";
    }
    else{
        console.log("Error");
    }
})
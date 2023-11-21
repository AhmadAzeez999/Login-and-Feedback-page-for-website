document.addEventListener('DOMContentLoaded',  async() => {
    let main_c = document.getElementById('m_box');
    let obj = {mess:"fromLogin"};
    const rec_dat = await fetch("/get-fed", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    });
    if(rec_dat.status === 200){
        const final_dat = await rec_dat.json();
        const arr_d = final_dat.arr;
        if(arr_d.length === 0){
            let h_ele = document.createElement('div');
            h_ele.innerHTML = "<p>No feedbacks so far</p>";
            h_ele.classList.add('m_class');
            main_c.appendChild(h_ele);
        }
        arr_d.forEach(element => {
            let h_ele = document.createElement('div');
            h_ele.innerHTML = `<p>From: ${element.from}</p><p>Message: ${element.feedback}</p>`;
            h_ele.classList.add('m_class');
            main_c.appendChild(h_ele);
        });
    }
    else{
        const rec = await rec_dat.json();
        console.log(rec.resp);
    }
})
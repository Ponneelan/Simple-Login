let btn = document.getElementById('btn');
let form = document.getElementById('form');
let msg = document.getElementById('message');
btn.addEventListener('click', validation)


function validation() {
    const formData = new FormData(form);
    let data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }
    if ((data['mail'] !== "" || data['mail'] !== null) && (data['password'] !== "" || data['password'] !== null)) {
        login(data);
        console.log(data)
    } else {
        alert('Invalid entries');
    }
    form.reset();
}


function login(formData){
    let payload = {
        userName : formData['mail'],
        passWord : formData['password']
    };
    console.log('payload .........',payload);
    fetch('http://localhost:3000/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
    })
    .then(res=>res.json())
    .then(data => {
        console.log(data);
        if(data['code']){
            msg.style.color = 'green';
        }else{
            msg.style.color = 'red';
        }
        msg.innerText = data['message'];

    });
}
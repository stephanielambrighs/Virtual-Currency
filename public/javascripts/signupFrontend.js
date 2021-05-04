// ik maak hier een tijdelijk token aan zodat ik al kan verderwerken
// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MDkwMTFjYmJhZjlhMzBmYjg1Njc5MzIiLCJ1c2VybmFtZSI6Ikp1c3ROaWNrIiwiaWF0IjoxNjIwMDU0NDc1fQ.0iKOE0RzAeffLJ3LptjJdnBK8545S5WwN33T4VrYllM';

//let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MDkwMTI0MTljYmQ4YjFkYjA1NTljNDciLCJ1c2VybmFtZSI6IlN0ZXBoa2UiLCJpYXQiOjE2MjAwNTQ1OTN9.ezbmM2crDZVHa_Y-Rwt0r9mue4WbDN6DTtNBF9lipLI';


// localStorage.setItem("token", token);
// window.location.href = "/";


let btn = document.querySelector('#btn-submit');
let fullname = '';
let username = '';
let email = '';
let password = '';
let coins = '';

btn.addEventListener('click', function(e){
    console.log("click");
    fullname = document.querySelector('#fullname').value;
    username = document.querySelector('#username').value;
    email = document.querySelector('#email').value;
    password = document.querySelector('#password').value;

    postUser();

    fullname = document.querySelector('#fullname').value = "";
    username = document.querySelector('#username').value = "";
    email = document.querySelector('#email').value = "";
    password = document.querySelector('#password').value = "";

    console.log(fullname, username, email, password, coins);

    // e.preventDefault();
});


let postUser = () => {
    fetch('http://localhost:3000/users/signup', {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
            // 'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
    body: JSON.stringify({
        "fullname": fullname,
        "username": username,
        "email": email,
        "password": password,
        "coins": 100
    })
    }).then(response => {
        return response.json();
    }).then(json => {
       console.log(json);
    })
}
let btnLogin = document.querySelector('.btn');
let username = '';
let password = '';

btnLogin.addEventListener('click', function(e){
    username = document.querySelector('#username').value;
    password = document.querySelector('#password').value;


    if(!postUserLogin()){
        let error = document.querySelector('.form__error');
        error.style.color = "#B60A19";
        error.innerHTML = "It must be a valid username and password";
    }else{
        postUserLogin();
    }
    // postUserLogin();

    username = document.querySelector('#username').value = "";
    password = document.querySelector('#password').value = "";

    // console.log(username, password);

    // e.preventDefault();
});


let postUserLogin = () => {
    fetch('https://imd-virtual-currency-app.herokuapp.com/users/login', {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
    body: JSON.stringify({
        "username": username,
        "password": password
    })
    }).then(response => {
        return response.json();
    }).then(json => {
       console.log(json);

        if(json.status === "success"){
            let token = json.data.token;
            localStorage.setItem("token", token);
            window.location.href = "/";
        }
    })
}
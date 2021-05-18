let btnLogin = document.querySelector('.input-group__btn');
let username = '';
let password = '';

btnLogin.addEventListener('click', function(e){
    username = document.querySelector('.input-group__username').value;
    password = document.querySelector('.input-group__password').value;


    if(!postUserLogin()){
        let error = document.querySelector('.input-group__error');
        error.style.color = "#B60A19";
        error.innerHTML = "It must be a valid username and password";
    }else{
        postUserLogin();
    }
    // postUserLogin();

    username = document.querySelector('.input-group__username').value = "";
    password = document.querySelector('.input-group__password').value = "";

    // console.log(username, password);

    // e.preventDefault();
});


let postUserLogin = () => {
    fetch('http://localhost:3000/users/login', {
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
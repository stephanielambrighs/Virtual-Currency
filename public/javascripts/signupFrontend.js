let btnSignUp = document.querySelector('.input-group__btn');
let fullname = '';
let username = '';
let email = '';
let password = '';
let coins = '';

btnSignUp.addEventListener('click', function(e){
    console.log("click");
    fullname = document.querySelector('.input-group__fullname').value;
    username = document.querySelector('.input-group__username').value;
    email = document.querySelector('.input-group__email').value;
    password = document.querySelector('.input-group__password').value;

    // validateEmail(email);
    if(!validateEmail(email)){
        console.log("works but not valid");
    }else{
        console.log(" = valid");
        postUser();
    }


    fullname = document.querySelector('.input-group__fullname').value = "";
    username = document.querySelector('.input-group__username').value = "";
    email = document.querySelector('.input-group__email').value = "";
    password = document.querySelector('.input-group__password').value = "";


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

        if(json.status === "success"){
            let token = json.data.token;
            localStorage.setItem("token", token);
            window.location.href = "/login";
            console.log(email + json);
        }else{
            console.log("failed");
        }
    })
}

function validateEmail(email) {
    // let emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // bob @ aol.com = /^\S+@\S+\.\S+$/
    // /^\S + @\S + student\S + \.\S + thomasmore\S + \.\S + be\S/
    let emailFormat = /^[a-zA-Z0-9-._]+@student.thomasmore.be*$/;
    if(email.match(emailFormat)){
        console.log("Valid email");
        return true;
    }
    else{
        console.log("not valid");
        return false;
    }

}

//to do : use form input

let btn = document.querySelector('#btn');
let userFrom;
let userTo = '';
let coins = '';
let reason ='';
let description = '';

btn.addEventListener('click', function (e) {
    userTo = document.querySelector('#receiver').value;
    coins = document.querySelector('#amount').value;
    reason = document.querySelector('#reason').value;
    description = document.querySelector('#description').value;

    postTransfer();

    userTo = document.querySelector('#receiver').value = "";
    coins = document.querySelector('#amount').value ="";
    reason = document.querySelector('#reason').value="";
    description = document.querySelector('#description').value="";

    console.log(userTo, coins, description);
})




let postTransfer = () => {
    fetch('http://localhost:3000/api/v1/transfers', {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
    body: JSON.stringify({
        "userFrom": userFrom,
        "userTo": userTo,
        "coins": coins,
        "reason": reason,
        "description": description
    })    
    }).then(response => {
        return response.json();
    }).then(json => {
       console.log(json);

    })
}

//postTransfer();

//get/update Balance
/*let getBalance = () => {
    fetch('',{
        method: "get",
        headers:{
            'Content-Type': 'application/json'
        },
        
    }).then(response =>{
        return response.json();
    }).then(json =>{
       
    
    })
}*/

//to do : use form input

let userFrom = 'test1';
let userTo = 'test1';
let coins = '99';
let description = 'test1';

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
        "description": description
    })    
    }).then(response => {
        return response.json();
    }).then(json => {
       console.log(json);

    })
}

postTransfer();

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

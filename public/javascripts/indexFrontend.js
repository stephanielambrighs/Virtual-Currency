//const { json } = require("express");
//const Primus = require("primus");
let transferList = document.querySelector('.card__list');

// PRIMUS LIVE 
primus = Primus.connect('http://localhost:3000', {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
      , min: 500 // Number: The minimum delay before we try reconnect.
      , retries: 10 // Number: How many times we should try to reconnect.
    }
});

primus.on('data', (json) => {
    if(json.action === "addTransfer") {
        console.log(json.data.data);
        let transfer =` <p>${json.data.data.transfer.userFrom} to ${json.data.data.transfer.userTo} amount ${json.data.data.transfer.coins}</p>`
        transferList.insertAdjacentHTML('afterbegin', transfer)    }

        getUserData();
})


//print transfers
let printTransfers = () => {
    fetch('http://localhost:3000/api/v1/transfers',{
        method: "get",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        
    }).then(response =>{
        return response.json();
    }).then(json =>{
    
        json.data.forEach(element => {

       //datum nog meegeven aan db en uitprinten

          let transfer = `<li class='card__item'>
          <div class='card__transferInfo'>
              <p class='card__name'>${element.userFrom}</p>
              <p class='card__date'>10/05/2021</p>
          </div>
          <div class='card__coinInfo'>
              <p class='card__coinsAmount'>${element.coins}</p>
          </div>
      </li>` 
          


        
                
            transferList.insertAdjacentHTML('afterbegin', transfer)
            
    
        });
    
    })
}

printTransfers();



// get user
let fullUserName;
let getUserData = () => {
    fetch('http://localhost:3000/api/v1/transfers/user',{
        method: "get",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        
    }).then(response =>{
        return response.json();
    }).then(json =>{
        userBalance = json.user[0].coins;
        console.log(userBalance);

        let usernamePlaceholder = document.querySelector('.username');
        usernamePlaceholder.innerHTML = json.user[0].fullname;


    
    }).catch(err => {
        console.log(err)
    });
}

getUserData();





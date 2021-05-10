let transferList = document.querySelector('.transferList');

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
})

//print all transfers
let printTransfers = () => {
    fetch('http://localhost:3000/api/v1/transfers/allT',{
        method: "get",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')

        },
        
    }).then(response =>{
        return response.json();
    }).then(json =>{
   
    console.log(json);
        json.data.forEach(element => {

            let transfer =` <p>${element.userFrom} to ${element.userTo} amount ${element.coins}</p>`
        
                
            transferList.insertAdjacentHTML('afterbegin', transfer)
    
            /*let usernamePlaceholder = document.querySelector('.transferList');
            usernamePlaceholder.innerHTML = json.user[0].fullname;*/
    
        });
    
    })
}

printTransfers();

// get user
let name;
/*let getUser = () => {
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

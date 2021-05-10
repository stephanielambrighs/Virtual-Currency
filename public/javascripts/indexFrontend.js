// PRIMUS LIVE 
primus = Primus.connect('http://localhost:3000', {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
      , min: 500 // Number: The minimum delay before we try reconnect.
      , retries: 10 // Number: How many times we should try to reconnect.
    }
});

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
        let transferList = document.querySelector('.transferList');
    
        json.data.forEach(element => {

           /* if(element.userTo == firstName +" "+lastName) { 
                var name = element.userFrom
                var sign = "+"
              }*/

            let transfer =` <p>${element.userFrom} to ${element.userTo} amount ${element.coins}</p>`
        
                
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





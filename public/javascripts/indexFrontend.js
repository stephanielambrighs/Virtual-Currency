// nog checken of het een transfer voor de user van dit acc is

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
        let test = document.querySelector('.test');
    
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
        fullUserName = json.user[0].firstName +" "+ json.user[0].lastName;
        userBalance = json.user[0].coins;
        console.log(userBalance);

        let usernamePlaceholder = document.querySelector('.username');
        usernamePlaceholder.innerHTML = fullUserName;
    
    }).catch(err => {
        console.log(err)
    });
}

getUserData();





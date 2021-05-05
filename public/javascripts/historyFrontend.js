// nog checken of het een transfer voor de user van dit acc is

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
            let transferList = document.querySelector('.transferList');

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

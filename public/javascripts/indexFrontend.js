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
            
            // met insertAdjacentHTML werken om grotere blokken toe te voegen

            transfer = document.createElement('li');
            transfer.append(element.userFrom);
            transferList.append(transfer);
    
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



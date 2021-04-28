fetch('http://localhost:3000/api/v1/transfers',{
    method: "get",
    headers:{
        'Content-Type': 'application/json'
    },
    
}).then(response =>{
    //let test = response.json();
    //console.log(test);
    return response.json();
}).then(json =>{
    console.log(json);
})
fetch('http://localhost:3000/api/v1/transfers',{
    method: "get",
    headers:{
        'Content-Type': 'application/json'
    },
    
}).then(response =>{
    return response.json();
}).then(json =>{
    let transferList = document.querySelector('.transferList');
    let test = document.querySelector('.test');

    json.data.forEach(element => {
        
        test = document.createElement('li');
        test.append(element.userFrom);
       // let transfer =`div `+ element.userFrom;

        console.log(test);


        transferList.append(test);

    });

})
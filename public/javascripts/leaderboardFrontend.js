// const { session } = require("passport");

let coins = document.querySelector("#coinsUser");
let userList = document.querySelector(".userList");

// let token = localStorage.getItem('token');

// if(token){
//     res.redirect('/leaderboard');
// }
// else{
//     res.redirect('/login');
// }
// function getToken(req, res, next){
//     if(!req.session.accessToken){
//         res.redirect('/login');
//         return;
//     }
//     next();
// }
// getToken();


// console.log(token);

let getAllUsers = () =>{
    fetch("http://localhost:3000/api/v1/leaderboard", {
        method: "get",
        'headers': {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(result => {
        return result.json();
    }).then(json => {
        let count = 0;

        let userCoinsArray = json.users;
        coins.innerHTML = json.users[1]['coins'];

        function GetSortCoins(prop) {
            return function(a, b) {
                if (a[prop] < b[prop]) {
                    return 1;
                } else if (a[prop] > b[prop]) {
                    return -1;
                }
                return 0;
            }
        }

        userCoinsArray.sort(GetSortCoins("coins"));

        for (var item in userCoinsArray) {
            count++;
            let usersArray =`<td>${count} ${userCoinsArray[item].fullname} €${userCoinsArray[item].coins}</td>`
            userList.insertAdjacentHTML('beforeend', usersArray);
        }

    }).catch(err => {
        console.log(err);
    });
}

getAllUsers();



// const { session } = require("passport");

if(!localStorage.getItem('token')){
    window.location.href = "../login";
}

let userList = document.querySelector(".list");

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
        // coins.innerHTML = json.users[1]['coins'];

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
            let usersArray= `<li class="list__item">
                <p class="list__count"> ${count} </p>
                <p class="list__fullname"> ${userCoinsArray[item].fullname} </p>
                <p class="list__coins"> €${userCoinsArray[item].coins} </p>
            </li>`
            // let usersArray =`<li class="list__item">${count} ${userCoinsArray[item].fullname} €${userCoinsArray[item].coins}</li>`
            userList.insertAdjacentHTML('beforeend', usersArray);
        }

    }).catch(err => {
        console.log(err);
    });
}

getAllUsers();


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
        // mobile version (view)
        let coinsPlaceholder = document.querySelector('.header__coinsAmount');
        coinsPlaceholder.innerHTML = json.user[0].coins + " coins";

        // website version (view)
        let coinsWebsitePlaceholder = document.querySelector('.card__coinsAmount');
        coinsWebsitePlaceholder.innerHTML = "€" + json.user[0].coins ;

        console.log(userBalance);

        // mobile version (view)
        let usernamePlaceholder = document.querySelector('.header__name');
        usernamePlaceholder.innerHTML = json.user[0].fullname;

        // website version (view)
        let usernameWebsitePlaceholder = document.querySelector('.headerD__name');
        usernameWebsitePlaceholder.innerHTML = json.user[0].fullname;


    }).catch(err => {
        console.log(err)
    });
}

getUserData();
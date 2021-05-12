//const { json } = require("express");
//const Primus = require("primus");
let transferList = document.querySelector('.card__list');

let url = window.location.search;
let urlID = new URLSearchParams(url);
let id = urlID.get('id');
console.log(id);






//print transfers
let printTransfer = () => {
    fetch('http://localhost:3000/api/v1/transfers/id/' + id, {
        method: "get",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },

    }).then(response => {
        return response.json();
    }).then(json => {

        if (json.data.userFrom === fullUserName) {
            console.log('yes');
            let transfer = `                <li class="card__item">

            <div class="card__transferInfo">
            <p class="card__name"> From: ${json.data.userFrom}</p>
            <p class="card__name"> To: ${json.data.userTo}</p>                        
            <p class="card__date">10/05/2021</p>
            <p class="card__reason">${json.data.reason}</p>
            <p class="card__description"> ${json.data.description}</p>
        </div>
        <div class="card__coinInfo">
            <p class="card__coinsAmount">${json.data.coins} coins</p>
            <p class='card__arrow arrow__negative'>&#8594;</p>
            </div>
    </li>`

            transferList.insertAdjacentHTML('afterbegin', transfer)


        } else {
            console.log('no');
            let transfer = `<li class="card__item">
            <div class="card__transferInfo">
            <p class="card__name"> From: ${json.data.userFrom}</p>
            <p class="card__name"> To: ${json.data.userTo}</p>                        
            <p class="card__date">10/05/2021</p>
            <p class="card__reason">${json.data.reason}</p>
            <p class="card__description"> ${json.data.description}</p>
        </div>
        <div class="card__coinInfo">
            <p class="card__coinsAmount">${json.data.coins} coins</p>
            <p class='card__arrow arrow__positive'>&#8592;</p>
            </div>
        </li>`

            transferList.insertAdjacentHTML('afterbegin', transfer)


        }

    })
}







// get user
let fullUserName;
let getUserData = () => {
    fetch('http://localhost:3000/api/v1/transfers/user', {
        method: "get",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },

    }).then(response => {
        return response.json();
    }).then(json => {
        fullUserName = json.user[0].fullname;
        console.log(fullUserName);
        printTransfer();



    }).catch(err => {
        console.log(err)
    });
}

getUserData();









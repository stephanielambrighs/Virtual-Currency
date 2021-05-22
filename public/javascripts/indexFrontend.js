if(!localStorage.getItem('token')){
    window.location.href = "../login";
}


let transferList = document.querySelector('.card__list');

// PRIMUS LIVE
primus = Primus.connect('https://imd-virtual-currency-app.herokuapp.com', {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
        , min: 500 // Number: The minimum delay before we try reconnect.
        , retries: 10 // Number: How many times we should try to reconnect.
    }
});

// add live transfer
primus.on('data', (json) => {
    if (json.action === "addTransfer") {
        console.log(json);
        let transfer = `<li class='card__item'>
        <div class='card__transferInfo'>
            <p class='card__name'>${json.data.data.transfer.userFrom}</p>
            <p class='card__date'>${json.data.data.transfer.date}</p>
        </div>
        <div class='card__coinInfo'>
            <p class='card__coinsAmount'>${json.data.data.transfer.coins} coins</p>
        </div>
    </li>`

        transferList.insertAdjacentHTML('afterbegin', transfer)
    }

    getUserData();
})


//print transfers
let printTransfers = () => {
    //ajax call
    fetch('https://imd-virtual-currency-app.herokuapp.com/api/v1/transfers', {
        method: "get",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },

    }).then(response => {
        return response.json();
    }).then(json => {

        json.data.forEach(element => {

            let transfer = `<a href="./transferDetail?id=${element._id}">
          <li class='card__item'>
          <div class='card__transferInfo'>
              <p class='card__name'>${element.userFrom}</p>
              <p class='card__date'>${element.date}</p>
          </div>
          <div class='card__coinInfo'>
              <p class='card__coinsAmount'>${element.coins} coins</p>
          </div>
      </li>
      </a>`

            transferList.insertAdjacentHTML('afterbegin', transfer)

        });

    })
}

printTransfers();



// get user
let fullUserName;
let getUserData = () => {
    fetch('https://imd-virtual-currency-app.herokuapp.com/api/v1/transfers/user', {
        method: "get",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },

    }).then(response => {
        return response.json();
    }).then(json => {
        userBalance = json.user[0].coins;
        let coinsPlaceholder = document.querySelector('.header__coinsAmount');
        coinsPlaceholder.innerHTML = json.user[0].coins + " coins";

        let coinsWebsitePlaceholder = document.querySelector('.card__coinsAmount');
        coinsWebsitePlaceholder.innerHTML = "€" + json.user[0].coins ;

        let usernamePlaceholder = document.querySelector('.headerD__name');
        let usernamePlaceholder2 = document.querySelector('.header__name');

        usernamePlaceholder.innerHTML = json.user[0].fullname;
        usernamePlaceholder2.innerHTML = json.user[0].fullname;

    }).catch(err => {
        console.log(err)
    });
}

getUserData();


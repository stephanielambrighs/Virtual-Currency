//test
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

primus.on('data', (json) => {
    if (json.action === "addTransfer") {
        if (json.data.data.transfer.userFrom === fullUserName) {
        let transfer = `<a href="./transferDetail?id=${json.data.data.transfer._id}">
        <li class="card__item">
        <div class="card__transferInfo">
            <p class="card__name">${json.data.data.transfer.userFrom}</p>
            <p class='card__name'> To: ${json.data.data.transfer.userTo}</p>
            <p class="card__date">${json.data.data.transfer.date}</p>
        </div>
        <div class="card__coinInfo">
            <p class="card__coinsAmount">${json.data.data.transfer.coins} coins</p>
            <p class="card__arrow arrow__negative">&#8594;</p>
        </div>
    </li>
    </a>`

        transferList.insertAdjacentHTML('afterbegin', transfer)
    } else {
        let transfer = `<a href="./transferDetail?id=${json.data.data.transfer._id}">
        <li class="card__item">
        <div class="card__transferInfo">
            <p class="card__name">${json.data.data.transfer.userFrom}</p>
            <p class='card__name'> To: ${json.data.data.transfer.userTo}</p>
            <p class="card__date">${json.data.data.transfer.date}</p>
        </div>
        <div class="card__coinInfo">
            <p class='card__coinsAmount'>${json.data.data.transfer.coins} coins</p>
            <p class="card__arrow arrow__positive">&#8592;</p>
        </div>
    </li>
    </a>`
    transferList.insertAdjacentHTML('afterbegin', transfer)

    }
}
})

//print all transfers
let printTransfers = () => {
    fetch('https://imd-virtual-currency-app.herokuapp.com/api/v1/transfers/allT', {
        method: "get",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },

    }).then(response => {
        return response.json();
    }).then(json => {

        console.log(json);
        json.data.forEach(element => {

            if (element.userFrom === fullUserName) {
                let transfer = `<a href="./transferDetail?id=${element._id}">
                <li class='card__item'>
                <div class='card__transferInfo'>
                <p class='card__name'> From: ${element.userFrom}</p>
                <p class='card__name'> To: ${element.userTo}</p>
                    <p class='card__date'>${element.date}</p>
                </div>
                <div class='card__coinInfo'>
                    <p class='card__coinsAmount'>${element.coins} coins</p>
                    <p class='card__arrow arrow__negative'>&#8594;</p>
                </div>
            </li>
            </a>`

                transferList.insertAdjacentHTML('afterbegin', transfer)

            } else {
                let transfer = `<a href="./transferDetail?id=${element._id}">
                <li class='card__item'>
                <div class='card__transferInfo'>
                    <p class='card__name'> From: ${element.userFrom}</p>
                    <p class='card__name'> To: ${element.userTo}</p>
                    <p class='card__date'>${element.date}</p>
                </div>
                <div class='card__coinInfo'>
                    <p class='card__coinsAmount'>${element.coins} coins</p>
                    <p class='card__arrow arrow__positive'>&#8592;</p>
                </div>
            </li>
            </a>`

                transferList.insertAdjacentHTML('afterbegin', transfer)
            }

        });

    })
}

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
        fullUserName = json.user[0].fullname;
        printTransfers();

        let usernamePlaceholder = document.querySelector('.headerD__name');
        let usernamePlaceholder2 = document.querySelector('.header__name');

        usernamePlaceholder.innerHTML = json.user[0].fullname;
        usernamePlaceholder2.innerHTML = json.user[0].fullname;

        let coinsPlaceholder = document.querySelector('.header__coinsAmount');
        coinsPlaceholder.innerHTML = json.user[0].coins + " coins";

        let coinsWebsitePlaceholder = document.querySelector('.card__coinsAmount');
        coinsWebsitePlaceholder.innerHTML = "€" + json.user[0].coins ;
    }).catch(err => {
    });
}

getUserData();
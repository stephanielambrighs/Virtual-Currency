let transferList = document.querySelector('.card__list');

// PRIMUS LIVE 
primus = Primus.connect('http://localhost:3000', {
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
    fetch('http://localhost:3000/api/v1/transfers/allT', {
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
            console.log(fullUserName);

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





            /*let usernamePlaceholder = document.querySelector('.transferList');
            usernamePlaceholder.innerHTML = json.user[0].fullname;*/

        });

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
        printTransfers();



    }).catch(err => {
        console.log(err)
    });
}

getUserData();


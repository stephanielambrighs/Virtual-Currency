localStorage.getItem("token")||(window.location.href="../login");let transferList=document.querySelector(".card__list");primus=Primus.connect("http://localhost:3000",{reconnect:{max:1/0,min:500,retries:10}}),primus.on("data",a=>{if("addTransfer"===a.action)if(a.data.data.transfer.userFrom===fullUserName){let e=`<a href="./transferDetail?id=${a.data.data.transfer._id}">\n        <li class="card__item">\n        <div class="card__transferInfo">\n            <p class="card__name">${a.data.data.transfer.userFrom}</p>\n            <p class='card__name'> To: ${a.data.data.transfer.userTo}</p>\n            <p class="card__date">${a.data.data.transfer.date}</p>\n        </div>\n        <div class="card__coinInfo">\n            <p class="card__coinsAmount">${a.data.data.transfer.coins} coins</p>\n            <p class="card__arrow arrow__negative">&#8594;</p>\n        </div>\n    </li>\n    </a>`;transferList.insertAdjacentHTML("afterbegin",e)}else{let e=`<a href="./transferDetail?id=${a.data.data.transfer._id}">\n        <li class="card__item">\n        <div class="card__transferInfo">\n            <p class="card__name">${a.data.data.transfer.userFrom}</p>\n            <p class='card__name'> To: ${a.data.data.transfer.userTo}</p>\n            <p class="card__date">${a.data.data.transfer.date}</p>\n        </div>\n        <div class="card__coinInfo">\n            <p class='card__coinsAmount'>${a.data.data.transfer.coins} coins</p>\n            <p class="card__arrow arrow__positive">&#8592;</p>\n        </div>\n    </li>\n    </a>`;transferList.insertAdjacentHTML("afterbegin",e)}});let fullUserName,printTransfers=()=>{fetch("http://localhost:3000/api/v1/transfers/allT",{method:"get",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}}).then(a=>a.json()).then(a=>{console.log(a),a.data.forEach(a=>{if(a.userFrom===fullUserName){let e=`<a href="./transferDetail?id=${a._id}">\n                <li class='card__item'>\n                <div class='card__transferInfo'>\n                <p class='card__name'> From: ${a.userFrom}</p>\n                <p class='card__name'> To: ${a.userTo}</p>\n                    <p class='card__date'>${a.date}</p>\n                </div>\n                <div class='card__coinInfo'>\n                    <p class='card__coinsAmount'>${a.coins} coins</p>\n                    <p class='card__arrow arrow__negative'>&#8594;</p>\n                </div>\n            </li>\n            </a>`;transferList.insertAdjacentHTML("afterbegin",e)}else{let e=`<a href="./transferDetail?id=${a._id}">\n                <li class='card__item'>\n                <div class='card__transferInfo'>\n                    <p class='card__name'> From: ${a.userFrom}</p>\n                    <p class='card__name'> To: ${a.userTo}</p>\n                    <p class='card__date'>${a.date}</p>\n                </div>\n                <div class='card__coinInfo'>\n                    <p class='card__coinsAmount'>${a.coins} coins</p>\n                    <p class='card__arrow arrow__positive'>&#8592;</p>\n                </div>\n            </li>\n            </a>`;transferList.insertAdjacentHTML("afterbegin",e)}})})},getUserData=()=>{fetch("http://localhost:3000/api/v1/transfers/user",{method:"get",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}}).then(a=>a.json()).then(a=>{fullUserName=a.user[0].fullname,printTransfers();let e=document.querySelector(".headerD__name"),r=document.querySelector(".header__name");e.innerHTML=a.user[0].fullname,r.innerHTML=a.user[0].fullname,document.querySelector(".header__coinsAmount").innerHTML=a.user[0].coins+" coins",document.querySelector(".card__coinsAmount").innerHTML="€"+a.user[0].coins}).catch(a=>{})};getUserData();
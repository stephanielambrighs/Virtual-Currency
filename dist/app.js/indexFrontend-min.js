localStorage.getItem("token")||(window.location.href="../login");let transferList=document.querySelector(".card__list");primus=Primus.connect("http://localhost:3000",{reconnect:{max:1/0,min:500,retries:10}}),primus.on("data",e=>{if("addTransfer"===e.action){console.log(e);let a=`<li class='card__item'>\n        <div class='card__transferInfo'>\n            <p class='card__name'>${e.data.data.transfer.userFrom}</p>\n            <p class='card__date'>${e.data.data.transfer.date}</p>\n        </div>\n        <div class='card__coinInfo'>\n            <p class='card__coinsAmount'>${e.data.data.transfer.coins} coins</p>\n        </div>\n    </li>`;transferList.insertAdjacentHTML("afterbegin",a)}getUserData()});let fullUserName,printTransfers=()=>{fetch("http://localhost:3000/api/v1/transfers",{method:"get",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}}).then(e=>e.json()).then(e=>{e.data.forEach(e=>{let a=`<a href="./transferDetail?id=${e._id}">\n          <li class='card__item'>\n          <div class='card__transferInfo'>\n              <p class='card__name'>${e.userFrom}</p>\n              <p class='card__date'>${e.date}</p>\n          </div>\n          <div class='card__coinInfo'>\n              <p class='card__coinsAmount'>${e.coins} coins</p>\n          </div>\n      </li>\n      </a>`;transferList.insertAdjacentHTML("afterbegin",a)})})};printTransfers();let getUserData=()=>{fetch("http://localhost:3000/api/v1/transfers/user",{method:"get",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}}).then(e=>e.json()).then(e=>{userBalance=e.user[0].coins,document.querySelector(".header__coinsAmount").innerHTML=e.user[0].coins+" coins";let a=document.querySelector(".headerD__name"),t=document.querySelector(".header__name");a.innerHTML=e.user[0].fullname,t.innerHTML=e.user[0].fullname}).catch(e=>{console.log(e)})};getUserData();
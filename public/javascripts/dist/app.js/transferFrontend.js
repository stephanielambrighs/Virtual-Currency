let message_transfer = document.querySelector('.message_transfer');

if(!localStorage.getItem('token')){
  window.location.href = "../login";
}

/* Primus live */
primus = Primus.connect('http://localhost:3000', {
  reconnect: {
      max: Infinity,
      min: 500,
      retries: 10
  }
})

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
console.log(date);

let btn = document.querySelector('#card__btn');
let userFrom;
let userTo = '';
let coins = '';
let reason ='';
let description = '';

btn.addEventListener('click', function (e) {
    userTo = document.querySelector('#receiver').value;
    coins = document.querySelector('#card__amount').value;
    reason = document.querySelector('#card__reason').value;
    description = document.querySelector('#card__description').value;

    postTransfer();

    userTo = document.querySelector('#receiver').value = "";
    coins = document.querySelector('#card__amount').value ="";
    reason = document.querySelector('#card__reason').value="";
    description = document.querySelector('#card__description').value="";

})

let postTransfer = () => {
    fetch('http://localhost:3000/api/v1/transfers', {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
    body: JSON.stringify({
        "userFrom": userFrom,
        "userTo": userTo,
        "coins": coins,
        "reason": reason,
        "description": description,
        "date": date

    })
    }).then(response => {
        return response.json();
    }).then(json => {
       message_transfer.innerHTML = json.message;
       primus.write({ // aan de server laten weten dat er een transfer is bijgekomen
         "action": 'addTransfer',
         "data": json
       })

    }).catch(err => {
    });
}


let usersArray =[]
let getAllUser = () =>{
    fetch("http://localhost:3000/api/v1/transfers/allUsers", {
        method: "get",
        'headers': {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(result => {
        return result.json();
    }).then(json => {

        json.users.forEach(user => {
            usersArray.push(user.fullname)
        });
        autocomplete(document.getElementById("receiver"), usersArray);
        
    }).catch(err => {
        console.log(err)
    });
}

getAllUser();

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
      printTransfers();

      let coinsPlaceholder = document.querySelector('.header__coins');
      coinsPlaceholder.innerHTML = json.user[0].coins + " coins";

      let coinsWebsitePlaceholder = document.querySelector('.card__coinsAmount');
      coinsWebsitePlaceholder.innerHTML = "€" + json.user[0].coins ;

      let usernamePlaceholder = document.querySelector('.headerD__name');
      let usernamePlaceholder2 = document.querySelector('.header__name');

      usernamePlaceholder.innerHTML = json.user[0].fullname;
      usernamePlaceholder2.innerHTML = json.user[0].fullname;
  }).catch(err => {
  });
}

getUserData();


//autocomplete receiver field
function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }

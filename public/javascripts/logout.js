if(!localStorage.getItem('token')){
    window.location.href = "../login";
}else{
    window.localStorage.clear(); //clear all localstorage
    window.localStorage.removeItem("token"); //remove one item
    window.location.href = "../login";
}
let btnSignUp=document.querySelector(".btn"),fullname="",username="",email="",password="",coins="";btnSignUp.addEventListener("click",function(e){if(console.log("click"),fullname=document.querySelector("#fullname").value,username=document.querySelector("#username").value,email=document.querySelector("#email").value,password=document.querySelector("#password").value,validateEmail(email))postUser();else{let e=document.querySelector(".form__error");e.style.color="#B60A19",e.innerHTML="It must end with @student.thomasmore.be"}fullname=document.querySelector("#fullname").value="",username=document.querySelector("#username").value="",email=document.querySelector("#email").value="",password=document.querySelector("#password").value=""});let postUser=()=>{fetch("http://localhost:3000/users/signup",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({fullname:fullname,username:username,email:email,password:password,coins:100})}).then(e=>e.json()).then(e=>{if(console.log(e),"success"===e.status){let l=e.data.token;localStorage.setItem("token",l),window.location.href="/login",console.log(email+e)}else console.log("failed")})};function validateEmail(e){return e.match(/^[a-zA-Z0-9-._]+@student.thomasmore.be*$/)?(console.log("Valid email"),!0):(console.log("not valid"),!1)}
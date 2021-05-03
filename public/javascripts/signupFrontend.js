// ik maak hier een tijdelijk token aan zodat ik al kan verderwerken
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MDkwMTFjYmJhZjlhMzBmYjg1Njc5MzIiLCJ1c2VybmFtZSI6Ikp1c3ROaWNrIiwiaWF0IjoxNjIwMDU0NDc1fQ.0iKOE0RzAeffLJ3LptjJdnBK8545S5WwN33T4VrYllM';

//let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MDkwMTI0MTljYmQ4YjFkYjA1NTljNDciLCJ1c2VybmFtZSI6IlN0ZXBoa2UiLCJpYXQiOjE2MjAwNTQ1OTN9.ezbmM2crDZVHa_Y-Rwt0r9mue4WbDN6DTtNBF9lipLI';


localStorage.setItem("token", token);
window.location.href = "/";

console.log('test');
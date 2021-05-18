
const Primus = require('primus');

let go = (server) => {
    let primus = new Primus(server, {/* options */})
    primus.on('connection', (spark) => { //elke geconnecteerde client is een spark
        console.log('Received spark')

        spark.on('data', (data) => { //kijken of er data binnenkomt
            console.log(data)
            console.log("data received")
            primus.write(data); //.write = antwoord geven (laten weten dat er iets veranderd is) aan al de geconnecteerde clients
        });
    });
}

module.exports.go = go
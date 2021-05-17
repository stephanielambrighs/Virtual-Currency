const express = require('express');
const router = express.Router();
const transfersController = require('../../../controllers/api/v1/transfers');

router.get("/", transfersController.getAllIncomingT); //haal alle inkomende transfers op

router.get("/allT", transfersController.getAllT); //haal alle transfers op

router.get("/id/:id", transfersController.getOneT); //haal een specifieke transfer op aan de hand van het id

router.post("/", transfersController.createCoin); //post een transfer naar de db

router.get("/user", transfersController.getUser); //haal de data van een specifieke user op

router.get("/allUsers", transfersController.getAllUsers); //haal de data van alle users op

module.exports = router;
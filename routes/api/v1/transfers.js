const express = require('express');
const router = express.Router();
const transfersController = require('../../../controllers/api/v1/transfers');

router.get("/", transfersController.getAllIncomingT);

router.get("/allT", transfersController.getAllT);

router.get("/id/:id", transfersController.getOneT);

router.post("/", transfersController.createCoin);

router.get("/user", transfersController.getUser);

router.get("/allUsers", transfersController.getAllUsers)







module.exports = router;
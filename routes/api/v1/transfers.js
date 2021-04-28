const express = require('express');
const router = express.Router();
const transfersController = require('../../../controllers/api/v1/transfers');

router.get("/", transfersController.getAllT);

router.get("/:id", transfersController.getOneT);

router.post("/", transfersController.createCoin);





module.exports = router;
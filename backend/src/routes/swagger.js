const express = require("express")
const router = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../helpers/swagger');

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = router;
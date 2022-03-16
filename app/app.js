const express = require('express');
const customerRoutes = require('./routes/customers');
const systemRoutes = require('./routes/system');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(express.json());

app.use('/customer', customerRoutes);
app.use('/system', systemRoutes);

app.listen(3000, () => console.log('Server running on port 3000!'));

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API for customer app example',
        version: '1.0.0',
        license: {
            name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html',
        },
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
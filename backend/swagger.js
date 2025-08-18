const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'User Management API',
        version: '1.0.0',
        description: 'API documentation for the User Management backend (Express/MongoDB)',
    },
    servers: [
        {
            url: process.env.API_URL,
            description: 'server',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    },
    security: [{ bearerAuth: [] }],
};

const options = {
    swaggerDefinition,
    apis: [path.join(__dirname, 'src/routes/*.js')],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
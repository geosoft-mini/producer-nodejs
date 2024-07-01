const swaggerUi = require("swagger-ui-express")
const swaggereJsdoc = require("swagger-jsdoc")
const path = require('path')

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: '파일읽기 테스트',
      description:
        'API 테스트',
    },
    servers: [
      {
        url: "http://localhost:3000", // 요청 URL
      },
    ],
  },
  apis: [path.join(__dirname, '../routers/*.js')], //Swagger 파일 연동
}

const specs = swaggereJsdoc(options)

module.exports = { swaggerUi, specs }
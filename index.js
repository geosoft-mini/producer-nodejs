const express = require("express")
const app = express()
const port = 3000

const readCsv = require('./routers/readCsv/readCsv')
const swaggerTest = require('./routers/swaggerTest/swaggerTest')
const { swaggerUi, specs } = require("./swagger/swagger")
const convertToCsv = require('./routers/convertToCsv/convertToCsv')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use('/test', swaggerTest)
app.use('/csv', readCsv)
app.use('/xlsx-csv', convertToCsv)

app.listen(port, async () => {
	console.log(`app listening on port ${port}`)
})

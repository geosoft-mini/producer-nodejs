const express = require("express")
const app = express()
const port = 3000

const readCsv = require('./routers/readCsv/readCsv')
const swaggerTest = require('./routers/swaggerTest/swaggerTest')
const { swaggerUi, specs } = require("./swagger/swagger")

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use('/swaagerTest/', swaggerTest)
app.use('/readCsv/', readCsv)

app.listen(port, async () => {
	console.log(`app listening on port ${port}`)
})

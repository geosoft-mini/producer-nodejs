const express = require("express")
const app = express()
const port = 3000

const readCsv = require('./routers/csv/read-csv')
const swaggerTest = require('./routers/swaggertest/swagger')
const { swaggerUi, specs } = require("./swagger/swagger")


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use('/test/', swaggerTest)
app.use('/read-csv/', readCsv)

app.listen(port, async () => {
	console.log(`app listening on port ${port}`)
})

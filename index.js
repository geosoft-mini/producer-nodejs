const express = require("express")
const app = express()
const port = 3000

const readFile = require('./routers/readFile/read')
const swaggerTest = require('./routers/swaggerTest/swaggerTest')
const { swaggerUi, specs } = require("./swagger/swagger")
const convertToCsv = require('./routers/convertToCsv/convertToCsv')
const upload = require('./routers/readFile/fileRouter')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use('/test', swaggerTest)
app.use('/upload', upload)
app.use('/readFile', readFile)
app.use('/xlsx-csv', convertToCsv)

app.listen(port, async () => {
	console.log(`app listening on port ${port}`)
})

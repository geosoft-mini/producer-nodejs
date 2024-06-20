const express = require('express')
const cors = require('cors')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const url = require('url')
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
	clientId: 'test-group',
	brokers: ['localhost:9092']
})

const producer = kafka.producer()

const initKafka = async () => {
	await producer.connect()
}

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const sendProcuder = async (partitionIndex, result) => {
	await producer.send({
		topic: 'topic2',
		messages: [
			{ value: JSON.stringify(result), partition: partitionIndex % 3 },
		],
	})
}

const matrixResult = (splitFiles) => {
	let x = splitFiles[4]
	let y = splitFiles[5]
	let matrix = []

	matrix.push(x)
	matrix.push(y)

	return matrix
}

router.post('/', upload.single('list.csv'), async (req, res, next) => {
	
	const fileContent = req.file.buffer.toString('utf-8')
	const rows = fileContent.split('\r\n')
	rows.shift()
	const splitNum = 100
	const result = []

	for (let i = 0; i < rows.length / splitNum; i++) {
		
		for (let j = splitNum * i; j < splitNum * (i + 1); j++){
			let splitfile = rows[i].split(',')
			result.push(matrixResult(splitfile))
		}	

		await sendProcuder(i, result)
	}

	res.send('value : ' + JSON.stringify(result))
})

initKafka()
module.exports = router;








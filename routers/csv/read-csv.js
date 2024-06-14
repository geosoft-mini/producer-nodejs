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

router.post('/', upload.single('list.csv'), async (req, res, next) => {
	
	const fileContent = req.file.buffer.toString('utf-8')
	const rows = fileContent.split('\r\n')
	rows.shift()
	
	const result = []
	// 0 ~ 4999
	const partitiondata1 = []
	// 5000 ~ 9999
	const partitiondata2 = []
	// 10000 ~ 14999
	const partitiondata3 = []
	// 15000 ~ 19999
	const partitiondata4 = []
	// 20000 ~ 나머지
	const partitiondata5 = []

	for (let i = 0; i < rows.length; i++){

		let splitfile = rows[i].split(',')
		let x = splitfile[4]
		let y = splitfile[5]
		let matrix = []
		matrix.push(x)
		matrix.push(y)

		result.push(matrix)
	}
	await producer.send({
		topic: 'topic1',
		messages: [
			{ value: JSON.stringify(result), partition: 0},
		],
	})

	res.send('value : ' + JSON.stringify(result))
})

initKafka()
module.exports = router;








const express = require('express')
const router = express.Router()
const multer = require('multer')
const { producer } = require('../../producer/producer')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const topic = 'overspeed-detail-address'


const sendProcuder = async (topic, result, partitionIndex) => {
	await producer.send({
		topic: topic,
		messages: [
			{ value: JSON.stringify(result), partition: partitionIndex % 3 },
		],
	})
}


router.post('/', upload.single('list.csv'), async (req, res, next) => {

	const files = req.file.buffer.toString('utf-8')
	const rows = files.split('\r\n')
	rows.shift()

	const splitNum = 100

	for (let i = 0; i < rows.length / splitNum; i++) {
		const result = []
		for (let j = splitNum * i; j < splitNum * (i + 1); j++){
			try { result.push(rows[j].split(',')) } catch (error) {}
		}	
		await sendProcuder(topic, result, i)
	}

	res.send('response ok')
})

module.exports = router;
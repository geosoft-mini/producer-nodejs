const express = require('express')
const router = express.Router()
const multer = require('multer')
const { producer } = require('../../producer/producer')


const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


const sendProcuder = async (partitionIndex, result) => {
	// partitionIndex % 3
	await producer.send({
		topic: 'large-message',
		messages: [
			{ value: JSON.stringify(result), partition: 0 },
		],
	})
}

router.post('/', upload.single('list.csv'), async (req, res, next) => {
	
	const fileContent = req.file.buffer.toString('utf-8')
	const rows = fileContent.split('\r\n')
	rows.shift()

	const splitNum = 100
	const result = []

	for (let i = 0; i < rows.length / splitNum; i++) {
		
		for (let j = splitNum * i; j < splitNum * (i + 1); j++){
			let splitfile = rows[j].split(',')
			result.push(splitfile)
		}	

		await sendProcuder(i, result)
	}

	res.send('response ok')
})

module.exports = router;
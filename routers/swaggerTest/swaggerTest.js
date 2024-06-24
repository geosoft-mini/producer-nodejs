const express = require('express')
const router = express.Router()
const { producer } = require('../../producer/producer')

const sendProcuder = async (result, partitionIndex) => {
	await producer.send({
		topic: 'large-message',
		messages: [
			{ value: JSON.stringify(result), partition: partitionIndex % 3 },
		],
	})
}


router.get('/', async (req, res) => {

	for (let i = 0; i < 100; i++) {
		await sendProcuder(i, req.query)
		console.log(req.query)
	}

	res.send(req.query)
})


module.exports = router;
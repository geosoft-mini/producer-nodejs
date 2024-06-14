
const express = require('express')
const router = express.Router()
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
	clientId: 'test-group',
	brokers: ['localhost:9092']
})

const producer = kafka.producer()

const initKafka = async () => {
	await producer.connect()
}

router.post('/', async (req, res) => {
	
	console.log(req.body)

	await producer.send({
		topic: 'topic1',
		messages: [
			{ value: JSON.stringify(req.body) },
		],
	})
	res.send('value : ' + JSON.stringify(req.body))

})

initKafka()

module.exports = router
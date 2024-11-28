const { Kafka } = require('kafkajs')
const { Partitioners } = require('kafkajs')

const kafka = new Kafka({
	clientId: 'test-group1',
	brokers: ['localhost:9092']
})

const producer = kafka.producer({
	maxRequestSize: 200000000,
	createPartitioner: Partitioners.LegacyPartitioner
})

const initKafka = async () => {
	await producer.connect()
}

initKafka()
module.exports = { producer }


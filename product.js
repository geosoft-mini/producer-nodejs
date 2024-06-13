const { json } = require('body-parser')
const express = require('express')
const app = express()
const port = 3000

const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'test-group',
  brokers: ['localhost:9092']
})

const producer = kafka.producer()

const initKafka = async () => {
  await producer.connect()
}

app.post('/events/:event', async (req, res) => {
  await producer.send({
    topic: 'topic1',
    messages: [
      { value: JSON.stringify([127.35, 100.123])},
    ],
  })
  res.send('successfully stored event : '+ req.params.event + '\n')
})

app.listen(port, async  () => {
  console.log(`kafka app listening on port ${port}`)
})

initKafka();
const express = require('express')
const router = express.Router()
const multer = require('multer')
const { producer } = require('../../producer/producer')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const path = require('path')
const xlsx = require('xlsx')
const regex = /,{7,}/g

const topic = 'overspeed-detail-address'

const sendProcuder = async (topic, result, partitionIndex) => {
	await producer.send({
		topic: topic,
		messages: [
			{ value: JSON.stringify(result), partition: partitionIndex % 3 },
		],
	})
}

const sendData = async (rows, splitNum) => {
	const regx = ','
	for (let i = 0; i < rows.length / splitNum; i++) {

		const result = []
		for (let j = splitNum * i; j < splitNum * (i + 1); j++){
			try {
				if (rows[j] !== undefined) {
					const row = rows[j].split(regx)
					result.push(row)
				}
			} catch(error) {
				console.log(error)
			}
		}
		
		await sendProcuder(topic, result, i)
	}
}

function convertToCSV(files) {
	const workBook = xlsx.read(files, {type: 'buffer'})
	const sheetName = workBook.SheetNames[1]
	const ws = workBook.Sheets[sheetName]

	const csv = xlsx.utils.sheet_to_csv(ws)
	const csvLines = csv.replace(regex, '').trim()
  	return csvLines
}

router.post('/', upload.single('APK.xlsx'), async (req, res, next) => {
	const regx = '\n'
	const splitNum = 100
	const files = req.file.buffer
  	const csvLines = convertToCSV(files)
	const rows = csvLines.split(regx)
  	rows.shift()
	sendData(rows, splitNum)
	res.send(files)
})


module.exports = router;
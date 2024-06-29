const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const xlsx = require('xlsx')
const outputFilename = path.join(__dirname, '../../excel/list.csv'); 


router.post('/', upload.single('APK.xlsx'), async (req, res, next) => {

    const files = req.file.buffer
    const workBook = xlsx.read(files, {type: 'buffer'})
    const sheetName = workBook.SheetNames[1]
    const ws = workBook.Sheets[sheetName]

    const csv = xlsx.utils.sheet_to_csv(ws)
    const csvLines = csv.replace(/,{7,}/g, '')
    fs.writeFileSync(outputFilename, csvLines)

   
	res.send('response ok')
})

module.exports = router;


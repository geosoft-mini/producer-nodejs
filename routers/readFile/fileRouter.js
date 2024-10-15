const express = require('express')
const router = express.Router()
const fs = require('fs');
const path = require('path')


router.get('/', (request, response) => {
    console.log('# GET /upload');

    fs.readFile(path.join(__dirname, '../../html/upload.html'), 'utf8', (err, data) => {
        if(err) throw err;

        console.log('upload.html read');
        
        response.write(data);
        response.end();
    });
});

module.exports = router;
const router = require('express').Router()

/**
 * @swagger
 *  /test:
 *    get:
 *      tags:
 *      - test
 *      description: swaggerTest
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: query
 *          name: value
 *          required: false
 *          schema:
 *            type: string
 *            description: swaggerTest
 *      responses:
 *       200:
 *         description: 파일 업로드 성공
 *         content:
 *          application/json:
 *            schema:
 *               type: object
 *               properties:
 *                   result:
 *                     type: string
 *                     example:
 *                        {'value' : 'helle'}
 */
router.route('/:param/').get(async function(req, res){
  const param = req.params.param
  res.status(200).send(param)
})

/**
 * @swagger
 * /readFile:
 *   post:
 *     tags:
 *       - readFile
 *     description: 파일 읽기
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               APK.xlsx:
 *                 type: string
 *                 format: binary
 *                 description: 엑셀 파일을 업로드합니다.
 *     responses:
 *       200:
 *         description: 파일 업로드 성공
 *         content:
 *          application/json:
 *            schema:
 *               type: object
 *               properties:
 *                   result:
 *                     type: string
 *                     example:
 *                        response ok
 *             
 */
router.route('/:file/').get(async function(req, res){
  const file = req.params.file
  res.status(200).send(file)
})


// /**
//  * @swagger
//  * /xlsx-csv:
//  *   post:
//  *     tags:
//  *       - csv
//  *     description: 파일 읽기
//  *     consumes:
//  *       - multipart/form-data
//  *     requestBody:
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               APK.xlsx:
//  *                 type: string
//  *                 format: binary
//  *                 description: csv 파일을 업로드합니다.
//  *     responses:
//  *       200:
//  *         description: 파일 업로드 성공
//  *         content:
//  *          application/json:
//  *            schema:
//  *               type: object
//  *               properties:
//  *                   result:
//  *                     type: string
//  *                     example:
//  *                        response ok
//  *             
//  */
// router.route('/:file/').get(async function(req, res){
//   const file = req.params.file
//   res.status(200).send(file)
// })



module.exports = router

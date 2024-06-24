const router = require('express').Router()

/**
 * @swagger
 *  /swaagerTest:
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
 *            type: integer
 *            description: swaggerTest
 *      responses:
 *       200:
 *        description: 성공결과
 */
router.route('/:category/').get(async function(req, res){
    const category = req.params.category;
    res.status(200).send(category);
})

/**
 * @swagger
 * /readCsv:
 *   post:
 *     tags:
 *       - readCsv
 *     description: 파일 읽기
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               list.csv:
 *                 type: string
 *                 format: binary
 *                 description: CSV 파일을 업로드합니다.
 *     responses:
 *       200:
 *         description: 파일 업로드 성공
 *         content:
 *          application/json:
 *            schema:
 *               type: object
 *               properties:
 *                   ok:
 *                     type: boolean
 *                   result:
 *                     type: string
 *                     example:
 *                        response ok
 *             
 */
router.route('/:file/').get(async function(req, res){
    const file = req.params.file;
    res.status(200).send(file);
})


module.exports = router

/**
 * @swagger
 * /pin/{board}:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Post
 *     name: 게시글 등록
 *     summary: 게시글 등록(사용 가능)
 *     parameters:
 *       - name: board
 *         in: path
 *         required: true
 *         default:
 *         schema:
 *           type: string
 *           description:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               description: 핀 제목
 *             desc:
 *               type: String
 *               description: 핀 내용
 *     responses:
 *       '201':
 *         description: 핀 등록 완료.
 *       '404':
 *         description: 해당 경로를 찾을 수 없음.
 */

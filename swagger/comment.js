/**
 * @swagger
 * /comment/{pin}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Comment
 *     name: 댓글 추가
 *     summary:
 *     parameters:
 *       - name: pin
 *         in: path
 *         required: true
 *         default:
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: 댓글 작성 성공
 *       '404':
 *         description: 페이지 오류
 *       '500':
 *         description: DB 접속 에러
 * /comment:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Comment
 *     name: 댓글 등록 기능
 *     summary:
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             content:
 *               type: string
 *               description: 댓글 내용
 *             pin:
 *               type: string
 *               description: 핀 내용
 *         example:
 *           content: "댓글 수정 되지나 확인해 보자~"
 *           pin: "핀 내용 되나 보자"
 *     responses:
 *       '200':
 *         description: 댓글 수정이 완료되었습니다.
 *       '404':
 *         description: 해당 URL을 찾을 수 없습니다.
 *       '500':
 *         description: DB 접속 에러
 * /comment/{comment}:
 *   patch:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Comment
 *     name: 댓글 수정 기능
 *     summary: 댓글 수정 기능(사용 가능)
 *     parameters:
 *       - name: comment
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
 *             content:
 *               type: string
 *               description: 댓글 내용
 *         example:
 *             content: "내용 확인해 보자~"
 *     responses:
 *       '200':
 *         description: 댓글 수정 완료
 *       '404':
 *         description: 해당 URL을 찾을 수 없습니다.
 *       '500':
 *         description: DB 접속 에러
 * /comment/like/{comment}:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Comment
 *     name: 댓글 좋아요 기능
 *     summary:
 *     parameters:
 *       - name: comment
 *         in: path
 *         required: true
 *         default:
 *         schema:
 *           type: string
 *           description:
 *     responses:
 *       '200':
 *         description: 댓글 수정 완료
 *       '404':
 *         description: 해당 URL을 찾을 수 없습니다.
 *       '500':
 *         description: DB 접속 에러
 */

/**
 * @swagger
 * /comment/{pin}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Comment
 *     name: 상세페이지 댓글
 *     summary: 상세페이지 댓글
 *     parameters:
 *       - name: pin
 *         in: path
 *         required: true
 *         default:
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: 성공
 *       '404':
 *         description: 페이지 오류
 *       '500':
 *         description: 서버 에러
 * /comment:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Comment
 *     name: 댓글 등록
 *     summary: 댓글 등록
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
 *             example:
 *               content: "댓글 수정"
 *               pin: "핀 내용"
 *     responses:
 *       '200':
 *         description: 댓글 수정이 완료되었습니다.
 *       '404':
 *         description: 해당 URL을 찾을 수 없습니다.
 *       '500':
 *         description: 서버 에러
 * /comment/{comment}:
 *   patch:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Comment
 *     name: 댓글 수정
 *     summary: 댓글 수정
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
 *           example:
 *               content: "수정 내용"
 *     responses:
 *       '200':
 *         description: 댓글 수정 완료
 *       '404':
 *         description: 해당 URL을 찾을 수 없습니다.
 *       '500':
 *         description: 서버 에러
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Comment
 *     name: 댓글 삭제
 *     summary: 댓글 삭제
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
 *         description: 댓글 삭제 완료
 *       '404':
 *         description: 해당 URL을 찾을 수 없습니다.
 *       '500':
 *         description: 서버 에러
 * /comment/like/{comment}:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Comment
 *     name: 댓글 좋아요
 *     summary: 댓글 좋아요
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
 *         description: 댓글 좋아요
 *       '404':
 *         description: 해당 URL을 찾을 수 없습니다.
 *       '500':
 *         description: 서버 에러
 */

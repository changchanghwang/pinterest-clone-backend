/**
 * @swagger
 * /view/submit:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *       - view
 *     name: 등록 페이지
 *     summary: 등록 페이지(사용 가능)
 *     responses:
 *       '200':
 *         description: 성공
 *       '404':
 *         description: 경로 에러
 *       '500':
 *         description: 서버 에러
 *
 * /view/my:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *       - view
 *     name: 마이 페이지
 *     summary: 마이 페이지(사용 가능)
 *     responses:
 *       '200':
 *         description: 마이페이지 접근 성공
 *       '404':
 *         description: 잘못된 경로로 접근
 *       '401':
 *         description: 로그인이 안된 유저인 경우
 * /view/login:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *       - view
 *     name: 로그인 페이지 불러오기
 *     summary:
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             imgURL:
 *               type: string
 *               description: 이미지 경로
 *     responses:
 *       '200':
 *         description: 성공
 *       '404':
 *         description: 경로를 찾을 수 없다.
 *       '500':
 *         description: 서버쪽에서 발생한 에러
 * /view/main:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *       - view
 *     name: 메인 페이지
 *     summary:
 *     responses:
 *       '200':
 *         description: 성공
 *       '404':
 *         description: 경로를 찾을 수 없다.
 *       '500':
 *         description: 서버쪽에서 발생한 에러
 * /view/detail/{pin}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *       - view
 *     name: 상세 페이지
 *     summary:
 *     parameters:
 *       - name: pin
 *         in: path
 *         required: true
 *         default:
 *         schema:
 *           type: string
 *           description:
 *     responses:
 *       '200':
 *         description: 성공
 *       '404':
 *         description: 경로를 찾을 수 없다.
 *       '500':
 *         description: 서버쪽에서 발생한 에러
 */

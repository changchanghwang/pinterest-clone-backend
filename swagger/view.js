/**
 * @swagger
 * /view/submit:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *       - view
 *     name: 등록 페이지
 *     summary: 등록 페이지
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
 *     summary: 마이 페이지
 *     responses:
 *       '200':
 *         description: 마이페이지 접근 성공
 *       '404':
 *         description: 잘못된 경로로 접근
 *       '401':
 *         description: 로그인이 안된 유저인 경우
 * /view/main:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *       - view
 *     name: 메인 페이지
 *     summary: 메인 페이지
 *     responses:
 *       '200':
 *         description: 성공
 *       '404':
 *         description: 경로를 찾을 수 없다.
 *       '500':
 *         description: 서버 에러
 * /view/detail/{pin}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *       - view
 *     name: 상세 페이지
 *     summary: 상세 페이지
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
 *         description: 서버 에러
 * /view/search/{word}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *       - view
 *     name: 검색 기능
 *     summary: 검색 기능
 *     parameters:
 *       - name: word
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
 *         description: 서버 에러
 */

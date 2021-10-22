/**
 * @swagger
 * /user/signup:
 *   post:
 *     tags:
 *       - User
 *     summary: 회원 등록
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             age:
 *               type: string
 *           example:
 *             email: "jcw@naver.com"
 *             password: "ckd12300"
 *             age: "20"
 *     responses:
 *       '201':
 *         description: 회원 등록 성공!(Created)
 *       '404':
 *         description: 경로를 찾지 못했습니다.(Not Found)
 * /user/login:
 *   post:
 *     tags:
 *       - User
 *     summary: 로그인 기능
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *           example:
 *             email: "jcw@naver.com"
 *             password: "ckd12300"
 *     responses:
 *       '201':
 *         description: 로그인 성공!
 *       '401':
 *         description: 아이디 또는 패스워드 불일치
 *       '500':
 *         description: 로그인 기능 중, 서버 측에서 예상치 못한 에러 발생
 * /user/login/{email}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - User
 *     name: 로그인 체크 기능
 *     summary: 로그인 체크 기능
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         default:
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: 로그인 되어 있는 유저
 *       '401':
 *         description: 로그인 되어 있지 않은 유저
 *       '500':
 *         description: 서버 에러
 */

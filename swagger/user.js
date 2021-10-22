/**
 * @swagger
 * /user/signup:
 *   post:
 *     tags:
 *      - User
 *     summary: 회원 등록
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *            age:
 *              type: string
 *            example:
 *              email: "jcw@naver.com"
 *              password: "ckd12300"
 *              age: "20"
 *     responses:
 *       '201':
 *         description: 회원 등록 성공!(Created)
 *       '307':
 *         description: 아이디 혹은 닉네임 중복이 있을 경우 발생하는 에러(Temporary Redirect)
 *       '404':
 *         description: 경로를 찾지 못했습니다.(Not Found)
 *       '500':
 *         description: 회원가입시 발생한 예상하지 못한 에러(Internal Server Error)
 * /user/login:
 *   post:
 *     tags:
 *       - User
 *     summary: 로그인 기능(사용 가능)
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
 *         example:
 *             email: "jcw"
 *             password: "ckd123"
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
 *     name: 로그인 체크 기능(사용 가능)
 *     summary: 로그인 체크 기능(사용 가능)
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
 *         description: 예상하지 못한 에러
 */

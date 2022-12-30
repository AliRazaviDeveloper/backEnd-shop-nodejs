const authController = require("../../controllers/auth/authController");
const authRouter = require("express").Router();
/**
 * @swagger
 * tags:
 *  name: Authorization
 *  description: The Authorization managing the authentication API
 */
/**
 * @swagger
 * tag: Authorization
 * /api/v1/auth/get-otp:
 *  post:
 *    summary: The authorization information get otp process
 *    tags: [Authorization]
 *    parameters:
 *    - name: phone
 *      description: Phone number IR endpoint
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *        201:
 *          description: Success
 *        401:
 *          description: bad request error login process
 *        500:
 *          description: Internal server error
 */
authRouter.post("/get-otp", authController.getOtp);
/**
 * @swagger
 * tag: Authorization
 * /api/v1/auth/check-otp:
 *  post:
 *    summary: The authorization information check otp process
 *    tags: [Authorization]
 *    parameters:
 *    - name: phone
 *      description: Phone number IR endpoint
 *      in: formData
 *      required: true
 *      type: string
 *    - name: code
 *      description: code sms
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *        201:
 *          description: Success
 *        401:
 *          description: bad request error login process
 *        500:
 *          description: Internal server error
 */
authRouter.post("/check-otp", authController.checkOtp);
module.exports = authRouter;

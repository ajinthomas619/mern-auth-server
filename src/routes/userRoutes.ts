import express from 'express'
import { userController } from '../adapters'
import authMiddleware from '../middlewares/authMiddleware'
import axios from 'axios'
import { log } from 'console'


export default (dependencies:any)=>{
    const router = express.Router()
    const {
        loginController,
        signupControler,
        verifyOtpController,
        logoutController,
        refreshTokenController
        
    } = userController(dependencies)

router.post('/login', loginController)
router.post('/signup',signupControler)
router.post('/verify-otp',verifyOtpController)
router.get('/logout',logoutController)
router.get('/refresh',refreshTokenController)

 
 

return router
}
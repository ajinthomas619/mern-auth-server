import loginController from "./loginController";
import signupControler from "./signupController";
import verifyOtpController from "./verifyOtpController";
import logoutController from "./logoutController";
import refreshTokenController from "./refreshTokenController";

export default (dependencies:any)=>{
    return{
        signupControler:signupControler(dependencies),
        verifyOtpController : verifyOtpController(dependencies),
        loginController:loginController(dependencies),
        logoutController:logoutController(dependencies),
        refreshTokenController:refreshTokenController(dependencies)
    }
}

import {userRepository} from '../app/repository';
import {addUser_useCase} from '../useCases/user/create_user'
import { userLogin_useCase } from '../useCases/user/login';
import {verifyOtp_Usecase} from '../useCases/user/verifyotp'

import { refreshTokeUsecase } from '../useCases';


const useCase:any ={
    addUser_useCase,
    userLogin_useCase,
    verifyOtp_Usecase,
    refreshTokeUsecase
    
}
const repository:any={
    userRepository
}
export default{useCase,repository}
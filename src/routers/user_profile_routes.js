
import {Router} from 'express'
import { createProfileForUser, deleteProfileForUser, getUserProfile } from '../controllers/user_profile_controllers.js'



const router = Router()

router.post('/users/:userId/profile', createProfileForUser)

router.get('/users/:userId/profile', getUserProfile)

router.delete('/users/:userId/profile', deleteProfileForUser)


export default router
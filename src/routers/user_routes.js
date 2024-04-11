import {Router} from 'express'
import { createUser, deleteUser, listAllUsers, updateUser, userByID } from '../controllers/user_controllers.js'


const router = Router()


router.post('/user',createUser)
router.get('/users',listAllUsers)
router.get('/user/:id',userByID)
router.put('/user/:id',updateUser)
router.delete('/user/:id',deleteUser)


export default router
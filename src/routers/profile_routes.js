import {Router} from 'express'
import { createProfile, deleteProfile, listAllProfiles, profileByID, updateProfile } from '../controllers/profile_controllers.js'


const router = Router()


router.post('/profile',createProfile)
router.get('/profiles',listAllProfiles)
router.get('/profile/:id',profileByID)
router.put('/profile/:id',updateProfile)
router.delete('/profile/:id',deleteProfile)


export default router
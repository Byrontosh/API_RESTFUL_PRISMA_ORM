import {Router} from 'express'
import { changeStatusService, createService, deleteService, listAllServices, serviceByID, updateService } from '../controllers/service_controllers.js'


const router = Router()


router.post('/service',createService)
router.get('/services',listAllServices)
router.get('/service/:id',serviceByID)
router.put('/service/:id',updateService)
router.delete('/service/:id',deleteService)
router.patch('/service/:id',changeStatusService)



export default router

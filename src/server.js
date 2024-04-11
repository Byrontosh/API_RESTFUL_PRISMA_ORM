// Requerir los módulos
import express from 'express'
import dotenv from 'dotenv'
import routerUser from './routers/user_routes.js'
import routerProfile from './routers/profile_routes.js'
import routerService from './routers/service_routes.js'
import routerUserProfile from './routers/user_profile_routes.js'



// Inicializaciones
const app = express()
dotenv.config()

// Variables
app.set('port',process.env.port || 3000)


// Middlewares 
app.use(express.json())





// Rutas 
app.use('/api',routerUser)
app.use('/api',routerProfile)
app.use('/api',routerService)
app.use('/api',routerUserProfile)

// Manejo de una ruta que no sea encontrada
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))





// Exportar la instancia de express por medio de app
export default  app
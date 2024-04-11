import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()


const createService = async(req,res)=>{

    const {name,decription,price,status,userId} = req.body

    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Sorry, all fields are obligated"})

    try {
        const newService = await prisma.service.create({
            data:{
                name,
                decription,
                price:+price,
                status:Boolean(status),
                user:{
                    connect:{
                        id:+userId
                    }
                }
            }
        })
        res.status(200).json({res:'New service created', data:newService})
    } catch (error) {
        return res.status(500).json({ msg: "Sorry, there is one problem with creating a service", error: error.message })
    }
}


const listAllServices = async(req,res)=>{

    try {
        const services = await prisma.service.findMany({
            where:{
                status:true
            }
        })
        res.status(200).json({res:'Services registred', data:services})

    } catch (error) {
        return res.status(500).json({ msg: "Sorry, there is one problem with the list of services", error: error.message })  
    }
}



const serviceByID = async(req,res)=>{
    
    if (isNaN(parseInt(req.params.id))) return res.status(400).send({ msg: "Sorry, the ID provided isn't valid" })

    try {
        const serviceFind = await prisma.service.findUnique({
            where:{
                id:+req.params.id
            }
        })
        if (!serviceFind) return res.status(404).send({ msg: "Sorry, the ID provided doesn't belong to any service" })
        
        const service = await prisma.service.findFirst({
            where:{
                id:+req.params.id
            }
        })
        res.status(200).json({res:'Details of service', data:service})
    } catch (error) {
        return res.status(500).json({ msg: "Sorry, there is one problem with details of service", error: error.message })
    }
}


const updateService = async(req,res)=>{

    if (isNaN(parseInt(req.params.id))) return res.status(400).send({ msg: "Sorry, the ID provided isn't valid" })

    const {name,decription,price,status} = req.body

    try {
        const serviceFind = await prisma.service.findUnique({
            where:{
                id:+req.params.id
            }
        })
        if (!serviceFind) return res.status(404).send({ msg: "Sorry, the ID provided doesn't belong to any service" })
        
        const serviceUpdated = await prisma.service.update({
            where:{
                id:+req.params.id
            },
            data:{
                name,
                decription,
                price:+price,
                status:Boolean(status)
            }
        })
        res.status(200).json({res:'Service updated', data:serviceUpdated})
    } catch (error) {
        return res.status(500).json({ msg: "Sorry, there is one problem with updating a service", error: error.message })  
    }
}

const deleteService = async(req,res)=>{

    if (isNaN(parseInt(req.params.id))) return res.status(400).send({ msg: "Sorry, the ID provided isn't valid" })

    try {
        const serviceFind = await prisma.service.findUnique({
            where:{
                id:+req.params.id
            }
        })
        if (!serviceFind) return res.status(404).send({ msg: "Sorry, the ID provided doesn't belong to any service" })

        const service = await prisma.service.delete({
            where:{
                id:+req.params.id
            }
        })
        res.status(200).json({res:'Service deleted', data:service})
    } catch (error) {
        return res.status(500).json({ msg: "Sorry, there is one problem with deleting a service", error: error.message })
    }
}

const changeStatusService = async(req,res)=>{
    
    if (isNaN(parseInt(req.params.id))) return res.status(400).send({ msg: "Sorry, the ID provided isn't valid" })
    
    try {
        const serviceFind = await prisma.service.findUnique({
            where:{
                id:+req.params.id
            }
        })
        if (!serviceFind) return res.status(404).send({ msg: "Sorry, the ID provided doesn't belong to any service" })
        
        
        if ((req.body.status!=="true") || (req.body.status!=="false")) return res.status(404).send({ msg: "Sorry, the status provided doesn't belong to true or false" })

        const serviceUpdated = await prisma.service.update({
            where:{
                id:+req.params.id
            },
            data:{
                status: req.body.status === "true"
            }
        })
        res.status(200).json({res:'Service changed', data:serviceUpdated})
    } catch (error) {
        return res.status(500).json({ msg: "Sorry, there is one problem with change a service", error: error.message })
    }
}




export{
    createService,
    listAllServices,
    serviceByID,
    updateService,
    deleteService,
    changeStatusService 
}
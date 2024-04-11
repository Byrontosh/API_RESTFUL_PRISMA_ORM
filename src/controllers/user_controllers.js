import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()




const createUser = async(req,res)=>{

    const {name,lastname,email} = req.body

    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Sorry, all fields are obligated"})

    try {
        const newUser = await prisma.user.create({
            data:{
                name,
                lastname,
                email,
            }
        })
        res.status(200).json({res:'New user created', data:newUser})
    } catch (error) {
        return res.status(500).json({ msg: "Sorry, there is one problem with creating a user", error: error.message })
    }
}



const listAllUsers = async(req,res)=>{

    try {
        const users = await prisma.user.findMany({
            include:{
                services:true
            }
        })
        res.status(200).json({res:'Users registred', data:users})
    } catch (error) {
        return res.status(500).json({ msg: "Sorry, there is one problem with the list of users", error: error.message })
    }
}


const userByID = async(req,res)=>{

    if (isNaN(parseInt(req.params.id))) return res.status(400).send({ msg: "Sorry, the ID provided isn't valid" })
    try {
        const userFind = await prisma.user.findUnique({
            where:{
                id:+req.params.id
            }
        })
        if (!userFind) return res.status(404).send({ msg: "Sorry, the ID provided doesn't belong to any user" })

        const user = await prisma.user.findFirst({
            where:{
                id:+req.params.id
            },
            include:{
                services:{
                    select:{
                        name:true,
                        decription:true,
                        price:true
                    }
                }
            }
        })
        res.status(200).json({res:'Details of user', data:user})
    } catch (error) {
        return res.status(500).json({ msg: "Sorry, there is one problem with details of user", error: error.message })
    }
}



const updateUser = async(req,res)=>{

    if (isNaN(parseInt(req.params.id))) return res.status(400).send({ msg: "Sorry, the ID provided isn't valid" })

    
    const {name,lastname,email,cellphone} = req.body

    try {
        const userFind = await prisma.user.findUnique({
            where:{
                id:+req.params.id
            }
        })
        if (!userFind) return res.status(404).send({ msg: "Sorry, the ID provided doesn't belong to any user" })
        
        const userFindWithEmail = await prisma.user.findUnique({
            where:{
                email:req.body.email
            }
        })
        if (userFindWithEmail) return res.status(404).send({ msg: "Sorry, the email provided belongs to any user registered" })

        const userUpdated = await prisma.user.update({
            where:{
                id:+req.params.id
            },
            data:{
                name,
                lastname,
                email,
                cellphone
            }
        })
        res.status(200).json({res:'User updated', data:userUpdated})

    } catch (error) {
        return res.status(500).json({ msg: "Sorry, there is one problem with updating a user", error: error.message })
    }

}



const deleteUser = async(req,res)=>{

    if (isNaN(parseInt(req.params.id))) return res.status(400).send({ msg: "Sorry, the ID provided isn't valid" })

    try {
        const userFind = await prisma.user.findUnique({
            where:{
                id:+req.params.id
            }
        })
        if (!userFind) return res.status(404).send({ msg: "Sorry, the ID provided doesn't belong to any user" })

        const user = await prisma.user.delete({
            where:{
                id:+req.params.id
            }
        })
        res.status(200).json({res:'User deleted', data:user})
    } catch (error) {
        return res.status(500).json({ msg: "Sorry, there is one problem with deleting a user", error: error.message })
    }
}

export{
    createUser,
    listAllUsers,
    userByID,
    updateUser,
    deleteUser
}
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()


const createProfile = async(req,res)=>{

    const {name,userId} = req.body

    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Sorry, all fields are obligated"})

    try {
        const newProfile = await prisma.profile.create({
            data:{
                name,
                user:{
                    connect:{
                        id:+userId
                    }
                }
            }
        })
        res.status(200).json({res:'New profile created', data:newProfile}) 
    } catch (error) {
        return res.status(500).json({ msg: "Sorry, there is one problem with creating a profile", error: error.message })
    }
}

const listAllProfiles = async(req,res)=>{

    try {
        const profiles = await prisma.profile.findMany()
        res.status(200).json({res:'Profiles registred', data:profiles})
    } catch (error) {
        return res.status(500).json({ msg: "Sorry, there is one problem with the list of profiles", error: error.message })
    }
}


const profileByID = async(req,res)=>{

    if (isNaN(parseInt(req.params.id))) return res.status(400).send({ msg: "Sorry, the ID provided isn't valid" })
    
    try {
        
        const profileFind = await prisma.profile.findUnique({
            where:{
                id:+req.params.id
            }
        })
        if (!profileFind) return res.status(404).send({ msg: "Sorry, the ID provided doesn't belong to any profile" })
        
        const profile = await prisma.profile.findFirst({
            where:{
                id:+req.params.id
            }
        })
        res.status(200).json({res:'Details of profile', data:profile})

    } catch (error) {
        return res.status(500).json({ msg: "Sorry, there is one problem with details of profile", error: error.message })
    }
}


const updateProfile = async(req,res)=>{

    if (isNaN(parseInt(req.params.id))) return res.status(400).send({ msg: "Sorry, the ID provided isn't valid" })

    const {name} = req.body

    try {
        const profileFind = await prisma.profile.findUnique({
            where:{
                id:+req.params.id
            }
        })
        if (!profileFind) return res.status(404).send({ msg: "Sorry, the ID provided doesn't belong to any profile" })
            
        const profileUpdated = await prisma.profile.update({
            where:{
                id:+req.params.id
            },
            data:{
                name
            }
        })
    
        res.status(200).json({res:'Profile updated', data:profileUpdated})

    } catch (error) {
        return res.status(500).json({ msg: "Sorry, there is one problem with updating a profile", error: error.message })
    }
}


const deleteProfile = async(req,res)=>{

    if (isNaN(parseInt(req.params.id))) return res.status(400).send({ msg: "Sorry, the ID provided isn't valid" })

    try {
        const profileFind = await prisma.profile.findUnique({
            where:{
                id:+req.params.id
            }
        })
        if (!profileFind) return res.status(404).send({ msg: "Sorry, the ID provided doesn't belong to any profile" })

        const profile = await prisma.profile.delete({
            where:{
                id:+req.params.id
            }
        })
    
        res.status(200).json({res:'Profile deleted', data:profile})

    } catch (error) {
        return res.status(500).json({ msg: "Sorry, there is one problem with deleting a profile", error: error.message })
    }
}



export{
    createProfile,
    listAllProfiles,
    profileByID,
    updateProfile,
    deleteProfile
}
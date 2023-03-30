import doctorsServices from "../services/doctorsServices.js";

async function create(req, res) {
    const {name, email, password, location, specialty, crm} = req.body

    try {

        await doctorsServices.create({name, email, password, location, specialty, crm});

        return res.sendStatus(201)
        
    } catch (error) {
        return res.status(500).send(error.message)
    }

}

async function signIn(req, res) {
    const {email, password} = req.body

    try {

        const token = await doctorsServices.signIn({email, password});

        return res.send({token})
        
    } catch (error) {
        return res.status(500).send(error.message)
    }

}



export default {
    create,
    signIn
}
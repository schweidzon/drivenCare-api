import doctorsServices from "../services/doctorsServices.js";

async function create(req, res) {
    const {name, email, password, location, specialty} = req.body

    try {

        await doctorsServices.create({name, email, password, location, specialty});

        return res.sendStatus(201)
        
    } catch (error) {
        return res.status(500).send(error.message)
    }

}



export default {
    create
}
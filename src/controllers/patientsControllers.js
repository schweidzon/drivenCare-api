import patientsService from "../services/patientsService.js";

async function create(req, res) {
    const { name, email, password, phone } = req.body;

    try {
        await patientsService.create({ name, email, password, phone });

        return res.sendStatus(201);

    } catch (error) {
        return res.status(500).send(error.message);
    }


}

async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        const token = await patientsService.signIn({  email, password });

        return res.send({token});

    } catch (error) {
        return res.status(500).send(error.message);
    }



}

async function checkAppointments(req, res) {    
    const patient = res.locals.patient
    try {

        const appointments = await patientsService.checkAppointments(patient.id)




        return res.status(200).send(appointments)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export default {
    create,
    signIn,
    checkAppointments
}
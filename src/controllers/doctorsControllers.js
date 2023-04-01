import doctorsServices from "../services/doctorsServices.js";

async function create(req, res) {
    const { name, email, password, location, specialty, crm } = req.body

    try {

        await doctorsServices.create({ name, email, password, location, specialty, crm });

        return res.sendStatus(201)

    } catch (error) {
        return res.status(500).send(error.message)
    }

}

async function signIn(req, res) {
    const { email, password } = req.body

    try {

        const token = await doctorsServices.signIn({ email, password });

        return res.send({ token })

    } catch (error) {
        return res.status(500).send(error.message)
    }

}

async function findDoctors(req, res) {
    const { doctorName } = req.body

    const { doctorSpecialty } = req.body

    const { doctorLocation } = req.body


    try {

        
        let doctor;

        if (doctorName) {
            doctor = await doctorsServices.findDoctor(doctorName)
           
        }
        if (doctorSpecialty) {

            doctor = await doctorsServices.findDoctor( doctorSpecialty )
        }

        if (doctorLocation) {

            doctor = await doctorsServices.findDoctor( doctorLocation )
        }

        return res.send(doctor)

    } catch (error) {
        return res.status(500).send(error.message)
    }
}


async function createAppointment(req, res) {
    const {appointmentId, doctorId} = req.body
    
    const patient = res.locals.patient
   
    try {

        await doctorsServices.createAppointment({appointmentId, patientId:patient.id, doctorId})

        return res.sendStatus(201)

        
    } catch (error) {
        return res.status(500).send(error.message)
    }

}

async function checkAppointment(req, res) {
    const doctor = res.locals.doctor;
 
    try {

        const appointments = await doctorsServices.checkAppointments(doctor.id)

        return res.send(appointments)
        
    } catch (error) {
        return res.status(500).send(error.message);
    }

}

async function confirmAppointment(req, res) {
    const {id} = req.params
   
    const doctor = res.locals.doctor;
    try {
        await doctorsServices.confirmAppointment(id)
        return res.status(201).send("Horário confirmado com sucesso")
        
    } catch (error) {
        return res.status(500).send(error.message);
    }

}

async function cancelAppointment(req, res) {
    const {id} = req.params
   
    const doctor = res.locals.doctor;
    try {
        await doctorsServices.cancelAppointment(id)

        return res.status(204).send("Horário cancelado com sucesso")
        
    } catch (error) {
        return res.status(500).send(error.message);
    }

}

async function finishAppointment(req, res) {
    const {id} = req.params

    try {

        await doctorsServices.finishAppointment(id)

        return res.status(204).send("Consulta finalizada com sucesso!")
        
    } catch (error) {
        return res.status(500).send(error.message);
    }


}

async function checkAppointmentHistory(req, res) {
    const doctor = res.locals.doctor
    try {

        const appointments = await doctorsServices.checkAppointmentsHistory(doctor.id)

        return res.send(appointments)
        
    } catch (error) {
        return res.status(500).send(error.message);
    }

}


export default {
    create,
    signIn,
    findDoctors,
    createAppointment,
    checkAppointment,
    confirmAppointment,
    cancelAppointment,
    finishAppointment,
    checkAppointmentHistory
}
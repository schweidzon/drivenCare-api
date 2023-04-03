import bcrypt from 'bcrypt';
import patientsRepository from '../repositories/patientsRepository.js';
import { v4 as uuidV4 } from 'uuid';
import jwt from 'jsonwebtoken'


async function create({ name, email, password, phone }) {

    const { rowCount } = await patientsRepository.findByEmail(email)

    if (rowCount) throw new Error("User already exists")

    const hashPassword = await bcrypt.hash(password, 10)

    await patientsRepository.create({ name, email, password: hashPassword, phone })

}

async function signIn({ email, password }) {
    const { rows: [patient] } = await patientsRepository.findByEmail(email)
    if (!patient) throw new Error("Incorrect email or password")

    const hashPassword = await bcrypt.compare(password, patient.password)
    if (!hashPassword) throw new Error("Incorrect email or password")

    const token = jwt.sign({id: patient.id}, process.env.SECRET, {expiresIn: 86400})
    

    return token

}

async function checkAppointments(id) {
    const { rows: appointments } = await patientsRepository.checkAppointment(id)

    if (appointments.length === 0) throw new Error("Você não tem nenhuma consulta marcada")


    return appointments
}

async function checkAppointmentsHistory(id) {
    const { rows: appointments } = await patientsRepository.checkAppointmentHistory(id)

    if (appointments.length === 0) throw new Error("Você não tem nenhuma consulta finalizada")


    return appointments

}

export default {
    create,
    signIn,
    checkAppointments,
    checkAppointmentsHistory
}
import doctorsRepository from "../repositories/doctorsRepository.js"
import bcrypt from 'bcrypt'
import {v4 as uuidV4} from 'uuid'

async function create({name, email, password, location, specialty, crm}) {

    const {rowCount} = await doctorsRepository.findByEmail(email)
    if(rowCount) throw new Error("Médico já cadastrado") 

    const hashPassword = await bcrypt.hash(password, 10)

    await doctorsRepository.create({name, email, password: hashPassword, location, specialty, crm})

}

async function signIn({email, password}) {
    const {rows: [doctor]} = await doctorsRepository.findByEmail(email)
    if(!doctor) throw new Error("Incorrect email or password")

    const checkPassword = await bcrypt.compare(password, doctor.password)
    if(!checkPassword) throw new Error("Incorrect email or password")

    const token = uuidV4();
    await doctorsRepository.createSession({token, doctorId: doctor.id})
    return token


}

async function findDoctor(doctorInfo) {
    console.log(doctorInfo, 'oi')
    if(!doctorInfo) throw new Error("Você precisa mandar alguma informação para procurar um médico")

    const {rows} = await doctorsRepository.findDoctor(doctorInfo)

    return rows

}

async function createAppointment({appointmentId, patientId, doctorId}) {
    const {rowCount} = await doctorsRepository.checkAppointment(appointmentId)
    if(!rowCount) throw new Error("Esta data não está disponível")

    await doctorsRepository.createAppointment({appointmentId, patientId, doctorId})
    

}

async function checkAppointments(id) {
    const {rows: appointments} = await doctorsRepository.checkDoctorAppointments(id)
   
    console.log(appointments)
    if(appointments.length === 0) throw new Error("Você não tem nenhuma consulta")

   
    return appointments
}

async function confirmAppointment(id) {
    
    const {rows: [appointment]} = await doctorsRepository.checkIfAppointmentIsAvailable(id)   
    
    
    if(appointment) throw new Error("Esse horário não está disponível")

    await doctorsRepository.confirmAppointment(id)
   

}

async function cancelAppointment(id){
    const {rows: [appointment]} = await doctorsRepository.checkIfAppointmentIsAvailable(id)
    
    if(!appointment) throw new Error("Esse horário não está marcado")

    await doctorsRepository.cancelAppointment(id)
   
}

async function finishAppointment(id) {  
    const {rows: [confirmed]} = await doctorsRepository.checkIfAppointmentIsAvailable(id)
    if(!confirmed) throw new Error("Esse consulta não está confirmada")

    const {rows: [done]} = await doctorsRepository.checkIfAppointmentIsDone(id)
    if(done) throw new Error("Esta consulta já foi finalizada")

    await doctorsRepository.finishAppointment(id)
    


}

async function checkAppointmentsHistory(id) {
    const {rows: appointments} = await doctorsRepository.checkAppointmentsHistory(id)
   

    if(appointments.length === 0) throw new Error("Você não tem nenhuma consulta")

   
    return appointments


}

export default {
    create,
    signIn,
    findDoctor,
    createAppointment,
    checkAppointments,
    confirmAppointment,
    cancelAppointment,
    finishAppointment,
    checkAppointmentsHistory
}
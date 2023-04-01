import connectionDb from "../config/database.js";

async function findByEmail(email) {
    return connectionDb.query(`
    SELECT * FROM patients WHERE email = $1
    `,[email])
}

async function create({name, email, password, phone}) {
  
    return connectionDb.query(`
    INSERT INTO patients (name, email, password, phone) 
    VALUES ($1, $2, $3, $4)
    
    `,[name, email, password, phone])
}

async function createSession({token, patientId}) {
    return connectionDb.query(`
    INSERT INTO patient_sessions (token, patient_id)
    VALUES ($1, $2)
    `, [token, patientId])

}

async function findSessionByToken(token) {
    return connectionDb.query(`
    SELECT * FROM patient_sessions WHERE token = $1
    
    `,[token])

}

async function findById(id) {
    return connectionDb.query(`
    SELECT * FROM patients WHERE id = $1
    
    `,[id])
}

async function checkAppointment(id) {
    return connectionDb.query(`
    SELECT a.done, d.name AS doctor_name, d.specialty as doctor_specialty, p.name AS patient_name, dates.date, t.time 
        FROM appointments a
        JOIN doctors d ON d.id = a.doctor_id 
        JOIN patients p ON p.id = a.patient_id
        JOIN doctor_schedule ds ON ds.id = a.schedule_id
        JOIN dates ON dates.id = ds.date_id
        JOIN times t ON t.id = ds.time_id
        WHERE patient_id = $1 AND a.done = false
    
    `, [id])
}

export default {
    findByEmail,
    create,
    createSession,
    findSessionByToken,
    findById,
    checkAppointment
}
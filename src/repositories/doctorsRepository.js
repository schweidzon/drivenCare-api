import connectionDb from "../config/database.js";


async function findByEmail(email) {
    return connectionDb.query(`
        SELECT * FROM doctors WHERE email = $1
    `, [email]);

}

async function create({ name, email, password, location, specialty, crm }) {
    return connectionDb.query(`
    INSERT INTO doctors (name, email, password, location, specialty, crm)
    VALUES ($1, $2, $3,$4, $5, $6)
    
    `, [name, email, password, location, specialty, crm]);
}

async function createSession({ token, doctorId }) {
    return connectionDb.query(`
    INSERT INTO doctor_sessions (token, doctor_id)
    VALUES ($1, $2)
    
    `, [token, doctorId])
}

async function findDoctor(doctorInfo) {
    console.log(doctorInfo)

    return connectionDb.query(`
    SELECT d.id, d.name, d.specialty, d.location, array_agg(concat(ds.id, ' / ', da.date, ' - ', t.time)) AS available_schedule
    FROM doctors d
    JOIN doctor_schedule ds ON ds.doctor_id = d.id AND ds.available = true
    JOIN times t ON t.id = ds.time_id 
    JOIN dates da ON da.id = ds.date_id
    WHERE (name LIKE '%${doctorInfo}%' OR specialty LIKE '%${doctorInfo}%' OR location LIKE '%${doctorInfo}%')
    GROUP BY d.id;

    `)

}

async function checkAppointment(appointmentId) {
    return connectionDb.query(`
        SELECT * FROM doctor_schedule WHERE id = $1 AND available = $2
    `, [appointmentId, true])
}

async function createAppointment({ appointmentId, patientId, doctorId }) {

    await connectionDb.query(`UPDATE doctor_schedule SET available = false WHERE id = $1`, [appointmentId])

    return connectionDb.query(`   
    INSERT INTO appointments (patient_id, doctor_id, schedule_id) VALUES ($1, $2, $3)    
    `, [patientId, doctorId, appointmentId])
}

async function findSessionByToken(token) {
    return connectionDb.query(`
    SELECT * FROM doctor_sessions WHERE token = $1
    
    `,[token])

}

async function findById(id) {
    return connectionDb.query(`
    SELECT * FROM doctors WHERE id = $1
    
    `,[id])
}

async function checkDoctorAppointments(id) {
    return connectionDb.query(`
    SELECT a.id, a.done, a.confirmed, d.name AS doctor_name, d.specialty as doctor_specialty , p.name AS patient_name, dates.date, t.time 
        FROM appointments a
        JOIN doctors d ON d.id = a.doctor_id 
        JOIN patients p ON p.id = a.patient_id
        JOIN doctor_schedule ds ON ds.id = a.schedule_id
        JOIN dates ON dates.id = ds.date_id
        JOIN times t ON t.id = ds.time_id
        WHERE a.doctor_id = $1  AND a.done = false
     
    `, [id])
}

async function checkIfAppointmentIsAvailable(id) {
    return connectionDb.query(`
    SELECT * FROM appointments WHERE id = $1 AND confirmed = $2
`, [id, true])
}

async function confirmAppointment(id) {
    return connectionDb.query(`
    UPDATE appointments SET confirmed = true WHERE id = $1 
    
    `,[id])
}

async function cancelAppointment(id) {
    return connectionDb.query(`
    UPDATE appointments SET confirmed = false WHERE id = $1 
    
    `,[id])
}

async function checkIfAppointmentIsDone( id) {
    return connectionDb.query(`
    SELECT * FROM appointments WHERE id = $1 AND done = $2
    
    `,[id, true])

}

async function finishAppointment(id) {
    return connectionDb.query(`
    UPDATE appointments SET done = $1 WHERE id = $2
    
    `,[true, id])
}

async function checkAppointmentsHistory(id) {
    return connectionDb.query(`
    SELECT * FROM appointments WHERE doctor_id = $1 AND done = $2
    `,[id, true])
}



export default {
    findByEmail,
    create,
    createSession,
    findDoctor,
    checkAppointment,
    createAppointment,
    findSessionByToken,
    findById,
    checkDoctorAppointments,
    checkIfAppointmentIsAvailable,
    confirmAppointment,
    cancelAppointment,
    checkIfAppointmentIsDone,
    finishAppointment,
    checkAppointmentsHistory
    
}
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
    SELECT * FROM doctors
    WHERE name LIKE '%${doctorInfo}%' OR specialty LIKE '%${doctorInfo}%' OR location LIKE '%${doctorInfo}%'  ;
    
    `)

}

export default {
    findByEmail,
    create,
    createSession,
    findDoctor
}
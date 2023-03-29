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

export default {
    findByEmail,
    create,
}
import {Router} from 'express'
import doctorsControllers from '../controllers/doctorsControllers.js';
import patientsControllers from '../controllers/patientsControllers.js';
import authMid from '../middlewares/authMid.js';
import checkBody from '../middlewares/checkBody.js';
import { validateSchema } from '../middlewares/validateSchemaMid.js';
import { patientsSchema } from '../schemas/patientsSchema.js';

const patientsRoutes = Router()

patientsRoutes.post("/signup", validateSchema(patientsSchema), patientsControllers.create)
patientsRoutes.post("/signin", patientsControllers.signIn)
patientsRoutes.get("/", checkBody.checkReqBody, authMid.authValidation,doctorsControllers.findDoctors)
patientsRoutes.post("/appointments", authMid.authValidation ,doctorsControllers.createAppointment)
patientsRoutes.get("/appointments",  authMid.authValidation, patientsControllers.checkAppointments)
patientsRoutes.get("/appointments/history", authMid.authValidation ,patientsControllers.checkAppointmentHistory)

export default patientsRoutes; 
import {Router} from 'express'
import patientsControllers from '../controllers/patientsControllers.js';
import { validateSchema } from '../middlewares/validateSchemaMid.js';
import { patientsSchema } from '../schemas/patientsSchema.js';

const patientsRoutes = Router()

patientsRoutes.post("/signup", validateSchema(patientsSchema), patientsControllers.create)

export default patientsRoutes;
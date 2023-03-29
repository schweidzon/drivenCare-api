import {Router} from 'express'
import doctorsControllers from '../controllers/doctorsControllers.js'
import { validateSchema } from '../middlewares/validateSchemaMid.js'
import { doctorsSchema } from '../schemas/doctoresSchema.js'

const doctorsRoutes = Router()

doctorsRoutes.post("/sign-in", validateSchema(doctorsSchema),doctorsControllers.create)

export default doctorsRoutes
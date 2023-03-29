import {Router} from 'express';
import doctorsRoutes from './doctorsRoutes.js';
import patientsRoutes from "./patientsRoutes.js";


const routes = Router();

routes.use("/patients", patientsRoutes);
routes.use("/doctors", doctorsRoutes)

export default routes;

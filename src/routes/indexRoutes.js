import {Router} from 'express';
import patientsRoutes from "./patientsRoutes.js";


const routes = Router();

routes.use("/patients", patientsRoutes);

export default routes;

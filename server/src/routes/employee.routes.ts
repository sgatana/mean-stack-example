import * as express from 'express';
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from '../controllers/employee.controller';

export const employeeRouter = express.Router();

employeeRouter.post('/', createEmployee);
employeeRouter.get('/', getEmployees);
employeeRouter.get('/:id', getEmployee);
employeeRouter.put('/:id', updateEmployee);
employeeRouter.delete('/:id', deleteEmployee);

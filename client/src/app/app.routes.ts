import { Routes } from '@angular/router';
import { EmployeeList } from './employee-list/employee-list';
import { AddEmployee } from './add-employee/add-employee';
import { EditEmployee } from './edit-employee/edit-employee';

export const routes: Routes = [
  {
    path: '',
    component: EmployeeList,
    title: 'Employee List',
  },
  {
    path: 'new',
    component: AddEmployee,
  },
  {
    path: 'edit/:id',
    component: EditEmployee,
  },
];

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { EmployeeForm } from '../employee-form/employee-form';

@Component({
  selector: 'app-add-employee',
  imports: [EmployeeForm],
  template: `
    <fieldset class='fieldset'>
      <legend>Add Employee</legend>
      <app-employee-form (formSubmitted)="addEmployee($event)" />
    </fieldset>
  `,
  styles: `
    .fieldset {
    width: 400px;
    margin: 0 auto;
  }
  `,
})
export class AddEmployee {
  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  addEmployee(employee: Employee) {
    this.employeeService.createEmployee(employee).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error);
      },
    });
    // this.employeeService.getEmployees()
  }
}

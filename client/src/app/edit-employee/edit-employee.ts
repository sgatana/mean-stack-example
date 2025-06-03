import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from './../employee';
import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { EmployeeForm } from '../employee-form/employee-form';

@Component({
  selector: 'app-edit-employee',
  imports: [EmployeeForm],
  template: `
    <fieldset class="fieldset">
      <legend>Edit Employee</legend>
      <app-employee-form
        [initialState]="employee()"
        (formSubmitted)="editEmployee($event)"
      />
    </fieldset>
  `,
  styles: `
  .fieldset {
    width: 400px;
    margin: 0 auto;
  }
  `,
})
export class EditEmployee implements OnInit {
  private router = inject(Router);
  private employeeService = inject(EmployeeService);
  private route = inject(ActivatedRoute);

  employee = this.employeeService.employee;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/']);
    }
    this.employeeService.getEmployee(id!);
  }

  editEmployee(employee: Employee) {
    this.employeeService
      .updateEmployee(this.employee()._id!, employee)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}

import {
  Component,
  computed,
  inject,
  OnInit,
  WritableSignal,
} from '@angular/core';
import { EmployeeService } from '../employee.service';
import { RouterModule } from '@angular/router';
import { EmployeeListTableComponent } from '../employee-list-table/employee-list-table.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [RouterModule, EmployeeListTableComponent],
  template: `
    @if(isLoading()) {
    <p>Loading...</p>
    } @else {
    <div>
      <div class="add-employee-button">
        <button [routerLink]="['new']">Add Employee</button>
      </div>
    </div>
    <app-employee-list-table
      [employees]="employees()"
      (onDeleteEmployee)="deleteEmployee($event)"
    />
    <!-- <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Level</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        @if(employees().length > 0) { @for (employee of employees(); track
        employee._id) {
        <tr>
          <td>{{ employee.name }}</td>
          <td>{{ employee.position }}</td>
          <td>{{ employee.level }}</td>
          <td class="actions">
            <button class="btn-primary" [routerLink]="['edit/', employee._id]">
              Edit
            </button>
            <button (click)="deleteEmployee(employee._id!)" class="btn-danger">
              Delete
            </button>
          </td>
        </tr>
        } } @else {
        <tr>
          <td colspan="4">No employees found</td>
        </tr>
        }
      </tbody>
    </table> -->
    }
  `,
  styles: [
    `
      .add-employee-button {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
      }
    `,
  ],
})
export class EmployeeList implements OnInit {
  private employeeService = inject(EmployeeService);

  employees = this.employeeService.employees;
  isLoading = this.employeeService.isLoading;

  ngOnInit(): void {
    this.fetchEmployees();
  }
  fetchEmployees() {
    this.employeeService.getEmployees();
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.fetchEmployees();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}

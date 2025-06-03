import { Component, EventEmitter, input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-list-table',
  imports: [RouterLink],
  template: `
    <table class="table">
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
    </table>
  `,
  styles: `
  .table {
        font-family: Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }
      .table td,
      .table th {
        border: 1px solid #ddd;
        padding: 8px;
      }
      .table tr:nth-child(even) {
        background-color: #f2f2f2;
      }
      .table tr:hover {
        background-color: #eee;
      }
      .table th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #ccc;
        color: #121212;
      }
      .actions {
        display: flex;
        align-items: center;
        gap: 10px;
      }
  `,
})
export class EmployeeListTableComponent {
  // @Input() employees! : Employee[]
  employees = input<Employee[]>([]);

  @Output() onDeleteEmployee = new EventEmitter<string>();

  deleteEmployee(id: string) {
    this.onDeleteEmployee.emit(id);
  }
}

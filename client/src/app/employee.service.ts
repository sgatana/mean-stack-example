import { Injectable, signal } from '@angular/core';
import { Employee } from './employee';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = 'http://localhost:4000/api';
  employees = signal<Employee[]>([]);
  employee = signal<Employee>({} as Employee);
  isLoading = signal(false);

  constructor(private httpClient: HttpClient) {}

  private refreshEmployees() {
    this.isLoading.set(true);
    this.httpClient
      .get<Employee[]>(`${this.baseUrl}/employees`)
      .subscribe((employees) => {
        this.isLoading.set(false);
        this.employees.set(employees);
      });
  }
  getEmployees() {
    this.refreshEmployees();
    // return this.employees.asReadonly();
  }

  getEmployee(id: string) {
    this.httpClient
      .get<Employee>(`${this.baseUrl}/employees/${id}`)
      .subscribe((employee) => {
        this.employee.set(employee);
        return this.employee();
      });
  }

  createEmployee(employee: Employee) {
    return this.httpClient.post(`${this.baseUrl}/employees`, employee, {
      responseType: 'text',
    });
  }

  updateEmployee(id: string, employee: Employee) {
    return this.httpClient.put(`${this.baseUrl}/employees/${id}`, employee, {
      responseType: 'text',
    });
  }

  deleteEmployee(id: string) {
    return this.httpClient.delete(`${this.baseUrl}/employees/${id}`, {
      responseType: 'text',
    });
  }
}

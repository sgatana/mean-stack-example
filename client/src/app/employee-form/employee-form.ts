import {
  Component,
  effect,
  EventEmitter,
  inject,
  input,
  output,
  Output,
} from '@angular/core';
import { Employee } from '../employee';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  imports: [ReactiveFormsModule],
  template: `
    <form class="form" [formGroup]="employeeForm">
      <div class="form-control">
        <label for="name">Name</label>
        <input type="text" id="name" formControlName="name" />
      </div>
      <div class="form-control">
        <label for="position">Position</label>
        <input type="text" id="position" formControlName="position" />
      </div>
      <div class="form-control">
        <label for="level">Level</label>
        <!-- <input type="text" id="level" formControlName="level" /> -->
         <span class='levels'>

           @for(level of levels; track level) {
             <input type="radio" id="level" formControlName="level" [value]="level" />{{level}}
           }
         </span>
      </div>
      <div class="button-wrapper">
        <button (click)="submitForm()">Add Employee</button>
      </div>
    </form>
  `,
  styles: `
  .form {
    width: 300px;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .form-control {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .button-wrapper {
    display: flex;
    margin-top: 10px;
    width: 100%;
    justify-content: center;
  }
  input {
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  input:focus, input:active {
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  button {
    border: none;
    width: 100%;
    padding: 8px;
    background-color:#147ccb;
    color: #fff;
    border-radius: 5px
  }
  .levels {
    display: flex;
    gap: 10px;
  }
  `,
})
export class EmployeeForm {
  initialState = input<Employee>();
  formBuilder = inject(FormBuilder);
  levels: Employee['level'][] = ['junior', 'mid', 'senior'];

  @Output()
  formValuesChanges = new EventEmitter<Employee>();

  formSubmitted = output<Employee>();

  employeeForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    position: ['', [Validators.required, Validators.minLength(5)]],
    level: ['junior', [Validators.required]],
  });

  constructor() {
    effect(() => {
      this.employeeForm.setValue({
        name: this.initialState()?.name || '',
        position: this.initialState()?.position || '',
        level: this.initialState()?.level || 'junior',
      });
    });
  }

  get name() {
    return this.employeeForm.get('name')!;
  }
  get position() {
    return this.employeeForm.get('position')!;
  }
  get level() {
    return this.employeeForm.get('level')!;
  }

  submitForm() {
    console.log(this.employeeForm.value);
    this.formSubmitted.emit(this.employeeForm.value as Employee);
  }
}

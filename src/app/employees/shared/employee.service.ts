import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Employee } from './employee.model';

@Injectable()
export class EmployeeService {
  employeeList : AngularFireList<any>;
  selectedEmployee : Employee = new Employee();
  constructor( private firebase : AngularFireDatabase ) { }

  getData() {
    this.employeeList = this.firebase.list('employees');
    return this.employeeList;
  }

  addEmployee(employee : Employee) {
    this.employeeList.push({
      name: employee.name,
      position: employee.position,
      department: employee.department
    });
  }

  updateEmployee(emp: Employee){
    this.employeeList.update(emp.$key, {
      name: emp.name,
      position: emp.position,
      department: emp.department
    });
  }

  deleteEmployee(key: string){
    this.employeeList.remove(key);
  }


}

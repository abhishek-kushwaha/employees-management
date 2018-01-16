import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor( private employeeService : EmployeeService, private toastr: ToastrService ) { }

  ngOnInit() {
    this.resetForm();
  }

  onSubmit(form : NgForm){
    if(form.value.$key == null ){
      this.employeeService.addEmployee(form.value);
      this.toastr.success('Added successfully', 'Employee Register');
    }
    else {
      this.employeeService.updateEmployee(form.value);
      this.toastr.success('Updated successfully', 'Employee Register');
    }
    
    this.resetForm(form);
  }

  resetForm(form? : NgForm){
    if(form !=  null)
      form.reset();
    this.employeeService.selectedEmployee = {
      $key: null,
      name: '',
      position: '',
      department: ''
    }; 
  }

  

}

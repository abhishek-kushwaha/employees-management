import { Component, OnInit } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { NgForm } from '@angular/forms';
import { element } from 'protractor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employeeList: Employee[];
  constructor( private employeeService : EmployeeService, private toastr: ToastrService ) { }

  ngOnInit() {
    var empData = this.employeeService.getData();
    empData.snapshotChanges().subscribe(item => {
      this.employeeList = [];
      item.forEach(element => {
        var empDataJson = element.payload.toJSON();
        empDataJson['$key'] = element.key;
        this.employeeList.push(empDataJson as Employee);
      });
    });
  }

  onItemClick(emp : Employee){
    this.employeeService.selectedEmployee = Object.assign({}, emp);
  }
  
  onDelete(key: string){
    if( confirm('Are you sure, you want to delete?') == true ){
      this.employeeService.deleteEmployee(key);
      this.toastr.success('Deleted successfully', 'Employee Register');
      //this.resetForm(form);
    }
  }

}

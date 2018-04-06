import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../shared/employee.service';
import { Employee } from '../../shared/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employeeList: Employee[] = [];

  constructor(
    private _employeeService: EmployeeService,
    private toastr: ToastrService) {
  }

  // create
  ngOnInit() {
    const x = this._employeeService.getData();
    x.snapshotChanges().subscribe(item => {
      this.employeeList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.employeeList.push(y as Employee);
      });
    });
  }
  // update
  onEdit(emp: Employee) {
    this._employeeService.selectedEmployee = Object.assign({}, emp);
    // spred operator
    // this._employeeService.selectedEmployee = {...emp};
  }

  // delite
  onDelete(key: string) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this._employeeService.deleteEmployee(key);
      this.toastr.warning('Deleted Successfully', 'Employee register');
    }
  }

}

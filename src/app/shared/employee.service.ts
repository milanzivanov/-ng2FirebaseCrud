import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Employee} from './employee.model';

@Injectable()
export class EmployeeService {
  // question???
  employeeList: AngularFireList<any>;
  selectedEmployee: Employee = new Employee();

  constructor(private _fb: AngularFireDatabase) { }
  // r
  getData() {
    this.employeeList = this._fb.list('employees');
    return this.employeeList;
  }

  // c
  insertEmployee(employee: Employee) {
    this.employeeList.push({
      name: employee.name,
      position: employee.position,
      office: employee.office,
      salary: employee.salary
    });
  }

  // u
  updateEmpolyee(employee: Employee) {
    this.employeeList.update(employee.$key, {
      name: employee.name,
      position: employee.position,
      office: employee.office,
      salary: employee.salary
    });
  }

  // d
  deleteEmployee($key: string) {
    this.employeeList.remove($key);
  }

}

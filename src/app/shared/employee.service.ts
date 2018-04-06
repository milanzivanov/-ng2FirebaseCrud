import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Employee} from './employee.model';

@Injectable()
export class EmployeeService {
  // question???
  public employeeList: AngularFireList<any>;
  // question???
  public selectedEmployee: Employee = new Employee();

  constructor(private _fb: AngularFireDatabase) { }
  // read
  getData() {
    this.employeeList = this._fb.list('employees');
    return this.employeeList;
  }

  // create
  // we gona get back Employee
  insertEmployee(employee: Employee) {
    this.employeeList.push({
      name: employee.name,
      position: employee.position,
      office: employee.office,
      salary: employee.salary
    });
  }

  // update
  updateEmpolyee(employee: Employee) {
    this.employeeList.update(employee.$key, {
      name: employee.name,
      position: employee.position,
      office: employee.office,
      salary: employee.salary
    });
  }

  // delite
  deleteEmployee($key: string) {
    this.employeeList.remove($key);
  }

}

import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService.js';
import { Link } from 'react-router-dom';

export default class EmployeeListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: []
    }
  }
  componentDidMount() {
    EmployeeService.getEmployees().then((res) => {
      this.setState({ employees: res.data });
    })
  }

  deleteEmployee(id) {
    EmployeeService.deleteEmployee(id).then((res) => {
        this.setState({
            employees: this.state.employees.filter(employee => employee.id !== id)
        });
    }).catch((err) => {
        console.error("Error deleting employee:", err);
    });
  }

  render() {
    return (
      <div className='container mt-3'>
        <h4 className='text-center'> Employee List </h4>
        <div className='row mt-4'>
          <Link to="/add-employee" className='btn btn-primary mb-3'> Add Employee </Link>
          <table className='table table-bordered table-striped'>
            <thead>
              <tr>
                <th>ID</th>
                <th>FIRST-NAME</th>
                <th>LAST-NAME</th>
                <th>EMAIL</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.employees.map((employee) => {
                  return (
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td>{employee.first_name}</td>
                      <td>{employee.last_name}</td>
                      <td>{employee.email}</td>
                      <td>
                        <Link to={`/update-employee/${employee.id}`} className='btn btn-info' style={{ marginLeft: "15px" }}>update</Link>
                        <button className='btn btn-danger' style={{ marginLeft: "15px" }}
                          onClick={() => this.deleteEmployee(employee.id)}> delete </button>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService.js';

function UpdateEmployeeComponent() {

    const navigate = useNavigate();

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const {id} = useParams();

    useEffect(() => {
        EmployeeService.getEmployeeById(id).then((res) => {
            setFirstName(res.data.first_name);
            setLastName(res.data.last_name);
            setEmail(res.data.email);
        })
    }, [])
   

    const updateHandler = (e) => {

        e.preventDefault();
        console.log(id);
        const employee = { first_name, last_name, email };

        if (id) {
            EmployeeService.updateEmployee(id, employee).then((res) => {
                navigate("/employees");
            });
        }
        else {
            EmployeeService.addEmployee(employee).then((res) => {
                navigate("/employees");
            })
        }

    }

    const cancelHandle = (e) => {
        e.preventDefault();
        navigate("/employees");
    }

    return (
        <div className='container'>
            <div className='row mt-2'>
                <div className='col-6 offset-md-3'>
                    <div className='card p-5'>
                        <h4 className='text-center'> Update Employee </h4>
                        <form>
                            <div className='form-group'>
                                <label className='my-3'>First Name :</label>
                                <input type="text" name="first_name" id='first_name' className='form-control'
                                    value={first_name}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />

                                <label className='my-3'>Last Name :</label>
                                <input type="text" name="last_name" id='last_name' className='form-control'
                                    value={last_name}
                                    onChange={(e) => setLastName(e.target.value)}
                                />

                                <label className='my-3'>Email :</label>
                                <input type="text" name="email" id='email' className='form-control'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <button className='mt-3 btn btn-danger' onClick={cancelHandle}>cancel</button>
                                <button className='mt-3 btn btn-success ms-3' onClick={updateHandler}>save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default UpdateEmployeeComponent
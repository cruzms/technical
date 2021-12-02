import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../Helper/Api';

export default function Register() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (evt) => {
    evt.preventDefault();
    setIsLoading(true)
    const response = await register(userData);
    setIsLoading(false)
    if (response.status) {
      navigate('/login')
    } else {
      alert(response.data.message)
    }
  }

  const updateData = (field, value) => {
    setUserData((prevState) => {
      const newState = { ...prevState };
      newState[field] = value;
      return newState;
    })
  }

  return (
    <div class="container col-5">
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" required onChange={(evt) => updateData('name', evt.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" required placeholder="Enter email" onChange={(evt) => updateData('email', evt.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required pattern=".{6,}" placeholder="Password" onChange={(evt) => updateData('password', evt.target.value)} />
          <Form.Text className="text-muted">
            At least 6 characters
          </Form.Text>
        </Form.Group>


        <Button variant="primary" type="submit" disabled={isLoading}>
          Submit
        </Button>
      </Form>
      <Link to="/login">Login</Link>
    </div>
  )
}

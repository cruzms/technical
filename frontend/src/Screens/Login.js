import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext';
import { login } from '../Helper/Api';

export default function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { authState, authActions: { signIn } } = useAuth();

  useEffect(() => {
    if (authState.userToken) {
      navigate('/', { replace: true })
    }
  }, [authState, navigate]);

  const updateData = (field, value) => {
    setUserData((prevState) => {
      const newState = { ...prevState };
      newState[field] = value;
      return newState;
    })
  }

  const onSubmit = async (evt) => {
    evt.preventDefault();
    setIsLoading(true)
    const response = await login(userData);
    setIsLoading(false)
    if (response.status) {
      signIn({ token: response.data.token });
      navigate("/", { replace: true });
    } else {
      alert(response.data.message)
    }
  }

  return (
    <div class="container col-5">
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(evt) => updateData('email', evt.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(evt) => updateData('password', evt.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
          Submit
        </Button>
      </Form>
      <Link to="/register">Register</Link>
    </div>
  )
}

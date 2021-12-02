import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Home, Register, Repos } from './Screens';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './Context/AuthContext';
import client from '../src/GraphQL/client';
import { ApolloProvider } from '@apollo/client';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/repos" element={<Repos />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import './App.css';
import PatientsList from './feature/PatientsList';

function App() {
  return (
    <div className="App">
      <h1>Hello patients Dialysis App</h1>
      <PatientsList />
    </div>
  );
}

export default App;

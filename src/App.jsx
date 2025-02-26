import './App.css'
// import {Grid2 as Grid ,Box,Paper,TextField, Button, Typography, Container, Alert } from "@mui/material"; 
import {Routes, Route } from "react-router-dom";
import SignInForm from './SignIn';

function App() {

  return (
   <div style={{width:"100%",backgroundColor:"pink"}}>
    <SignInForm/>
   </div>
  )
}

export default App

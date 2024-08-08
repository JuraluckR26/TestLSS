// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import Box from '@mui/material/Box';
import { TextField, Button } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Main from './Page/Main';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newUser, setNewUser] = useState('');
  const [newPass, setNewPass] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [value, setValue] = useState('1');
  const [resStatus, setResStatus] = useState('');

  const [resToken, setResToken] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onsubmit = () => {
    if(newUser && newPass && newEmail != "" || newUser && newPass && newEmail != null){
      callApiSignUp()

      setUsername("")
      setPassword("")
      setNewEmail("")
    }
    callApiLogin()
  };

  const callApiLogin = async () => {
    if(username && password !== ""){

      const res = await axios.post('http://localhost:3002/login', {
        username: username,
        password: password
      },{
        headers: {"Access-Control-Allow-Origin": "*"}
      })
      .then(function (response) {
        console.log("response ", response)
        localStorage.setItem('token', response.data.token);
        const isToken = localStorage.getItem('token');
        if(isToken){
          navigate('/Main');
        }
      })
      .catch(function (error) {
        console.log(error, "ERROR NA!!");
        setMessage('Invalid credentials');
      });
    }
      
  }

  const callApiSignUp = async () => {
    const res = await axios.post('http://localhost:3002/signUp', {
      username: newUser,
      password: newPass,
      email: newEmail
    },{
      headers: {"Access-Control-Allow-Origin": "*"}
    })
    .then(function (response) {
      console.log("response ",response)
      setResStatus("200")
    })
    .catch(function (error) {
      console.log(error.response)
      if(error.response.status == 409){
        setResStatus("409")
      }
      console.log(error, "ERROR NA!!");
    });
  }

  const CheckStatus = () => {
      console.log("in check", resStatus)
    if(resStatus == "200"){
      console.log("200")
      return <Alert variant="filled" severity="success">Your created account is successfully!!</Alert>
    } else if(resStatus == "409"){
      console.log("409")
      return <Alert severity="error" variant="filled">Sorry your username is duplicate</Alert>
    }
  }

  const checkTokenExpiry = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      console.log(decodedToken.exp)
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        window.location.href = '/';
      }
    }
  };
  
  useEffect(() => {
    callApiLogin()
    checkTokenExpiry()
  },[])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <>
    <div className="App">
      <h2>Hello</h2>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Login" value="1" />
              <Tab label="Sign up" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField 
                id="standard-basic" 
                label="username or email" 
                variant="standard" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField 
                id="standard-basic" 
                label="password" 
                variant="standard" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Box sx={{ m: 4 }}>
              
              <Button variant="contained" color="primary" onClick={onsubmit}>
                  Login
              </Button>
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <div>
              <TextField
                required
                id="outlined-required"
                label="username"
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
                sx={{ m: 2 }}
              />
              <TextField
                id="outlined-password-input"
                required
                label="Password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                autoComplete="current-password"
                sx={{ m: 2 }}
              />
            </div>
            <div>
              <TextField
                id="outlined-read-only-input"
                required
                label="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                type="email"
                sx={{ m: 2, width: 480, maxWidth: '100%' }}
              />
            </div>
            <Button variant="contained" color="primary" onClick={onsubmit}>
                Submit
            </Button>
            <Stack sx={{ width: '95%', m: 2 }} spacing={0}>
              <CheckStatus/>
            </Stack>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
    </>
  );
}

export default App;

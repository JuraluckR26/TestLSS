import React, { useState } from 'react';
import axios from 'axios'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 750,
  bgcolor: 'background.paper',
//   border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(prop) {
  const open = prop.openCreate
  const setOpen = prop.setOpenCreate
  const handleClose = () => setOpen(!open);

  const dataCreate = prop.dataCreate
  const detailsRows = prop.data
  const setData = prop.setData
  const positionList = prop.positionList
  const callApiShow = prop.callApiShow
  
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState("");
  const [positionId, setPositionId] = useState("");
  const [positionName, setPositionName] = useState();
  const indexValue = detailsRows.findIndex(f => f.id == detailsRows.id)

  const handleChange = (event) => {
    setPositionId(event.target.value);
  };

  const onSubmit = async () => {
    if(fname && lname && age && positionId !== "" || fname && lname && age && positionId !== null ){
      const personId = await callApiCreate()
      await callApiShow()
      setFname("")
      setLname("")
      setAge("")
      setPositionId("")
    }
  }

  const callApiCreate = async () => {
     const token = localStorage.getItem('token');
     const res = await axios.post('http://localhost:3002/create', {
          firstname: fname,
          lastname: lname,
          age: age,
          positionId: positionId
        },{
          headers: {
            "Access-Control-Allow-Origin": "*",
            'Authorization': token,
          }
        })
        .then(function (response) {
          console.log(response)
          console.log("200")
          return response.data.insertId
          // navigate('/Main');
        })
        .catch(function (error) {
          console.log(error);

        });
  }


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Create Employees
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="fist name"
                    sx={{ m: 1, width: 250 }}
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                />
                <TextField
                    id="outlined-password-input"
                    label="last name"
                    sx={{ m: 1, width: 250 }}
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                />
                <TextField
                    id="outlined-read-only-input"
                    label="age"
                    type="number"
                    InputProps={{ inputProps: { min: 18, max: 60 } }}
                    sx={{ m: 1, width: 100, }}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <FormControl fullWidth sx={{ mt: 2, ml:1, width: 300, }}>

                  <InputLabel id="demo-simple-select-label">Position</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={positionId}
                    label="Position"
                    
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>Developer</MenuItem>
                    <MenuItem value={2}>Senior Developer</MenuItem>
                    <MenuItem value={3}>Manager</MenuItem>
                    <MenuItem value={4}>Designer</MenuItem>
                  </Select>
                </FormControl>
            </div>
            </Typography>
            <Box className="button-add">
                <Button 
                    onClick={() => {setOpen(!open); onSubmit()}}
                    color="success"
                    variant="contained"
                    sx={{ mr: 2, mt: 2 }}
                >
                    Submit
                </Button>
                <Button 
                    onClick={() => setOpen(!open)}
                    color="inherit"
                    variant="contained"
                    sx={{ mt: 2 }}
                >
                    Cancle
                </Button>
            </Box>
            
        </Box>
      </Modal>
    </div>
  );
}

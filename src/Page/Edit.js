import React, { useState, useRef } from 'react';
import axios from 'axios'

import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function Edit(prop) {
    const open = prop.openEdit
    const setOpen = prop.setOpenEdit
    const handleClose = () => setOpen(!open);
    const inputRef = useRef();

    const data = prop.dataEdit
    const detailsRows = prop.detailsRows
    const setData = prop.setData
    const positionList = prop.positionList
    const callApiShow = prop.callApiShow
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [age, setAge] = useState("");
    const [positionId, setPositionId] = useState();
    const [positionName, setPositionName] = useState();
    const indexValueEdit = detailsRows.findIndex(f => f.id == data.id)
    const handleChange = (event) => {
        setPositionId(event.target.value);
    };

    const onSubmit = async () => {
        
        if(fname && lname && age && positionId !== "" || fname && lname && age && positionId !== null ){
          await callApiEdit()
          await callApiShow()
          setFname("")
          setLname("")
          setAge("")
          setPositionId("")
        }
    }

    const callApiEdit = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:3002/edit', {
            firstname: fname,
            lastname: lname,
            age: age,
            positionId: positionId,
            personId: data.personId
          },{
          headers: {
            "Access-Control-Allow-Origin": "*",
            'Authorization': token,
          }
          })
          .then(function (response) {
            console.log("200")
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
            Edit Personal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div>
                <TextField
                    required
                    id="outlined-required"
                    label="fist name"
                    sx={{ m: 1, width: 250 }}
                    // defaultValue={data.firstName}
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                />
                <TextField
                    id="outlined-password-input"
                    label="last name"
                    sx={{ m: 1, width: 250 }}
                    // defaultValue={data.lastName}
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                />
                <TextField
                    id="outlined-read-only-input"
                    label="age"
                    type="number"
                    sx={{ m: 1, width: 100, }}
                    value={age}
                    // defaultValue={data.age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <FormControl fullWidth sx={{ mt: 2, ml:1, width: 300, }}>

                  <InputLabel id="demo-simple-select-label">Position</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // defaultValue={data.positionId}
                    value={positionId}
                    label="Position"
                    
                    onChange={(e) => {setPositionId(e.target.value)}}
                  >
                    {positionList.map(m => {
                        return <MenuItem value={m.positionId} >{m.positionName}</MenuItem>
                    })}
                  </Select>
                </FormControl>
            </div>
          </Typography>
            <Box className="button-add">
                <Button 
                    onClick={() => {setOpen(!open); onSubmit() }}
                    color="primary"
                    variant="contained"
                    sx={{ mr: 2, mt: 2 }}
                >
                    Edit Submit
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
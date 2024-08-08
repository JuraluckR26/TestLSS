import React, { useState } from 'react';
import axios from 'axios'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};

export default function Delete(prop) {
  const open = prop.openDelete
  const setOpen = prop.setOpenDelete
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dataDelete = prop.dataDelete
  const detailsRows = prop.data
  const setData = prop.setData
  const callApiShow = prop.callApiShow
  console.log("dataDelete :", dataDelete)
  const indexValue = detailsRows.findIndex(f => f.id == dataDelete.id)

  const onSubmit = async () => {
    await callApiDelte()

    await callApiShow()
  }

  const callApiDelte = async () => {
    console.log(dataDelete)
    const res = await axios.post('http://localhost:3002/delete', {
        personId: dataDelete.personId
    },{
        headers: {"Access-Control-Allow-Origin": "*"}
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
            Are you sure you want to Delete {dataDelete.firstName + " " + dataDelete.lastName} ?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box className="button-add">
                <Button 
                    onClick={() => {setOpen(!open); onSubmit() }}
                    color="error"
                    variant="contained"
                    sx={{ mr: 2, mt: 2 }}
                >
                    Delete
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
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
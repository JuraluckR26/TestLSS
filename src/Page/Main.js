import React, { useState, useEffect } from "react";
import '.././App.css';
import Create from './Create'
import axios from 'axios'

import { Box, Button } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Edit from "./Edit";
import Delete from "./Delete";
import { jwtDecode } from 'jwt-decode';
import Navbar from "./Navbar";

const Main = () => {

    const [data, setData] = useState([]);
    const [openCreate, setOpenCreate] = useState(false);
    const [dataCreate, setDataCreate]  = useState(0);
    const [openEdit, setOpenEdit] = useState(false);
    const [dataEdit, setDataEditId]  = useState(0);
    const [positionList, setPositionList]  = useState([]);
    const [openDelete, setOpenDelete] = useState(false);
    const [dataDelete, setDataDelete]  = useState(0);

    const callApiShow = async () => {
        try {
            const response = await axios.get('http://localhost:3002/showAll');
            const mapValue = response.data.map((row, index) => ({
                id: index+1,
                firstName: row.firstname,
                lastName: row.lastname,
                age: row.age,
                positionName: row.positionName,
                personId: row.personId,
                positionId: row.positionId
            }));
            setData(mapValue)
        } catch (error) {
            console.error(error);
        }
    }
      
    const callApiGetPosition = async () => {
        try {
            // console.log("data_show");

            const response = await axios.get('http://localhost:3002/getPosition');
            setPositionList(response.data)
        } catch (error) {
            console.error(error);
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
            alert("session timeout")

            window.location.href = '/';
          }
        }
    };

    useEffect(() => {
        callApiShow()
        callApiGetPosition()
    },[])

    useEffect(() => {
        checkTokenExpiry()
    },[openCreate, openEdit, openDelete])

    const columns = [
        { field: 'id', 
            headerName: 'ID', 
            width: 70,
            headerAlign: 'center',
            align: 'center',
        },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        { field: 'age', headerName: 'Age', width: 100 },
        {
            field: 'positionName',
            headerName: 'Position',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 200,
        },
        { field: 'customAction',
            headerName: 'Custom Action',
            width: 190,
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <>

                <Button
                    color="secondary"
                    onClick={() => {setDataEditId(params.row); setOpenEdit(!openEdit)}}
                    variant="contained" color="inherit"
                    sx={{ mr: 2 }}
                >
                    Edit
                </Button>
                <Button
                    color="secondary"
                    onClick={() => {setDataDelete(params.row); setOpenDelete(!openDelete)}}
                    variant="contained" color="error"
                >
                Delete
            </Button>
            </>
            ),
        }
    ];
    //     id: index+1,
    //     firstName: row.firstname,
    //     lastName: row.lastname,
    //     age: row.age,
    //     position: row.positionName,
    //     personId: row.personId,
    //     positionId: row.positionId
    //     // Add other properties as needed
    // }));

    // const rows = [
    //     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 25, position: "Programmer" },
    //     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 22, position: "Programmer" },
    //     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 35, position: "Senior Develop" },
    //     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 25, position: "Programmer" },
    //     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, position: "Programmer" },
    //     { id: 6, lastName: 'Melisandre', firstName: null, age: 27, position: "Programmer" },
    //     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 40, position: "Senior Develop" },
    //     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 26, position: "Programmer" },
    //     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 45, position: "Manager" },
    // ];

    function handleCustomAction(row) {
        console.log('Custom action clicked for row:', row);
    }

    return (
        <>  
        <Navbar />
            <div className="main-table" style={{ height: 372, width: '50%' }}>
                {/* <h2>Employees Table</h2> */}
                <Box className="button-add" sx={{ justifyContent: 'flex-end' }}>
                    <Button
                        color="success"
                        variant="contained"
                        sx={{ m: 2 }}
                        onClick={() => setOpenCreate(!openCreate)}
                    >
                        <PersonAddAltIcon/>
                    </Button>
                </Box>
                <DataGrid
                    rows={data}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                    }}
                    pageSizeOptions={[5, 10]}
                />
                <Create openCreate={openCreate} setOpenCreate={setOpenCreate} dataCreate={dataCreate} data={data} setData={setData} positionList={positionList} callApiShow={callApiShow}/>
                <Edit openEdit={openEdit} setOpenEdit={setOpenEdit} dataEdit={dataEdit} detailsRows={data} setData={setData} positionList={positionList} callApiShow={callApiShow}/>
                <Delete openDelete={openDelete} setOpenDelete={setOpenDelete} dataDelete={dataDelete} data={data} setData={setData} callApiShow={callApiShow}/>
            </div>
        </>
    )
}

export default Main;
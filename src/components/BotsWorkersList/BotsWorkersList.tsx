import React, {useCallback, useState} from "react";
import {getBotsWorkersListApiCall} from "../../slice/BotsWorkersListSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store/Store";
import {DataGrid} from "@mui/x-data-grid";
import {Box, TextField} from "@mui/material";

const BotsWorkersList = () => {
    const [searchData, setSearchData] = useState("");
    const [data, setData] = useState([]);
    const dispatch = useDispatch<AppDispatch>();
    const botsWorkersListData = useSelector ((state: any) => state.botsWorkerLogList.data);
    const columns = [
        { field: 'id', headerName: 'ID', width: 400, flex:2 },
        { field: 'name', headerName: 'Name', width: 50, flex:1 },
        { field: 'description', headerName: 'Description', width: 100, flex:1 },
        { field: 'bot', headerName: 'Bot Name', width: 100, flex:1 },
        { field: 'created', headerName: 'Created', width: 200, flex:1 }
    ]

    const handleChange = (e: any) => {
        console.log(e.target.value);
        setSearchData(e.target.value);
    };

    const handelSubmit = useCallback((e: any) => {
        e.preventDefault();
        console.log(searchData);
        dispatch(getBotsWorkersListApiCall(searchData));
        setData(botsWorkersListData);
        //setSearchData("");
    },[searchData, botsWorkersListData, dispatch]);

    return (
        <div>
        <div>
            <p className="text-[30px]  font-[700] py-4 text-center mt-[100px]">
                Please Enter A Bot Name To Get Workers List
            </p>

            <div
                className="w-full justify-center mt-4
      gap-4 flex items-center "
            >
                <TextField
                    id="outlined-basic"
                    name="name"
                    value={searchData}
                    onChange={handleChange}
                    sx={{width: "300px"}}
                    label="Bot Name"
                    variant="outlined"
                />
                <div>
                    <Box
                        sx={{
                            background: "black",
                            color: "white",
                            px: 3,
                            py: 1,
                            cursor: "pointer",
                        }}
                        onClick={handelSubmit}
                    >
                        Get
                    </Box>
                </div>
            </div>
        </div>
            {data.length!==0 && (<div className="mt-4 py-4"><DataGrid
                rows={data}
                columns={columns}
                autoHeight={true}
                initialState={{
                    pagination: {paginationModel: {pageSize: 3}},
                }}
                pageSizeOptions={[3, 5, 10]}
            /></div>)}
        </div>
    );
    };

export default BotsWorkersList;

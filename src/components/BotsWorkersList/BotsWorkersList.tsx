import React, {useCallback, useEffect, useState} from "react";
import {getBotsWorkersListApiCall} from "../../slice/BotsWorkersListSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store/Store";
import {Box, TextField} from "@mui/material";
import DataTable from "../DataTable/DataTable";
import IDataTableColumn from "../DataTable/IDatatableColumn";

const BotsWorkersList = () => {
    const [searchData, setSearchData] = useState("");
    const [data, setData] = useState([]);
    const dispatch = useDispatch<AppDispatch>();
    const botsWorkerListData = useSelector ((state: any) => state.botsWorkers.data);
    const columns: IDataTableColumn[] = [
        { id: 'id', label: 'ID', width: 200 },
        { id: 'name', label: 'Name', width: 100 },
        { id: 'description', label: 'Description', width: 100 },
        { id: 'bot', label: 'Bot Name', width: 100},
        { id: 'created', label: 'Created', width: 100, type:"epoch"}
    ]

    const handleChange = (e: any) => {
        console.log(e.target.value);
        setSearchData(e.target.value);
    };
    useEffect(() => {
        setData(botsWorkerListData)
    }, [botsWorkerListData,]);

    useEffect(() => {
        dispatch(getBotsWorkersListApiCall(searchData));
    }, [])

    const handelSubmit =  useCallback(() => {
        dispatch(getBotsWorkersListApiCall(searchData));
    }, [searchData, dispatch])

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
            {data && data?.length!==0 && (<div className="mt-4 py-4"><DataTable
                rows={data}
                columns={columns}
            /></div>)}
        </div>
    );
    };

export default BotsWorkersList;

import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store/Store";
import {Box, TextField} from "@mui/material";
import {getBotsLogListApiCall} from "../../slice/BotsLogListSlice";
import DataTable from "../DataTable/DataTable";
import IDataTableColumn from "../DataTable/IDatatableColumn";

const BotsLogList = () => {
    const [searchData, setSearchData] = useState("");
    const [data, setData] = useState([]);
    const dispatch = useDispatch<AppDispatch>();
    const botsLogsListData = useSelector ((state: any) => state.botsLogs.data);
    const columns: IDataTableColumn[] = [
        { id: 'id', label: 'Log Id', minWidth: 250 },
        { id: 'created', label: 'Created', minWidth: 180},
        { id: 'message', label: 'Message', width: 100, minWidth: 100 },
        { id: 'bot', label: 'Bot Id', minWidth: 100 },
        { id: 'worker', label: 'Worker Id', minWidth: 200 }
    ]

    const handleChange = (e: any) => {
        console.log(e.target.value);
        setSearchData(e.target.value);
    };
    useEffect(() => {
        setData(botsLogsListData)
    }, [botsLogsListData]);

    useEffect(() => {
        dispatch(getBotsLogListApiCall(searchData));
    }, [])

    const handelSubmit =  useCallback(() => {
        dispatch(getBotsLogListApiCall(searchData));
    }, [searchData, dispatch])

    return (
        <div>
            <div>
                <p className="text-[30px]  font-[700] py-4 text-center mt-[100px]">
                    Please Enter A Bot Id To Get Logs List
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
                        label="Bot Id"
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
            {data.length!==0 && (<div className="mt-4 py-4"><DataTable
                rows={data}
                columns={columns}
            /></div>)}
        </div>
    );
};

export default BotsLogList;

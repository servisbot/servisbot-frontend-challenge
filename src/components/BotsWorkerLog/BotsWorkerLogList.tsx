import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store/Store";
import {DataGrid} from "@mui/x-data-grid";
import {Box, TextField} from "@mui/material";
import {getBotsWorkerLogsList, getBotsWorkerLogsListApiCall} from "../../slice/BotsWorkerLogListSlice";

interface SearchData {
    botId: string,
    workerId: string
}

const BotsWorkerLogList = () => {
    const [searchData, setSearchData] = useState<SearchData>({
        botId: "",
        workerId: ""
    });
    const [data, setData] = useState([]);
    const dispatch = useDispatch<AppDispatch>();
    const botsWorkerLogsListData = useSelector ((state: any) => state.botsWorkerLogList.data);
    const columns = [
        { field: 'id', headerName: 'Log Id', width: 350, flex:1 },
        { field: 'created', headerName: 'Created', width: 50, flex:1 },
        { field: 'message', headerName: 'Message', width: 100, flex:1 },
        { field: 'bot', headerName: 'Bot Id', width: 100, flex:1 },
        { field: 'worker', headerName: 'Worker Id', width: 200, flex:1 }
    ]

    useEffect(() => {
        dispatch(getBotsWorkerLogsListApiCall(searchData));
        setData([])
    }, [dispatch]);

    const handleChange = (e: any) => {
        console.log(e.target.value);
        setSearchData({...searchData, [e.target.name]:[e.target.value]});
    };

    const handelSubmit = useCallback((e: any) => {
        e.preventDefault();
        console.log(searchData);
        dispatch(getBotsWorkerLogsList(searchData));
        console.log(botsWorkerLogsListData);
        setData(botsWorkerLogsListData);
    }, [searchData, botsWorkerLogsListData, dispatch]);

    return (
        <div>
            <div>
                <p className="text-[30px]  font-[700] py-4 text-center mt-[100px]">
                    Please Enter A Bot Id and Worker Id To Get Logs List
                </p>

                <div
                    className="w-full justify-center mt-4
      gap-4 flex items-center "
                >
                    <TextField
                        id="outlined-basic"
                        name="botId"
                        value={searchData.botId}
                        onChange={handleChange}
                        sx={{width: "300px"}}
                        label="Bot Id"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-basic"
                        name="workerId"
                        value={searchData.workerId}
                        onChange={handleChange}
                        sx={{width: "300px"}}
                        label="Worker Id"
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
                    pagination: {paginationModel: {pageSize: 25}},
                }}
                pageSizeOptions={[25, 50, 100]}
            /></div>)}
        </div>
    );
};

export default BotsWorkerLogList;

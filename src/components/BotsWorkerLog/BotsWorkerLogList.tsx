import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store/Store";
import {Box, TextField} from "@mui/material";
import {getBotsWorkerLogListApiCall} from "../../slice/BotsWorkerLogListSlice";
import DataTable from "../DataTable/DataTable";
import IDataTableColumn from "../DataTable/IDatatableColumn";

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
    const botsWorkerLogListData = useSelector ((state: any) => state.botsWorkerLogs.data);
    const columns: IDataTableColumn[] = [
        { id: 'id', label: 'Log Id', width: 100 },
        { id: 'created', label: 'Created', width: 50},
        { id: 'message', label: 'Message', width:100},
        { id: 'bot', label: 'Bot Id', width: 150 },
        { id: 'worker', label: 'Worker Id', width: 200 }
    ]
    const handleChange = (e: any) => {
        console.log(e.target.value);
        setSearchData({...searchData, [e.target.name]:[e.target.value]});
    };
    useEffect(() => {
        setData(botsWorkerLogListData)
    }, [botsWorkerLogListData]);

    useEffect(() => {
        dispatch(getBotsWorkerLogListApiCall(searchData));
    }, []);

    const handelSubmit =  useCallback(() => {
        dispatch(getBotsWorkerLogListApiCall(searchData));
    }, [searchData, dispatch])

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
            {data.length!==0 && (<div className="mt-4 py-4"><DataTable
                rows={data}
                columns={columns}
            /></div>)}
        </div>
    );
};

export default BotsWorkerLogList;

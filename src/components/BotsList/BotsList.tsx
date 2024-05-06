import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getBotsListApiCall} from "../../slice/BotsListSlice"
import {AppDispatch} from "../../store/Store";
import { DataGrid } from '@mui/x-data-grid';

const BotsList = () => {
    const [data, setData] = useState([]);
    const dispatch = useDispatch<AppDispatch>();
    const botsListData = useSelector ((state: any) => state.botsList.data);
    const columns = [
        { field: 'id', headerName: 'ID', width: 400, flex:2 },
        { field: 'name', headerName: 'Name', width: 50, flex:1 },
        { field: 'description', headerName: 'Description', width: 100, flex:1 },
        { field: 'status', headerName: 'Status', width: 100, flex:1 },
        { field: 'created', headerName: 'Created', width: 200, flex:1 }
    ]
    useEffect(() => {
        dispatch(getBotsListApiCall());
    }, [dispatch]);

    useEffect(() => {
        console.log(botsListData);
        setData(botsListData);
    }, [botsListData]);

    return (
        <div>
            <div>
                <p className="text-[30px]  font-[700] py-4 text-center mt-[100px]">
                    List Of Bots
                </p>
            </div>
            <DataGrid
                rows={data}
                columns={columns}
                autoHeight={true}
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5,10]}
        />
        </div>
    );
}
export default BotsList;
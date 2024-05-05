import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getBotsListApiCall} from "../../slice/BotsListSlice"
import {AppDispatch} from "../../store/Store";
import { DataGrid } from '@mui/x-data-grid';

const BotsList = () => {
    const [data, setData] = useState([]);
    const dispatch = useDispatch<AppDispatch>();
    const botsListData = useSelector ((state: any) => state.botsList.data);
    const columns = [
        { field: 'id', headerName: 'ID', width: 400 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'description', headerName: 'Description', width: 200 },
        { field: 'status', headerName: 'Status', width: 100 },
        { field: 'created', headerName: 'Created', width: 200 }
    ]
    useEffect(() => {
        dispatch(getBotsListApiCall());
    }, [dispatch]);

    useEffect(() => {
        console.log(botsListData);
        setData(botsListData);
    }, [botsListData]);

    return (
        <DataGrid
            rows={data}
            columns={columns}
            autoHeight={true}
            initialState={{
                pagination: { paginationModel: { pageSize: 2 } },
            }}
            pageSizeOptions={[2,5,10]}
        />
    );
}
export default BotsList;
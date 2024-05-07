import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getBotsListApiCall} from "../../slice/BotsListSlice"
import {AppDispatch} from "../../store/Store";
import DataTable from "../DataTable/DataTable";
import IDataTableColumn from "../DataTable/IDatatableColumn";

const BotsList = () => {
    const [data, setData] = useState<any[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    const botsListData = useSelector ((state: any) => state.botsList.data);
    const columns:IDataTableColumn[] = [
        { id: 'id', label: 'ID', minWidth: 100},
        { id: 'name', label: 'Name', minWidth: 50 },
        { id: 'description', label: 'Description', minWidth: 100 },
        { id: 'status', label: 'Status', minWidth: 100 },
        { id: 'created', label: 'Created', minWidth: 200 }
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
            <DataTable
                rows={data}
                columns={columns}
        />
        </div>
    );
}
export default BotsList;
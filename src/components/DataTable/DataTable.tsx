import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";

function DataTable( title: string , data: any[] ) {
    const headers = Object.keys(data[0]);

    return (
        <TableContainer component={Paper}>
            <Typography variant="h4" color="inherit">
                {title}
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map(header => (
                            <TableCell align="right">{header.toUpperCase()}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody sx={{height: "20px"}}>
                    {data.map((emp, index) => (
                        <TableRow key={index}>
                            {headers.map(header => (
                                <TableCell align="right">{emp[header]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

DataTable.defaultProps = {
    title: "No Title"
};

export default DataTable;

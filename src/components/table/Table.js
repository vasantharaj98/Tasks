import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';
import { Button, Switch } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from 'react-redux';
import { deletedealer, updatedealer } from '../../slices/dealer';
import CopyTextButton from '../copytext';
import CopyToClipboardButton from '../copytext';

export default function CustomTable({columns, rows, setLoader}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const dispatch = useDispatch();

  const handleCheckChange = (event, dealer_id) => {
    const formData = { status: event.target.checked}
    if(dealer_id){
      setLoader(true)
      dispatch(updatedealer({ dealer_id, formData}))
      .then(() => {
        setLoader(false);
      })
      .catch(()=>{
        setLoader(false);
      })
    }
  };

  const handledeleteDealer = (dealer_id) =>{
    console.log(dealer_id);
    if(dealer_id){
      setLoader(true)
      dispatch(deletedealer({dealer_id}))
      .then(() => {
        setLoader(false);
      })
      .catch(()=>{
        setLoader(false);
      })
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%'}}>
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight:'bold' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              rows.length === 0 ?
              <TableRow>
                <TableCell align='center' colSpan={columns.length}>
                  No data Found
                </TableCell>
              </TableRow>
              :
              <>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns?.map((column, index) => {
                      const value = row[column.id];
                      return (
                        <>
                        {column.id === 'dealer_id' ? 
                        <TableCell key={index} align={column.align}>
                        <Link to={`detail/${value}`}>
                          {value}
                        </Link>
                        <CopyToClipboardButton text={value} />
                        </TableCell> :
                        <TableCell key={index} align={column.align}>
                        {column.id !== "status" && value}
                        {column.id === "status" && 
                                  <Switch 
                                  checked={value}
                                  onChange={(e) => handleCheckChange(e, row.dealer_id)} />
                        }
                        {column.id === "action" && 
                                    column.actionType.map((a)=>{
                                        return (
                                            <>
                                    {a.edit && (
                                      <Link to={`/dealer/update/${row.dealer_id}`}
                                      >
                                        <Button
                                          sx={{
                                            background: "#3d07dc",
                                            marginRight: 2,
                                            height: '40px',
                                            width:'40px',
                                            minWidth: 0
                                          }}
                                        >
                                          <EditIcon
                                            sx={{ color: "#fff", fontSize: 17 }}
                                          ></EditIcon>
                                        </Button>
                                      </Link>
                                    )}
                                     {a.delete && (
                                        <Button
                                          sx={{
                                            background: "#dc0707",
                                            marginRight: 2,
                                            height: '40px',
                                            width:'40px',
                                            minWidth: 0
                                          }}
                                          onClick={() => handledeleteDealer(row.dealer_id)}
                                        >
                                          <DeleteIcon
                                            sx={{ color: "#fff", fontSize: 17 }}
                                          ></DeleteIcon>
                                        </Button>
                                    )}
                                            </>
                                        )
                                    })
                            }
                        </TableCell>
                        }
                        </>
                      );
                    })}
                  </TableRow>
                );
              })}
              </>
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
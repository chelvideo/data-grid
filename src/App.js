import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import data from './data/mockaroo';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    maxWidth: 1280,
    margin: '0 auto',
  },
});

const headCells = [
  { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
  { id: 'name', numeric: true, disablePadding: false, label: 'Name' },
  { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
  { id: 'gender', numeric: true, disablePadding: false, label: 'Gender' },
  { id: 'ip_address', numeric: true, disablePadding: false, label: 'IP' },
  { id: 'active', numeric: true, disablePadding: false, label: 'Active' },
  { id: 'last_session', numeric: true, disablePadding: false, label: 'Last session' },
];

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator(a, b, orderBy) {
  
  switch (orderBy) {
    case 'ip_address':  const ipInt = require('ip-to-int');
                        if (ipInt(b[orderBy]).toInt() < ipInt(a[orderBy]).toInt()) {
                          return -1;
                        }
                        if (ipInt(b[orderBy]).toInt() > ipInt(a[orderBy]).toInt()) {
                          return 1;
                        }
                        return 0;
    default: if (b[orderBy] < a[orderBy]) {
                return -1;
              }
              if (b[orderBy] > a[orderBy]) {
                return 1;
              }
              return 0;
  }
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

/*
function Row() {
  return (
    data.map(item =>
      <tr>
        <td>{item.id}</td>
        <td>{item.first_name+' '+item.last_name}</td>
        <td>{item.email}</td>
        <td>{item.gender}</td>
        <td>{item.ip_address}</td>
        <td>{item.active}</td>
        <td>{item.last_session}</td>
      </tr>
    )
  )
}*/


function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell> */}
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {/* {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null} */}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


function App() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleSelectAllClick = event => {
  //   if (event.target.checked) {
  //     const newSelecteds = data.map(n => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = name => selected.indexOf(name) !== -1;


  return (
    <div className="App">

      <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <EnhancedTableHead
          classes={classes}
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          // onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={data.length}
        />

        <TableBody>
          {stableSort(data, getComparator(order, orderBy))
            //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  onClick={event => handleClick(event, row.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </TableCell>
                  <TableCell component="th" id={labelId} scope="row">{row.id}</TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.gender}</TableCell>
                  <TableCell align="left">{row.ip_address}</TableCell>
                  <TableCell align="left">{row.active.toString()}</TableCell>
                  <TableCell align="right">{new Date(row.last_session).toLocaleString()}</TableCell>
                </TableRow>
              );
            })}
          {/* {emptyRows > 0 && (
            <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )} */}
        </TableBody>

        
      </Table>
    </TableContainer>
      
    </div>
  );
}

export default App;

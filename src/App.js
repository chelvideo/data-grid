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
import EnhancedTableHead from './components/EnhancedTableHead';
import { handlerTableClick } from './actions/index';
import { connect } from 'react-redux';

const useStyles = makeStyles({
  table: {
    maxWidth: 1280,
    margin: '0 auto',
  },
});

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


function App(props) {
  let { order, orderBy, selected } = props;
  const classes = useStyles();

  // const handleSelectAllClick = event => {
  //   if (event.target.checked) {
  //     const newSelecteds = data.map(n => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  const isSelected = name => selected.indexOf(name) !== -1;


  return (
    <div className="App">

      <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <EnhancedTableHead
          classes={classes}
          //numSelected={selected.length}
          //order={order}
          //orderBy={orderBy}
          // onSelectAllClick={handleSelectAllClick}
          //onRequestSort={props.store.dispatch(handlerReqSort('name'))}
          //onRequestSort={null}
          //rStore={props.store}
          //rowCount={data.length}
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
                  onClick={()=>props.onClick(row.id)}
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

function mapStateToProps (state) {
  return {
    order: state.order,
    orderBy: state.orderBy,
    selected: state.selected
  }
}

const mapDispatchToProps = {
  onClick: handlerTableClick
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

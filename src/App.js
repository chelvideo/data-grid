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
import TextField from '@material-ui/core/TextField';
import { handlerTableClick, handlerSearchInput, handlerDelBtn } from './actions/index';
import { connect } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  table: {
    maxWidth: 1280,
    margin: '0 auto',
  },
});

let newData = data.filter((item, index)=>{
  for (let key in item) {
    if (String(item[key]).includes(String(localStorage.getItem('filter')))==true) return item;
  }
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

function filter(event) {
  //console.log(event.target.value);
  newData = data.filter((item, index)=>{
    for (let key in item) {
      if (String(item[key]).includes(String(event.target.value))==true) return item;
    }
    
  })
  console.log(newData);
  return event.target.value;
}

function delSelected(selectedItems) {
  
    //console.log(item);
    newData=newData.filter((item,index)=>{
      if (!selectedItems.includes(index)) return item;
    })
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
      <div className="header">
        <IconButton 
          aria-label="delete" 
          className={classes.margin}
          onClick={()=>props.onClickDel(delSelected(selected))}
        >
          <DeleteIcon />
        </IconButton>

        <TextField id="searchInput" label="Search" 
          onInput={(event)=>props.onChange(filter(event))}
        />
      </div>

      <TableContainer component={Paper}>
      <Table className={classes.table} size="small">
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

          
          {
            stableSort(newData, getComparator(order, orderBy)).map((row, index) => {
              const isItemSelected = isSelected(index);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                  <TableRow
                  hover
                  onClick={()=>props.onClick(index)}
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
            })
          }
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
    selected: state.selected,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  onClick: handlerTableClick,
  onChange: handlerSearchInput,
  onClickDel: handlerDelBtn
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

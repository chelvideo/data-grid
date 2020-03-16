import React from 'react';
import { connect } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { handlerReqSort } from '../actions';

const headCells = [
  { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
  { id: 'name', numeric: true, disablePadding: false, label: 'Name' },
  { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
  { id: 'gender', numeric: true, disablePadding: false, label: 'Gender' },
  { id: 'ip_address', numeric: true, disablePadding: false, label: 'IP' },
  { id: 'active', numeric: true, disablePadding: false, label: 'Active' },
  { id: 'last_session', numeric: true, disablePadding: false, label: 'Last session' },
];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, rStore, onClick } = props;
    // const createSortHandler = property => event => {
    //   onRequestSort(event, property);
    // };
  
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
              //onClick={handlerReqSort('email')}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={(e,p)=> {console.log(e);console.log(p);
                  
                  props.onClick(headCell.id)}}
                //onClick={()=>console.log('click done')}
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

  const mapStateToProps = function(state) {
    console.log({orderBy: state.orderBy});
    return {
      order: state.order,
      orderBy: state.orderBy
    }
  }

  const mapDispatchToProps = {
      onClick: handlerReqSort
  }

  export default connect(mapStateToProps, mapDispatchToProps)(EnhancedTableHead);
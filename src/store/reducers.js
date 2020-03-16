  
function reducer(state, action) {

    switch (action.type) {

        case 'CLICK_HEAD_CELL':
          const isAsc = state.orderBy === action.orderBy && state.order === 'asc';

          return Object.assign({}, state, {
            order: isAsc ? 'desc' : 'asc', 
            orderBy: action.orderBy
          });


        case 'CLICK_TABLE_ROW':
          const selectedIndex = state.selected.indexOf(action.rowId);
          let newSelected = [];
          if (selectedIndex === -1) {
            newSelected = newSelected.concat(state.selected, action.rowId);
          } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(state.selected.slice(1));
          } else if (selectedIndex === state.selected.length - 1) {
            newSelected = newSelected.concat(state.selected.slice(0, -1));
          } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
              state.selected.slice(0, selectedIndex),
              state.selected.slice(selectedIndex + 1),
            );
          }

          return Object.assign({}, state, {
            selected: newSelected
          });

        
        case 'FILTER_DATA':
          return Object.assign({}, state, {
            filter: action.str
          });

          
        default:
          return state;
      }
}

export default reducer;
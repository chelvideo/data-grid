const initialState = {
    order: 'asc',
    orderBy: 'id',
    selected: []
}
  
function reducer(state, action) {
    if (typeof state === 'undefined') {
      return initialState;
    }

    switch (action.type) {
        case 'CLICK_HEAD_CELL':
            //console.log('new obj  ',Object.assign({}, state, {orderBy: action.orderBy}))
          const isAsc = state.orderBy === action.orderBy && state.order === 'asc';
          //setOrder(isAsc ? 'desc' : 'asc');
          return Object.assign({}, state, {
            order: isAsc ? 'desc' : 'asc', 
            orderBy: action.orderBy
          });
        default:
          return state;
      }
}

export default reducer;
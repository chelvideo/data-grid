export const CLICK_HEAD_CELL = 'CLICK_HEAD_CELL';
export const CLICK_TABLE_ROW = 'CLICK_TABLE_ROW';
export const FILTER_DATA = 'FILTER_DATA';
export const DEL_SELECTED = 'DEL_SELECTED';

export function handlerReqSort(orderBy) {
    return { type: CLICK_HEAD_CELL, orderBy }
}

export function handlerTableClick(rowId) {
    return { type: CLICK_TABLE_ROW, rowId }
}

export function handlerSearchInput(str) {
    return { type: FILTER_DATA, str }
}

export function handlerDelBtn(data) {
    return { type: DEL_SELECTED, data }
}
export const CLICK_HEAD_CELL = 'CLICK_HEAD_CELL';

export function handlerReqSort(orderBy) {
    return { type: CLICK_HEAD_CELL, orderBy }
}
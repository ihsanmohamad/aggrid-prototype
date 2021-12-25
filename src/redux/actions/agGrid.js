import { ActionTypes } from '../constants/action-types'

export const setGridApi = gridApi => {
    return {
        type: ActionTypes.SET_GRIDAPI,
        payload: gridApi
    }
}
export const setColumnApi = columnApi => {
    return {
        type: ActionTypes.SET_COLUMNAPI,
        payload: columnApi
    }
}
export const setRowData = rowData => {
    return {
        type: ActionTypes.SET_ROWDATA,
        payload: rowData
    }
}
export const getRowData = endpoint => {
    return {
        type: ActionTypes.GET_ROWDATA,
        payload: endpoint
    }
}

export const addRowData = data => {
    return {
        type: ActionTypes.ADD_ROWDATA,
        payload: data
    }
}
import { ActionTypes } from '../constants/action-types'
import axios from 'axios'

const initialState = {
    gridApi: null,
    columnApi: null,
    rowData: null
}

export const agGridReducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case ActionTypes.SET_GRIDAPI:
            return {
                ...state,
                gridApi: payload
            }
        case ActionTypes.SET_COLUMNAPI:
            return {
                ...state,
                columnApi: payload
            }
        case ActionTypes.SET_ROWDATA:
            return {
                ...state,
                rowData: payload
            }
        case ActionTypes.GET_ROWDATA:
            return { 
                ...state,
                rowData: payload
            }
        case ActionTypes.ADD_ROWDATA:
            return {
                ...state,
                rowData: [...state.rowData, payload]
            }
        default:
            return state
    }
}
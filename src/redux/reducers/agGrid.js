import { ActionTypes } from '../constants/action-types'
import axios from 'axios'

const initialState = {
    gridApi: null,
    columnApi: null,
    rowData: null,
    columns: []
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
        case ActionTypes.SET_COLUMNS:
            return {
                ...state,
                columns: payload
            }
        case ActionTypes.GET_COLUMNS:
            return {
                ...state
            }
        default:
            return state
    }
}
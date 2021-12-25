import { combineReducers } from "redux"
import { agGridReducer } from './agGrid'

const reducers = combineReducers({
    agGrid: agGridReducer
})

export default reducers
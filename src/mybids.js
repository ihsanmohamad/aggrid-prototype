import axios from 'axios'

const url = "http://localhost:8000/mybids"

export const getBids = () => {
    return axios.get(url);
}

export const addBids = (bids) => {
    return axios.post(url, bids)
}
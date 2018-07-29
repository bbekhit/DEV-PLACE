import axios from "axios"
import { ADD_POST, POST_LOADING, GET_ERRORS} from "./types"

export const addPost = (postData) => dispatch => {
    dispatch(postLoading())
    axios.post("/api/posts", postData)
    .then(res => {
        dispatch({
            type:ADD_POST,
            payload:res.data
        })
    })
    .catch(err => dispatch({
        type:GET_ERRORS,
        payload:err.response.data
    }))
}


export const postLoading = () => {
    return {
        type:POST_LOADING
    }
}
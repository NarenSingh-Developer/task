const product = []

const productReducer = (state = product, action) => {
    if(action.type === "GET_ALL_PRODUCTS"){
        return state = action.payload
    }
    if(action.type === "FILTER_PRODUCT"){
        return state = action.payload
    }

    return state 
}

export default productReducer
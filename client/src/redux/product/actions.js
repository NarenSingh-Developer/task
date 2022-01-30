export const getAllProducts = (payload) =>{
    return {
        type: "GET_ALL_PRODUCTS", 
        payload: payload
    }
}

export const getFilterProduct = (payload) =>{
    return {
        type: "FILTER_PRODUCT",
        payload: payload
    }
}
export const authCheck = (payload) =>{
    return {
        type: "AUTH_CHECK",
        payload: payload
    }
}
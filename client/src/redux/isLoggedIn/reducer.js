const auth = false

export const authReducer = (state = auth, action) => {
    if(action.type === "AUTH_CHECK"){
        return state = action.payload
    }

    return state
}

export default authReducer
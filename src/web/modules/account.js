export const LOGIN = 'account/LOGIN'
export const LOGOUT = 'account/LOGOUT'

const initialState = {
    email: null,
    errors: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                email: action.email
            }

        default:
            return state
    }
}

export const login = (email) => {
    return {
        email: email,
        type: LOGIN 
    }
}

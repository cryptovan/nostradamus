import Immutable from 'immutable'

export const LOGIN = 'account/LOGIN'
export const LOGOUT = 'account/LOGOUT'

export const CHANGE_ACCOUNT = 'CHANGE_ACCOUNT'

const initialState = {
    email: null,
    errors: null,
    available: Immutable.Set(['jmadden', 'dkerr', 'wferg', 'wsmith', 'jarnstein', 'aconlin']),
    selected: 'jmadden'
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                email: action.email
            }

        case CHANGE_ACCOUNT:
            return { selected: action.account, available: state.available }

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

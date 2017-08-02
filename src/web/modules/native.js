// @flow

//import { graphql } from 'react-relay'

export const READY = 'native/READY'
export const READY_ACKNOWLEDGED = 'native/READY_ACKNOWLEDGED'
export const GOOGLE_SIGN_IN_REQUESTED = 'native/GOOGLE_SIGN_IN'
export const GOOGLE_SIGN_IN = 'native/GOOGLE_SIGN_IN'
export const CAMERA_REQUESTED = 'native/CAMERA_REQUESTED'
export const CAMERA = 'native/CAMERA'
export const SWITCH_SCREEN = 'native/SWITCH_SCREEN'
export const GO_BACK = 'native/GO_BACK'
export const GO_BACK_FINISHED = 'native/GO_BACK_FINISHED'
export const REPOSITION = 'native/REPOSITION'
export const GET_USER_DETAILS = 'native/GET_USER_DETAILS'
export const SET_USER_DETAILS = 'native/SET_USER_DETAILS'
export const SHOW_SIGN_IN = 'native/SHOW_SIGN_IN'

const sendToNative = (actionKey: string, message: Object = {}) => {
    const data: string = JSON.stringify({ key: actionKey, ...message })

    console.log('To Native: ' + data)

    window.WebViewBridge.send(data)
}

const initialState = {
    goBack: false,
    showSignIn: false,
    userDetails: null
}

export default (state: Object = initialState, action: { type: string, userDetails: ?Object }) => {
    switch (action.type) {
        case GO_BACK_FINISHED:
            return {
                ...state,
                goBack: false
            }

        case SHOW_SIGN_IN:
            return {
                ...state,
                showSignIn: true
            }
        
        case SET_USER_DETAILS:
            return {
                ...state,
                userDetails: action.userDetails
            }

        case GOOGLE_SIGN_IN:
        case CAMERA:
            sendToNative(action.type)
            return state

        default:
            return state
    }
}

export const goBackFinished = () => {
    return (dispatch: Function) => {
        dispatch({
            type: GO_BACK_FINISHED
        })
    }
}

export const showSignIn = () => {
    return {
        type: SHOW_SIGN_IN
    }
}

export const setUserDetails = (userDetails: Object) => {
    return {
        type: SET_USER_DETAILS,
        userDetails
    }
}

export const signIn = () => {
    return {
        type: GOOGLE_SIGN_IN
    }
}

export const submitRegistration = (email: string) => {
    // graphql`
    //     mutation createPerson {
    //     }
    // `

// query
// mutation 
// data

}

document.addEventListener('WebViewBridge', () => {
    window.WebViewBridge.onMessage = (data: string) => {
        console.log('From Native: ' + data)

        const message: Object = JSON.parse(data)
        
        const dispatch = window.dispatchhhh // hack for now

        switch(message.key) {
            case SHOW_SIGN_IN:
                dispatch(showSignIn())
                break

            case SET_USER_DETAILS:
                dispatch(setUserDetails(message.userDetails))
                break

            case GO_BACK_FINISHED:
                dispatch(goBackFinished())
                break
            
            case READY_ACKNOWLEDGED:
                sendToNative(GET_USER_DETAILS, { provider: 'google' })
                break
        
            default:
                break
        }
    }

    sendToNative(READY)
}, false)
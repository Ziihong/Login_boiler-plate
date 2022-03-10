import{
    LOGIN_USER
}from '../_actions/types'


export default function (preState = {}, action){
    switch(action.type){
        case LOGIN_USER:
            return { ...preState, loginSuccess: action.payload}
            break;

        default:
            return preState;
            break;
    }
}
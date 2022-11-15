import {createContext, useReducer} from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const authReducer = (state, action) => {
        if (action.type === "CONNECT") {
            return {username: action.payload, connected: true};
        }
        return state;
    }

    const [state, dispatch] = useReducer(authReducer, {
        username: null,
        connected: false
    });


    return (
        <AuthContext.Provider value={{state, dispatch}}>
            { children }
        </AuthContext.Provider>
    );
}

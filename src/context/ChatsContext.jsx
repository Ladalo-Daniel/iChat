import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatsContext = createContext();


export const ChatsContextProvider = ({children}) => {
    const {currentUser} = useContext(AuthContext)
    const INITIAL_STATE = {
        chatId:"null",
        user:{}
    }

    const chatReducer = (state, action) => {
        //Only gonna have one action here such that when we click on the user, It gonna change the this user up there and the same time updating the chatId
        switch(action.type){
            case "CHANGE_USER":
                return{
                  //1. Update user by.....
                  user:action.payload,
                  //2. Update chatId if there is current user
                  chatId:currentUser && currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid
                }
            //we must have a default
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

    return(
        <ChatsContext.Provider value={{ data:state, dispatch }}>
            {children}
        </ChatsContext.Provider>
    )
}
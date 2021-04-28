import { createContext, useState } from "react";
export const userContext = createContext();
const UserContextProvider = (props) => {
    const [userState, setuserState] = useState({
        userToken: null
    });
    function setUserToken(token) {
        localStorage.setItem("user_token", token);
        setuserState({ ...userState, userToken: token });
    }


    function getUserToken() {
        if (!userState.token) setUserToken({ ...userState, userToken: localStorage.getItem("user_token") })
        return userState.userToken;
    }
    return <userContext.Provider value={{ ...userState, setUserToken, getUserToken }}>
        {props.children}
    </userContext.Provider>
}


export default UserContextProvider;
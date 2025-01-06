
import Profile from "../components/profile";
import { useScroll } from "../utils/scroll";
import React from "react";
const UserProfile = () => {
    useScroll();
    return (
        <>

            <Profile />

        </>
    )
}
export default UserProfile;
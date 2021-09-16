
import Profile from "../components/profile";
import { useScroll } from "../utils/scroll";

const UserProfile = () => {
    useScroll();
    return (
        <>

            <Profile />

        </>
    )
}
export default UserProfile;
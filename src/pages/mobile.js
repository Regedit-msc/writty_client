
import "../css/mobile.css"
import { useTitle } from "../utils/title";
const Mobile = () => {
    useTitle("Mobile in beta.")
    return (
        <>
            <div className="info_mobile">
                <h1>INFO.</h1>

                <div className="info_mobile_text">
                    <p>Mobile view is still in beta,view on a device with a larger screen e.g PC.👓</p>
                </div>
            </div>

        </>
    )
}

export default Mobile;
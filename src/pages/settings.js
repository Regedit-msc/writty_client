import SideBar from "../components/sidebar";

import "../css/account_settings.css";
import "../css/main.css"
import { Link } from "react-router-dom"
import { themeContext } from "../App";
import { useContext, useRef, useEffect } from "react";
import { makePriv } from "../auth_hoc/checkAuth";
import { useTitle } from "../utils/title";
import { API_ENDPOINT } from "./url";
import { imageContext } from "../contexts/imageContext";

const Settings = () => {
    const defaultImage = 'https://cdn3.vectorstock.com/i/thumb-large/76/57/portrait-young-bearded-man-in-eyeglasses-vector-34397657.jpg'
    const imageFieldRef = useRef();
    const profileRef = useRef();
    const { setImage, image } = useContext(imageContext);
    useTitle("Settings.")
    const checkBox1 = useRef();
    const { setTheTheme, theme } = useContext(themeContext)

    useEffect(() => {
        checkBox1.current.checked = theme === "light" ? true : false
    }, [theme])
    useEffect(() => {
        fetch(`${API_ENDPOINT}/user/name`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                "Authorization": `Bearer ${localStorage.getItem("user_token")}`
            },
            method: "GET",
        }).then(res => res.json()
        ).then(jsonRes => {
            if (jsonRes.success) {
                console.log(jsonRes)
                setImage(jsonRes.message.profileImageUrl);
                profileRef.current.src = image;
            } else {
                // Show upload error
            }
        })
    }, [image, setImage])
    function handleTheme(e) {
        if (e.target.checked) {

            setTheTheme("light");
            document.body.classList.replace("dark", "light");
            localStorage.setItem("theme_app", "light");
        } else {

            document.body.classList.replace("light", "dark");
            setTheTheme("dark");
            localStorage.setItem("theme_app", "dark");
        }
    }
    function handleUploadClick() {
        imageFieldRef.current.click();
    }
    function handleImageFieldChange(e) {
        handleFiles(e.target.files)
    }
    function handleFiles(files) {

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const proceed = checkFileSize(file);
            if (proceed !== false) {
                if (!file.type.startsWith('image/')) { continue }
                console.log('here');
                const img = document.createElement("img");
                img.file = file;
                const reader = new FileReader();
                reader.onload = function () {
                    const base64 = this.result.replace(/.*base64,/, '');
                    profileRef.current.src = `data:image/${file.type.toString().split("/")[1]};base64,${base64}`
                    fetch(`${API_ENDPOINT}/profile/image`, {
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                            "Authorization": `Bearer ${localStorage.getItem("user_token")}`
                        },
                        method: "POST",
                        body: JSON.stringify({ b64: base64, type: file.type.toString().split("/")[1] })

                    }).then(res => res.json()
                    ).then(jsonRes => {
                        if (jsonRes.success) {
                            setImage(jsonRes.message);
                            profileRef.current.src = image ?? '';
                        } else {
                            // Show upload error
                        }
                    })
                    // Upload file to server.
                    // socket.emit('image', { user: username, b64: base64, type: file.type.toString().split("/")[1], room: room });
                }
                reader.readAsDataURL(file);
            }

        }
    }





    function checkFileSize(file) {
        let nBytes = file.size;
        let sOutput = nBytes + " bytes";
        const aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
        for (let nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
            sOutput = nApprox.toFixed(3) + "," + aMultiples[nMultiple];
        }
        if (parseFloat(sOutput.split(',')[0]) > 3.5
            && sOutput.split(',')[1].toString() !== aMultiples[0]) {
            console.log("Toolarge", sOutput);
            alert('The image is too large upload an image under or equal to 3.5 MB.');
            return false;
        }
    }
    return (
        <>
            <SideBar
                page="settings"
            />
            <div id="main">
                <h4 id="settings">Account Settings</h4>
                <div>
                    <img ref={profileRef} src={defaultImage} id="profile_pic1" alt="user_image" />
                    <Link onClick={handleUploadClick} id={theme === "light" ? "change_button_light" : "change_button"}>Change</Link>
                    <input ref={imageFieldRef} type="file" class="image" accept="image/*" style={{ display: "none" }} onChange={handleImageFieldChange} />
                </div>
                <div>
                    <div id={theme === "light" ? "form1_light" : "form1"}>
                        <input type="text" id={theme === "light" ? "Name_light" : "Name"} name="Name" placeholder="NAME" />
                        <input type="email" id={theme === "light" ? "Email_light" : "Email"} name="Email" placeholder="EMAIL" />
                        <input type="password" id={theme === "light" ? "Password_light" : "Password"} name="Password" placeholder="PASSWORD" />
                        <div id={theme === "light" ? "dark_mode_light" : "dark_mode"}>
                            <span>Dark Mode</span>
                            <div class="switch">
                                <input id="toggle1" onChange={handleTheme} className={theme === "light" ? "toggle-round1" : "toggle-round"} name="toggle" type="checkbox" ref={checkBox1} />
                                <label for="toggle1"></label>
                            </div>
                        </div>
                        <input type="submit" value="SAVE CHANGES" />
                    </div>
                </div>

            </div>
        </>
    )
}
export default makePriv(Settings)
import { makePriv } from "../auth_hoc/checkAuth";
import { useState, useEffect, useContext, useRef } from "react"
import { API_ENDPOINT } from "./url";
import { Link } from "react-router-dom"
import injectSheet from "react-jss";
import { StyleSheet } from "../utils/shimmer";
import { v4 as uuidV4 } from "uuid";
import PadLock from "../images/padlock.png";
import DeleteLight from "../images/icon-delete_light.png";
import Delete from "../images/icon-delete.png";
import Share from "../images/icon-share.png";
import ShareLight from "../images/icon-share_light.png";
import ViewCode from "../images/icon-view_code.png";
import ViewCodeLight from "../images/icon-view_code_light.png";
import CollabCode from "../images/icon-collab.png";
import CollabCodeLight from "../images/icon-collab_light.png";
import PrivateCode from "../images/icon-private_code.png";
import PrivateCodeLight from "../images/icon-private_code_light.png";
import "../css/dashboard.css";
import SideBar from "../components/sidebar";
import { themeContext } from "../App";
import InfoBar from "../components/info";
import { useTitle } from "../utils/title";
import CustomShimmer from "../components/shimmerComp";




const Dash = (props) => {
    useTitle("Dashboard.");
    const profileImageRef = useRef();
    const defaultImage = 'https://cdn3.vectorstock.com/i/thumb-large/76/57/portrait-young-bearded-man-in-eyeglasses-vector-34397657.jpg'
    const { theme } = useContext(themeContext);
    const [isLoadingCreateDoc, setIsLoadingCreateDoc] = useState(false);
    const [info, setInfo] = useState();
    const [showInfo, setShowInfo] = useState(false);
    const [err, setErr] = useState();
    const [showErr, setShowErr] = useState(false);
    const [newDocName, setNewDocName] = useState({
        name: '',
        _id: '',
        language: "javascript",
        private: true,
        publicLink: uuidV4(),
    });
    const [docs, setDocs] = useState();
    const [creatingDoc, setCreatingDoc] = useState();
    const [username, setUsername] = useState();
    useEffect(() => {
        const isSubbed = localStorage.getItem("Subbed");
        const sub = JSON.parse(localStorage.getItem("SUB"));
        console.log('Sub', isSubbed);
        if (isSubbed.toString() === "true") {
            fetch(`${API_ENDPOINT}/notifications/subscribe`, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    "Authorization": `Bearer ${localStorage.getItem("user_token")}`
                },
                method: "POST",
                body: JSON.stringify(sub)
            }).then(res => res.json()
            ).then(jsonRes => {
                if (jsonRes.success) {
                    localStorage.setItem("SUB_ADDED", true);
                }
            })
        } else {
            setInfo("You didn't allow notifications. You will ot receive notifications on likes, comments, etc. You can although manually check notifications in the notifications tab.");
            setShowInfo(true);
            setTimeout(() => {
                setInfo("");
                setShowInfo(false);
            }, 3000)
        }
    }, [])



    useEffect(() => {
        fetch(`${API_ENDPOINT}/details`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                "Authorization": `Bearer ${localStorage.getItem("user_token")}`
            },
            method: "GET",
        }).then(res => res.json()
        ).then(jsonRes => {
            console.log(jsonRes);
            if (jsonRes.success) {
                setUsername(jsonRes.username);
                setDocs(jsonRes.message);
                profileImageRef.current.src = jsonRes.image;
            } else {
                setErr("Unable to fetch codes✋🏻.");
                setShowErr(true);
                setTimeout(() => {
                    setErr("");
                    setShowErr(false);
                }, 3000)
            }
        })
    }, []);

    function createDoc() {
        setCreatingDoc(true);
    }
    function handleChange(e) {

        switch (e.target.name) {
            case "name":
                setNewDocName({
                    ...newDocName,
                    name: e.target.value, _id: uuidV4(),
                })
                break;
            case "language":
                setNewDocName({
                    ...newDocName,
                    language: e.target.value,
                })
                break;
            case "private":
                console.log(e.target.value)
                setNewDocName({
                    ...newDocName,
                    private: e.target.value === "true" ? true : false,
                })
                break;
            default:
                break;
        }
    }
    function handleSubmit() {
        console.log(newDocName)

        setIsLoadingCreateDoc(true);
        fetch(`${API_ENDPOINT}/create/doc`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                "Authorization": `Bearer ${localStorage.getItem("user_token")}`
            },
            method: "POST",
            body: JSON.stringify(newDocName)
        }).then(res => res.json()
        ).then(jsonRes => {
            console.log(jsonRes);
            if (jsonRes.success) {
                setCreatingDoc(false);
                setDocs([...docs, newDocName]);
                setIsLoadingCreateDoc(false);
                setInfo("Successfully created playground✋🏻.");
                setShowInfo(true);
                setTimeout(() => {
                    setInfo("");
                    setShowInfo(false);
                }, 3000)
            } else {
                setErr("Unable to create playground✋🏻.");
                setShowErr(true);
                setTimeout(() => {
                    setErr("");
                    setShowErr(false);
                }, 3000)
            }
        })
    }
    function handleVisibility(id) {
        fetch(`${API_ENDPOINT}/update/visibility/doc`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                "Authorization": `Bearer ${localStorage.getItem("user_token")}`
            },
            method: "POST",
            body: JSON.stringify({ docID: id })
        }).then(res => res.json()
        ).then(jsonRes => {
            console.log(jsonRes);
            const newDocArray = [];
            if (jsonRes.success) {
                for (let i = 0; i < docs.length; i++) {
                    if (docs[i]._id === id) {
                        const newObj = {
                            _id: docs[i]._id,
                            language: docs[i].language,
                            name: docs[i].name,
                            user: docs[i].user,
                            private: !(docs[i].private),
                            publicLink: docs[i].publicLink,
                            collabLink: (docs[i].collabLink) ?? ""
                        }
                        newDocArray.push(newObj);
                    } else {
                        newDocArray.push(docs[i]);
                    }
                }
                setDocs(newDocArray);
                setInfo("Updated code visibility✋🏻.");
                setShowInfo(true);
                setTimeout(() => {
                    setInfo("");
                    setShowInfo(false);
                }, 3000)
            } else {
                setErr("Unable to update visibility✋🏻.");
                setShowErr(true);
                setTimeout(() => {
                    setErr("");
                    setShowErr(false);
                }, 3000)
            }
        })
    }

    function handleDelete(id) {
        fetch(`${API_ENDPOINT}/delete/doc`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                "Authorization": `Bearer ${localStorage.getItem("user_token")}`
            },
            method: "POST",
            body: JSON.stringify({ docID: id })
        }).then(res => res.json()
        ).then(jsonRes => {
            console.log(jsonRes);
            if (jsonRes.success) {
                const newDocs = docs.filter((doc) => doc._id !== id);
                setDocs(newDocs);
                setInfo("Successfully cleared code✋🏻.");
                setShowInfo(true);
                setTimeout(() => {
                    setInfo("");
                    setShowInfo(false);
                }, 3000)
            } else {
                setErr("Unable to delete code✋🏻.");
                setShowErr(true);
                setTimeout(() => {
                    setErr("");
                    setShowErr(false);
                }, 3000)
            }
        })
    }

    function initiateCollab(id) {
        const collabLink = uuidV4();
        const scheme = process.env.NODE_ENV === "development" ? "http://" : "https://"
        const url = scheme + window.location.host + "/editor/collab/" + collabLink
        const copyText = url.replace(/\s+/g, '');
        var input = document.body.appendChild(document.createElement("input"));
        input.value = copyText;
        input.focus();
        input.select();
        document.execCommand('copy');
        input.parentNode.removeChild(input);
        // setInfo('Collaboration link copied to clipboard✋🏻');
        // setTimeout(() => {
        //     setInfo(null);
        // }, 5000);
        fetch(`${API_ENDPOINT}/create/collab`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                "Authorization": `Bearer ${localStorage.getItem("user_token")}`
            },
            method: "POST",
            body: JSON.stringify({ docID: id, collabLink })
        }).then(res => res.json()
        ).then(jsonRes => {
            console.log(jsonRes);
            const newDocArray = [];
            if (jsonRes.success) {
                for (let i = 0; i < docs.length; i++) {
                    if (docs[i]._id === id) {
                        const newObj = {
                            _id: docs[i]._id,
                            language: docs[i].language,
                            name: docs[i].name,
                            user: docs[i].user,
                            private: docs[i].private,
                            publicLink: docs[i].publicLink,
                            collabLink: collabLink
                        }
                        newDocArray.push(newObj);
                    } else {
                        newDocArray.push(docs[i]);
                    }
                }
                setDocs(newDocArray);
                setInfo("Collab link copied to clipboard✋🏻. To collaborate create the link and then click on the code name to edit.");
                setShowInfo(true);
                setTimeout(() => {
                    setInfo("");
                    setShowInfo(false);
                }, 3000)
            } else {
                setErr("Collab link not created.");
                setShowErr(true);
                setTimeout(() => {
                    setErr("");
                    setShowErr(false);
                }, 3000)
            }
        })




    }
    function share(id, priv) {
        if (priv) {
            setInfo("You cannot share a public link to a private code.");
            setShowInfo(true);
            setTimeout(() => {
                setInfo("");
                setShowInfo(false);
            }, 3000)
            return;
        }
        const scheme = process.env.NODE_ENV === "development" ? "http://" : "https://"
        const url = scheme + window.location.host + "/public/editor/" + id
        const copyText = url.replace(/\s+/g, '');
        var input = document.body.appendChild(document.createElement("input"));
        input.value = copyText;
        input.focus();
        input.select();
        document.execCommand('copy');
        input.parentNode.removeChild(input);

        setInfo("Share link copied to clipboard✋🏻.");
        setShowInfo(true);
        setTimeout(() => {
            setInfo("");
            setShowInfo(false);
        }, 3000)
    }

    const PrivateOr = theme === "light" ? PrivateCodeLight : PrivateCode;
    const ViewOr = theme === "light" ? ViewCodeLight : ViewCode;
    return (
        <>
            {creatingDoc ? <div className="background_create_doc"></div> : ""}
            {showErr ? <InfoBar
                color="red"
                text={err}
            /> : ""}
            {showInfo ? <InfoBar
                color="blue"
                text={info}
            /> : ""}

            <SideBar
                page="gists"
            />
            {isLoadingCreateDoc ? <div>Creating gist...</div> : <div></div>}
            <div id="main">
                <img src={PadLock} id="padlock" className="point" alt="padlock" />
                {docs ? <img ref={profileImageRef} src={defaultImage} id="profile_pic" className="point" alt="profile_pic" /> : <> <CustomShimmer>
                    <div className={props.classes.circle} />
                </CustomShimmer> </>}
                <h3 id="greeting">Dev {username ? username : <> <CustomShimmer>
                    <div className={props.classes.line} />
                </CustomShimmer> </>}</h3>
                <h5 id="welcome">Welcome to your dashboard</h5>
                <Link id={theme === "light" ? "create_button_light" : "create_button"} to="/dash" onClick={createDoc} className="point" >Create a gist</Link>

                <p id="your_codes">Your Codes</p>
                {creatingDoc ? (
                    <div className={theme === "light" ? "create_doc_bg_light" : "create_doc_bg"}>

                        <input type="text" className={theme === "light" ? "create_doc_input_light" : "create_doc_input"} onChange={handleChange} name="name" placeholder="Name" autoComplete="false" />
                        <br />
                        <select className={theme === "light" ? "create_doc_dropdown_light" : "create_doc_dropdown"} name="language" placeholder="Language" onChange={handleChange} >
                            <option value="javascript">JavaScript</option>
                            <option value="css">CSS</option>
                            <option value="python">Python</option>
                            <option value="xml">HTML</option>
                            <option value="dart">Dart</option>
                            <option value="java">JAVA</option>
                            <option value="javascript">JSON</option>
                            <option value="javascript">JSX</option>
                        </select>
                        <br />
                        <div className="radio_buttons_doc" onChange={handleChange}>
                            <input type="radio" value={true} name="private" checked />Private
                            <input type="radio" value={false} name="private" />Public

                        </div>
                        <div className={theme === "light" ? "create_button_div_light" : "create_button_div"}>
                            <button onClick={handleSubmit}>Create</button>
                        </div>

                        <br />

                    </div>


                ) :
                    <div>

                    </div>

                }

                <div id="projects">


                    {
                        docs ? docs.map(({
                            name,
                            _id,
                            language,
                            private: priv,
                            publicLink,
                            collabLink,
                        }) => {
                            return (
                                <div className={theme === "light" ? "project_box_light" : "project_box"} key={_id}>
                                    <div className="language_button" id={language[0].toUpperCase() + language.slice(1, language.length)}>{language[0].toUpperCase() + language.slice(1, language.length)} {priv ? <i className="fa fa-lock"></i> : ""}</div>
                                    <div className={theme === "light" ? "big_light" : "big"}><Link className="point" to={`/edit/${_id}`}>{name.slice(0, 6).toUpperCase() + "..."}</Link></div>

                                    <div className="options">
                                        <img src={theme === "light" ? DeleteLight : Delete} alt="Delete code" className="point" onClick={() => handleDelete(_id)} />
                                        <img src={theme === "light" ? ShareLight : Share} alt="Share code" className="point" onClick={() => share(publicLink, priv)} />
                                        {/* <img src={ViewCode} alt="View code" className="point" /> */}
                                        <img src={priv ? PrivateOr : ViewOr} alt="Private code" className="point" onClick={() => handleVisibility(_id)}
                                        />
                                        {/* <img src={Edit} alt="Edit code" className="point" /> */}
                                        <img src={theme === "light" ? CollabCodeLight : CollabCode} alt="Collab code" className="point" onClick={() => initiateCollab(_id)} />
                                    </div>
                                </div>
                            )
                        }) : <>
                                <CustomShimmer>
                                    <div className={props.classes.projectBox} />
                                </CustomShimmer>
                                <CustomShimmer>
                                    <div className={props.classes.projectBox} />
                                </CustomShimmer> <CustomShimmer>
                                    <div className={props.classes.projectBox} />
                                </CustomShimmer> <CustomShimmer>
                                    <div className={props.classes.projectBox} />
                                </CustomShimmer> <CustomShimmer>
                                    <div className={props.classes.projectBox} />
                                </CustomShimmer> <CustomShimmer>
                                    <div className={props.classes.projectBox} />
                                </CustomShimmer> <CustomShimmer>
                                    <div className={props.classes.projectBox} />
                                </CustomShimmer> <CustomShimmer>
                                    <div className={props.classes.projectBox} />
                                </CustomShimmer> <CustomShimmer>
                                    <div className={props.classes.projectBox} />
                                </CustomShimmer> <CustomShimmer>
                                    <div className={props.classes.projectBox} />
                                </CustomShimmer>
                        </>
                    }




                </div>

            </div>



        </>
    );


}

export default makePriv(injectSheet(StyleSheet)(Dash));



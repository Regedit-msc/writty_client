import { makePriv } from "../auth_hoc/checkAuth";
import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { API_ENDPOINT } from "./url";
import { v4 as uuidV4 } from "uuid";



const Dash = (props) => {
    let history = useHistory();
    const [error, setError] = useState(null);

    const [info, setInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingCreateDoc, setIsLoadingCreateDoc] = useState(false);
    const [newDocName, setNewDocName] = useState({
        name: '',
        _id: '',
        language: "javascript"
    });
    const [docs, setDocs] = useState();
    const [creatingDoc, setCreatingDoc] = useState();
    const [username, setUsername] = useState();
    useEffect(() => {
        const userToken = localStorage.getItem("user_token");
        fetch(`${API_ENDPOINT}/details`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                "Authorization": `Bearer ${userToken}`
            },
            method: "GET",
        }).then(res => res.json()
        ).then(jsonRes => {
            console.log(jsonRes);
            if (jsonRes.success) {
                setUsername(jsonRes.username);
                setDocs(jsonRes.message);
                setIsLoading(false);
            } else {
                /// show error 
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
            default:
                break;
        }
    }
    function handleSubmit() {
        const userToken = localStorage.getItem("user_token");
        setIsLoadingCreateDoc(true);
        fetch(`${API_ENDPOINT}/create/doc`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                "Authorization": `Bearer ${userToken}`
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
            } else {
                /// show error 
            }
        })
    }

    function viewTheDoc(id, language) {
        console.log(id);
        console.log(language);
        history.push("/editor/" + language + "/" + id)

    }
    function handleDelete(id) {
        fetch(`${API_ENDPOINT}/delete/doc`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            method: "POST",
            body: JSON.stringify({ docID: id })
        }).then(res => res.json()
        ).then(jsonRes => {
            console.log(jsonRes);
            if (jsonRes.success) {
                const newDocs = docs.filter((doc) => doc._id !== id);
                setDocs(newDocs);
                setInfo(jsonRes.message + "🦑");
                setTimeout(() => {
                    setInfo(null);
                }, 5000)
            } else {
                setError(jsonRes.message + "🦥");
                setTimeout(() => {
                    setError(null);
                }, 2000)
            }
        })
    }

    function initiateCollab(id, lang) {
        const copyText = `View my live gist here. Join me here ${window.location.host + "/editor/" + lang + "/" + id}💅🏻.`;
        var input = document.body.appendChild(document.createElement("input"));
        input.value = copyText;
        input.focus();
        input.select();
        document.execCommand('copy');
        input.parentNode.removeChild(input);
        setInfo('Details copied to clipboard✋🏻');
        setTimeout(() => {
            setInfo(null);
        }, 5000)
    }

    function logOut() {
        localStorage.removeItem("user_token");
        history.push('/');
    }

    const UI =
        isLoading ? (<div className="m-4 font-bold text-lg">
            Loading... 🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓
        </div >

        ) : (
            <div className="relative">
                {info ? <div className="bg-purple-500 absolute  bottom-2 left-3 text-white p-2 rounded"><p>{info}</p></div> : <div></div>}
                {error ? <div className="bg-red-500 absolute  bottom-2  left-3  text-white p-2 rounded"><p>{error}</p></div> : <div></div>}
                    <div className="my-2 mx-2 flex flex-col w-3/4 lg:w-1/4 space-y-3 ">

                        <p><span className="font-bold text-2xl my-b-20 "> Noob coder {username}!!</span><br /> <span className="font-bold text-lg my-b-20  text-purple-900">Welcome to your dash.👩🏻‍🦼</span>.</p>
                        <button className="bg-green-500 hover:bg-purple-700 p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50" onClick={createDoc}>Create a gist</button>
                    <button className="bg-yellow-900 hover:bg-purple-700 p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50" onClick={logOut}>Log Out</button>
                </div>
                    {(docs && docs.length > 0) ? docs.map((doc, index, _) => <div key={doc._id} className=" flex flex-col bg-gray-100 mx-5 mb-2"><span className=" p-3"> {index + 1}. {doc.name}   <span className="uppercase text-purple-900 font-bold">{doc.language}</span> </span>  <span className="flex flex-row space-x-3 justify-end mx-3 my-3"><button className="bg-red-600 hover:bg-purple-700 p-2   rounded shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50" onClick={() => handleDelete(doc._id)}>Delete code</button>  <button className="bg-blue-600 hover:bg-purple-700 p-2 rounded shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50" onClick={() => viewTheDoc(doc._id, doc.language)}>View code</button> <button className="bg-gray-800 hover:bg-purple-700 p-2  rounded shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50" onClick={() => initiateCollab(doc._id, doc.language)}> Collab</button></span></div>) : <h3 className="flex items-center justify-center font-bold text-4xl">You have no docs yet🧛🏿‍♂️. Create one to get started🏋🏿‍♀️.</h3>}


                {creatingDoc ? (
                        <div className="ml-2 lg:ml-4">
                        <input className="bg-purple-100 placeholder-indigo-800 border border-transparent  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent p-2 h-10 w-70 " type="text" onChange={handleChange} name="name" placeholder="name" autoComplete="false" />
                            <br />

                            <input className="my-2 bg-purple-100 placeholder-indigo-800 border border-transparent  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent p-2 h-10 w-70 " type="text" onChange={handleChange} name="language" placeholder="language" autoComplete="false" />
                        <button className=" mx-5 bg-purple-600 hover:bg-purple-700 p-2 w-20  rounded shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50" onClick={handleSubmit}>Create</button>
                        <br />
                            {isLoadingCreateDoc ? <div>Creating gist...</div> : <div></div>}
                    </div>


                ) :
                    <div>

                    </div>



                }


            </div >
        )

    return UI;


}

export default makePriv(Dash);
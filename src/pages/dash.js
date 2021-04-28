import { makePriv } from "../auth_hoc/checkAuth";
import { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { userContext } from "../contexts/userContext";
import { API_ENDPOINT } from "./url";
import { v4 as uuidV4 } from "uuid";
import { withRouter } from "react-router-dom"


const Dash = (props) => {
    let history = useHistory();
    const [error, setError] = useState(null);
    const userToken = localStorage.getItem("user_token");
    const [info, setInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingCreateDoc, setIsLoadingCreateDoc] = useState(false);
    const [newDocName, setNewDocName] = useState({
        name: '',
        _id: '',
    });
    const [docs, setDocs] = useState();
    const [creatingDoc, setCreatingDoc] = useState();
    const [username, setUsername] = useState();
    const { getUserToken } = useContext(userContext);
    useEffect(() => {

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
        setNewDocName({
            ...newDocName,
            name: e.target.value, _id: uuidV4()

        })
    }
    function handleSubmit() {
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

    function viewTheDoc(id) {
        console.log(id);

        history.push(`/document/${id}`)

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

    function initiateCollab(id) {
        const copyText = `Let's collaborate on my writeup. Join me here ${window.location.host + "/document/" + id}💅🏻.`;
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
        isLoading ? (<div>
            Loading... 🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓
        </div >

        ) : (
            <div className="relative">
                {info ? <div className="bg-purple-500 absolute  bottom-2 left-3 text-white p-2 rounded"><p>{info}</p></div> : <div></div>}
                {error ? <div className="bg-red-500 absolute  bottom-2  left-3  text-white p-2 rounded"><p>{error}</p></div> : <div></div>}
                <div className="my-2 mx-2 flex flex-col w-1/4 space-y-3 ">

                    <p><span className="font-bold text-2xl my-b-20 uppercase">Great Sage !!</span><br /> <span className="font-bold text-lg my-b-20  text-purple-900">Welcome to your dash.🧙‍♂️</span>.</p>
                    <button className="bg-green-500 hover:bg-purple-700 p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50" onClick={createDoc}>Create a doc</button>
                    <button className="bg-yellow-900 hover:bg-purple-700 p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50" onClick={logOut}>Log Out</button>
                </div>
                {(docs && docs.length > 0) ? docs.map((doc, index, _) => <div key={doc._id} className=" flex flex-col bg-gray-100 mx-5 mb-2"><span className=" p-3"> {index + 1}. {doc.name}</span>  <span className="flex flex-row space-x-3 justify-end mx-3 my-3"><button className="bg-red-600 hover:bg-purple-700 p-2   rounded shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50" onClick={() => handleDelete(doc._id)}>Delete doc</button>  <button className="bg-blue-600 hover:bg-purple-700 p-2 rounded shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50" onClick={() => viewTheDoc(doc._id)}>View doc</button> <button className="bg-gray-800 hover:bg-purple-700 p-2  rounded shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50" onClick={() => initiateCollab(doc._id)}> Collab</button></span></div>) : <h3 className="flex items-center justify-center font-bold text-4xl">You have no docs yet🧛🏿‍♂️. Create one to get started🏋🏿‍♀️.</h3>}


                {creatingDoc ? (
                    <div className="createDoc__container mx-4">
                        <input className="bg-purple-100 placeholder-indigo-800 border border-transparent  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent p-2 h-10 w-70 " type="text" onChange={handleChange} name="name" placeholder="name" autoComplete="false" />
                        <button className=" mx-5 bg-purple-600 hover:bg-purple-700 p-2 w-20  rounded shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50" onClick={handleSubmit}>Create</button>
                        <br />
                        {isLoadingCreateDoc ? <div>Creating Doc...</div> : <div></div>}
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
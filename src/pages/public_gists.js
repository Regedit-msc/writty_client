const { useState, useEffect } = require("react");
const { API_ENDPOINT } = require("./url");

function colorize(lang) {
    switch (lang) {
        case "javascript":
            return "bg-red-900 font-bold uppercase hover:bg-purple-700 p-2   rounded shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50";
        case "python":
            return "bg-green-900 font-bold uppercase hover:bg-purple-700 p-2   rounded shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
        case "dart":
            return "bg-indigo-900 font-bold uppercase hover:bg-purple-700 p-2   rounded shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
        case "html":
            return "bg-pink-900 font-bold uppercase hover:bg-purple-700 p-2   rounded shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
        case "css":
            return "bg-yellow-500 font-bold uppercase hover:bg-purple-700 p-2   rounded shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
        default:
            return "bg-blue-900 font-bold uppercase hover:bg-purple-700 p-2   rounded shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
    }
}

const PublicGists = (props) => {
    const [docs, setDocs] = useState([]);
    useEffect(() => {
        fetch(API_ENDPOINT + "/public/docs").then(res => res.json()).then((response) => {
            setDocs([...docs, ...response.message]);
        });
    }, [docs]);
    function viewTheDoc(id, language) {
        console.log(id);
        console.log(language);
        props.history.push("/public/editor/" + language + "/" + id)

    }
    function generateRandomColor() {
        var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        return randomColor;
        //random color will be freshly served
    }
    const UI = (docs && docs.length > 0) ? docs.map((doc, index, _) => <>
        <div key={doc._id} className=" my-2 flex flex-col bg-gray-100 mx-5 mb-2 uppercase"><span className="p-3">  <span className=" font-bold p-3">{index + 1}.</span>{doc.name}  </span>  <span className="flex flex-row space-x-3 justify-end mx-3 my-3"><button className={colorize(doc.language)} >{doc.language}</button>  <button className={colorize(doc.language)} style={{ background: generateRandomColor() }} >{doc.user.username}</button> <button className="bg-blue-600 hover:bg-purple-700 p-2 rounded shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 font-bold" onClick={() => viewTheDoc(doc._id, doc.language)} >View code</button></span></div></>) : <h3 className="flex items-center justify-center font-bold text-2xl h-screen">There are no public gists yet 🤷‍♀️‍. Create one 🤙.</h3>
    return UI;
}

export default PublicGists;

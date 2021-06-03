import { useContext, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { userContext } from "../contexts/userContext";
import { API_ENDPOINT } from "./url";

const Login = () => {
    let history = useHistory();
    const [formState, setFormState] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState(null);

    const { setUserToken } = useContext(userContext);

    function handleChange(e) {
        switch (e.target.name) {
            case "username":
                setFormState({ ...formState, username: e.target.value })
                break;
            case "password":
                setFormState({ ...formState, password: e.target.value })
                break;
            default:
                break;
        }
    }
    function handleSubmit() {
        fetch(`${API_ENDPOINT}/login`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            method: "POST",
            body: JSON.stringify(formState)
        }).then(res => res.json()
        ).then(jsonRes => {
            console.log(jsonRes.message);
            if (jsonRes.success) {

                setUserToken(jsonRes.message);
                history.push('/dash');
            } else {
                setError(jsonRes.message + "😓");
                setTimeout(() => {
                    setError(null);
                }, 2000)
            }
        })
    }

    return (
        <>
            <div className="flex  m-2 font-bold"><Link to="/gists" className="text-black"> View public gists🤭</Link></div>
        <div className="flex  flex-col space-y-4  items-center justify-center h-screen ">
            <div> <p className="font-bold font-serif mb-20 text-4xl my-b-20 ">Live-Gists👩🏻‍💻</p></div>
            {error ? <div className="bg-red-500 text-white p-2 rounded"><p>{error}</p></div> : <div></div>}
            <p className="font-bold text-4xl my-b-20 uppercase"> Login</p>

            <input className="bg-purple-100 placeholder-indigo-800 border border-transparent  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent p-8 h-10 w-70 " type="text" onChange={handleChange} name="username" placeholder="username" autoComplete="false" />
            <input className=" bg-purple-100 placeholder-indigo-800 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent  p-8 h-10 w-70 " type="password" onChange={handleChange} name="password" placeholder="password" autoComplete="false" />
            <button className="bg-purple-600 hover:bg-purple-700 p-2 w-20  rounded shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50" onClick={handleSubmit}>Submit</button>
            <Link to="/register" className="text-purple-900"> Not yet registered ?</Link>
            {/* <h1>{JSON.stringify(formState, null, 2)}</h1> */}
        </div>
        </>
    )
}
export default Login;
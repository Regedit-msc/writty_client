import { createContext, useState } from "react";
export const imageContext = createContext();
const ImageContextProvider = (props) => {
    const [imageState, setImageState] = useState('https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=6&m=1223671392&s=612x612&w=0&h=NGxdexflb9EyQchqjQP0m6wYucJBYLfu46KCLNMHZYM=');
    function setImage(image_url) {
        // localStorage.setItem("image_url", image_url);
        setImageState(image_url);
    }
    return <imageContext.Provider value={{ imageState, setImage, image: imageState }}>
        {props.children}
    </imageContext.Provider>
}


export default ImageContextProvider;
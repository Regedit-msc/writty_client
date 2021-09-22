import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.css"
const Renderer = ({code : doc}) => {
    return <>
    
        {
            doc === '' || doc === null ? '': <iframe
            className={styles.renderer}
            title="renderer"
            srcDoc={doc}
            sandbox="allow-scripts"
            frameBorder="0"
          loading="lazy"
        />
   }
    </>
    
    
}
Renderer.propTypes = {
    doc: PropTypes.string
}
export default Renderer;
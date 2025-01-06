import React from "react";
import { motion } from "framer-motion";
function withPageTransition(WrappedComponent) {
  return class extends React.Component {
    render() {
      console.log("rendering page transition");
      return (
        <>
          <div>
            <motion.div
              //   exit={{}}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              style={{ opacity: 0 }}
              initial={false}
            >
              <WrappedComponent />
            </motion.div>
          </div>
        </>
      );
    }
  };
}

export default withPageTransition;

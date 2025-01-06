import { createContext, useRef, useState, useEffect } from "react";

export const PyodideContext = createContext();

export default function PyodideProvider({ children }) {
  const pyodide = useRef(null);
  const hasLoadPyodideBeenCalled = useRef(false);
  const [isPyodideLoading, setIsPyodideLoading] = useState(true);
  const [hasRan, setRan] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("hasRanCode") === "true") {
      setRan(true);
    } else {
      setRan(false);
    }
  }, []);
  const setHasRan = () => {
    if (hasRan) return;
    localStorage.setItem("hasRanCode", "true");
    setRan(true);
  };

  return (
    <PyodideContext.Provider
      value={{
        hasRan,
        setHasRan,
        pyodide,
        hasLoadPyodideBeenCalled,
        isPyodideLoading,
        setIsPyodideLoading,
      }}
    >
      {children}
    </PyodideContext.Provider>
  );
}

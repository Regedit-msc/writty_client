import { PyodideContext } from "../../contexts/pyDiodeContext";
import { useContext, useEffect } from "react";
import { useSnackbar } from "notistack";

export default function Pyodide({
  pythonCode,
  loadingMessage = "Revving interpreter...",
}) {
  const {
    pyodide,
    hasLoadPyodideBeenCalled,
    isPyodideLoading,
    setIsPyodideLoading,
  } = useContext(PyodideContext);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (function () {
      const originalLog = console.log;
      console.log = function (txt) {
        enqueueSnackbar(txt, { variant: "info" });
        originalLog.apply(console, arguments);
      };
    })();
    return () => {
      const originalLog = console.log;
      return (console.log = originalLog);
    };
  }, [pythonCode, enqueueSnackbar]);
  useEffect(() => {
    if (!hasLoadPyodideBeenCalled.current) {
      hasLoadPyodideBeenCalled.current = true;
      (async function () {
        if (!window.languagePluginLoader && window.pyodide) return;
        pyodide.current = await window.languagePluginLoader;
        setIsPyodideLoading(false);
      })();
    }
  }, [pyodide, hasLoadPyodideBeenCalled, setIsPyodideLoading]);
  useEffect(() => {
    if (!isPyodideLoading) {
      const evaluatePython = async (pyodide, pythonCode) => {
        try {
          pyodide.runPython(pythonCode);
        } catch (error) {
          console.error(error);
          enqueueSnackbar(
            "Error evaluating Python code. See console for details.",
            { variant: "error" }
          );
        }
      };
      (async function () {
        await evaluatePython(pyodide.current, pythonCode);
      })();
    } else {
      if (!hasLoadPyodideBeenCalled.current) {
        enqueueSnackbar(loadingMessage, { variant: "success" });
      }
    }
  }, [
    isPyodideLoading,
    pyodide,
    pythonCode,
    enqueueSnackbar,
    loadingMessage,
    hasLoadPyodideBeenCalled,
  ]);

  return <></>;
}

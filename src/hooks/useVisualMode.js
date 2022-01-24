import { useState } from "react";

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(secondMode, replace = false){
    if(!replace){
    setMode(secondMode)
    setHistory(history => [...history, secondMode])
    } else {
      setMode(secondMode)
    }
  };

  function back(){
    if(history.length > 1) {
      setMode(history[history.length-2])
      setHistory(history.slice(0, history.length-1))
    } else {
      setMode(initial)
      setHistory([initial])
    }
  };
 
  return { mode, transition, back };
}



/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const captureScreenShot = () => {
    //@ts-ignore
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        console.log(tabs[0].id);
        //@ts-ignore
        chrome.tabs.sendMessage(tabs[0].id, { type: "ScreenShot" });
        console.log("Sent Message");
      }
    });
  };

  useEffect(() => {
    const ReceiveScreenShot = (msg: any) => {
      alert("Screenshot received in react component");
      console.log(msg);
      // Handle the screenshot data here
      if (msg.type === "ScreenShot" && msg.data) {
        // Do something with msg.data (the screenshot)
      }
      return true; // Important: return true to indicate message handled
    };
    
    //@ts-ignore
    chrome.runtime.onMessage.addListener(ReceiveScreenShot);
    
    // Cleanup: remove listener when component unmounts
    return () => {
      //@ts-ignore
      chrome.runtime.onMessage.removeListener(ReceiveScreenShot);
    };
  }, []);


  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => {
            captureScreenShot();
            setCount((count) => count + 1);
          }}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

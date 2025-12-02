/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const captureScreenShot = () => {
     console.log("reached");
     //@ts-ignore
     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
       if (tabs[0]?.id) {
        console.log(tabs[0].id)
        //@ts-ignore
         chrome.tabs.sendMessage(tabs[0].id, { type: "ScreenShot" });
         console.log("Sent Message");
       }
     });
   }
  
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
        <button onClick={() =>{
          captureScreenShot();
          setCount((count) => count + 1)
          }}>
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
  )
}

export default App

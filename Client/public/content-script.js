// content-script.js
// const html2canvas = require("html2canvas");
import html2canvas from "html2canvas";
(function () {
    console.log("Content script loaded");
    const title = document.querySelector("title")?.textContent ?? "No title";
    const links = [...document.querySelectorAll("a")]
      .slice(0, 5)
      .map((a) => a.href);
  
    console.log("Page title:", title);
    console.log("First five links:", links);  
    chrome.runtime.onMessage.addListener((msg)=>{
      console.log("Receive one message from the popup",msg);
      if(msg.type == "ScreenShot"){
        html2canvas(document.body).then((res)=>{
          var imageData = res.toDataURL('image/png');
          chrome.runtime.sendMessage({type:"ScreenShot",data:imageData});
          console.log("Sent the screen shot to the extension");
        })
        /// Capture the Screen Shot and send back to popup.js and popup.js will forward this to the backend for analysis.
      }
    })
  })();
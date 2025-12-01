// content-script.js
(function () {
    const script = document.createElement('script');
    script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.js';
    script.onload = () => {
        console.log("Script loaded");
    }
    document.body.appendChild(script);
    console.log("Content script loaded");
    const title = document.querySelector("title")?.textContent ?? "No title";
    const links = [...document.querySelectorAll("a")]
      .slice(0, 5)
      .map((a) => a.href);
  
    console.log("Page title:", title);
    console.log("First five links:", links);  
    chrome.runtime.sendMessage({ type: "PAGE_SUMMARY", title, links });
    chorme.runtime.onMessage((msg)=>{
      console.log("Receive one message from the popup",msg);
      if(msg.type == "ScreenShot"){
        /// Capture the Screen Shot and send back to popup.js and popup.js will forward this to the backend for analysis.
        console.log("Captured the screenshot was clicked");
      }
    })
  })();
// content-script.js
(function () {
    console.log("Content script loaded");
    const title = document.querySelector("title")?.textContent ?? "No title";
    const links = [...document.querySelectorAll("a")]
      .slice(0, 5)
      .map((a) => a.href);
  
    console.log("Page title:", title);
    console.log("First five links:", links);
  
    chrome.runtime.sendMessage({ type: "PAGE_SUMMARY", title, links });
  })();
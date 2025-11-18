// popup.js
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type !== "PAGE_SUMMARY") return;
    document.getElementById("output").textContent =
      `Title: ${msg.title}\nLinks:\n- ${msg.links.join("\n- ")}`;
  });
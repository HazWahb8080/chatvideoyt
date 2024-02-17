chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "youtubeOrNot") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTab = tabs[0];
      function isYouTubeVideo(url) {
        return url.includes("youtube.com") && url.includes("/watch");
      }

      const isYouTube = isYouTubeVideo(currentTab.url);
      sendResponse(isYouTube); // Send the result back to the content script
    });

    // Return true to indicate that sendResponse will be used asynchronously
    return true;
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "getSession") {
    fetch("http://localhost:3001/api/auth/session", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to retreive session data");
        }
      })
      .then((session) => {
        sendResponse(session);
      })
      .catch((error) => {
        console.error(error);
      });
    return true;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.createNewTab) {
    chrome.tabs.update(sender.tab.id, { url: message.url });
  }
});

chrome.runtime.onInstalled.addListener(function () {
  chrome.tabs.create({ url: "http://localhost:3000/installed" });
});

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({ url: "http://localhost:3000/installed" });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if ((request.type = "getPlan")) {
    fetch("http://localhost:3000/api/plan_extension", {
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to retreive plan data");
        }
      })
      .then((data) => {
        sendResponse(data);
      })
      .catch((error) => {
        console.error(error);
      });
    return true;
  }
});

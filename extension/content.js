chrome.runtime.sendMessage({ type: "youtubeOrNot" }, function (response) {
  if (response) {
    setTimeout(function () {
      const showTranscriptButton = document.querySelector(
        'button[aria-label="Show transcript"]'
      );
      if (showTranscriptButton) {
        showTranscriptButton.click();
        const contentWrapper = document.querySelector(
          'ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-searchable-transcript"]'
        );
        if (contentWrapper) {
          let transcript = [];
          contentWrapper.style.opacity = "0";
          const contentWrap = contentWrapper.querySelector("#content");
          const mainDiv = document.createElement("div");
          const MainParagraph = document.createElement("div");
          MainParagraph.style.paddingTop = "20px";
          const toggleTabs = document.createElement("div");
          mainDiv.style.display = "flex";
          mainDiv.style.flexDirection = "column";
          toggleTabs.style.display = "flex";
          toggleTabs.style.flexDirection = "row";
          toggleTabs.style.width = "100%";
          toggleTabs.style.marginBottom = "10px";
          mainDiv.appendChild(toggleTabs);
          mainDiv.appendChild(MainParagraph);
          const SummaryTab = document.createElement("button");
          SummaryTab.innerHTML = "summary";
          SummaryTab.style.cssText = `
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 10px;
  padding-left: 10px;
  border: 1px solid #00000010;
  background-color: #ffffff;
  font-family: Arial, sans-serif;
  font-size: 17px;
  color: #000000;
  border-radius: 20px;
  opacity: 1;
  cursor: pointer;
`;
          toggleTabs.appendChild(SummaryTab);
          const ChatTab = document.createElement("button");
          ChatTab.innerHTML = "Chat";
          ChatTab.style.cssText = `
   padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 10px;
  padding-left: 10px;
  border: 1px solid #00000010;
  background-color: #ffffff;
  font-family: Arial, sans-serif;
  font-size: 17px;
  color: #000000;
  border-radius: 20px;
  opacity: 0.8;
  margin-left: 10px;
  cursor: pointer;
`;
          toggleTabs.appendChild(ChatTab);
          setTimeout(() => {
            contentWrapper.style.display = "none";
            contentWrapper.insertAdjacentElement("afterend", mainDiv);
            mainDiv.style.cssText = `
  padding: 20px;
  border: 1px solid #ffffff10;
  background-color: #1d1d1d;
  font-family: Arial, sans-serif;
  font-size: 17px;
  color: #ffffff;
  border-radius: 20px;
  overflow-y: auto;
  max-height: 500px;
`;
            mainDiv.classList.add("mainDiv");

            let transcriptElement1 = contentWrap.querySelector(
              "ytd-transcript-renderer"
            );
            let transcriptElement2 = transcriptElement1.querySelector(
              "#segments-container"
            );
            let transcriptElement3 = transcriptElement2.querySelectorAll(
              "yt-formatted-string"
            );
            if (transcriptElement3) {
              transcriptElement3.forEach((string) =>
                transcript.push(string.innerHTML)
              );
            }
            const input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("placeholder", "Ask a Question");
            input.style.borderRadius = "20px";
            input.style.width = "80%";
            input.style.border = "1px solid #ffffff10";
            input.style.backgroundColor = "#1d1d1d";
            input.style.color = "#ffffff";
            input.style.padding = "10px";
            input.style.outline = "none";
            input.style.fontSize = "15px";
            input.style.display = "none";
            const subscribeButton = document.createElement("button");
            subscribeButton.textContent = "subscribe";
            subscribeButton.style.cssText = `
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 10px;
  padding-left: 10px;
  margin-left: 5px;
  border: 1px solid #00000010;
  background-color: #ffffff;
  font-family: Arial, sans-serif;
  font-size: 17px;
  color: #000000;
  border-radius: 20px;
  cursor: pointer;
  display:none;
`;
            const submitButton = document.createElement("button");
            submitButton.textContent = "Ask";
            submitButton.style.cssText = `
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 10px;
  padding-left: 10px;
  margin-left: 5px;
  border: 1px solid #00000010;
  background-color: #ffffff;
  font-family: Arial, sans-serif;
  font-size: 17px;
  color: #000000;
  border-radius: 20px;
  cursor: pointer;
  display:none;
`;
            const wrapper = document.createElement("div");
            mainDiv.appendChild(wrapper);
            wrapper.style.display = "flex";
            wrapper.style.flexDirection = "row";
            wrapper.style.width = "100%";
            wrapper.style.padding = "5px";
            wrapper.style.justifyContent = "center";
            wrapper.style.alignItems = "center";
            wrapper.appendChild(input);
            wrapper.appendChild(submitButton);
            mainDiv.style.overflowX = "hidden";
            const answerParagraph = document.createElement("p");
            answerParagraph.style.display = "none";
            mainDiv.appendChild(answerParagraph);
            const loginButton = document.createElement("button");
            mainDiv.appendChild(loginButton);
            loginButton.innerText = "Log In";
            loginButton.style.cssText = ` padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 10px;
  padding-left: 10px;
  margin-left: 5px;
  border: 1px solid #00000010;
  background-color: #ffffff;
  font-family: Arial, sans-serif;
  font-size: 17px;
  color: #000000;
  border-radius: 20px;
  cursor: pointer;
  display:none;`;
            let apiKey = "";
            chrome.runtime.sendMessage({ type: "getSession" }, (session) => {
              chrome.runtime.sendMessage({ type: "getPlan" }, (plan) => {
                if (!plan && session) {
                  const p1 = document.createElement("p");
                  p1.textContent = "please subscribe to one of our plans";
                  p1.style.color = "white";
                  mainDiv.appendChild(p1);
                  ChatTab.style.display = "none";
                  SummaryTab.style.display = "none";
                  MainParagraph.style.display = "none";
                  input.style.display = "none";
                  submitButton.style.display = "none";
                  answerParagraph.style.display = "none";
                  subscribeButton.style.display = "block";
                  subscribeButton.addEventListener("click", () => {
                    chrome.runtime.sendMessage({
                      createNewTab: true,
                      url: `http://localhost:3000/pricing?next=${window.location.href}`,
                    });
                  });
                }
                if (session && plan.status == "active") {
                  fetch("http://localhost:3001/api/transcript", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ transcript, session }),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      apiKey = data.key;
                      const transcriptLines = data.generatedText.split("\n");
                      transcriptLines.forEach((line) => {
                        const paragraph = document.createElement("p");
                        paragraph.textContent = line;
                        MainParagraph.appendChild(paragraph);
                        const lineBreak = document.createElement("br");
                        MainParagraph.appendChild(lineBreak);
                      });
                      contentWrapper.remove();
                    });
                  const footer = document.createElement("div");
                  footer.style.width = "100%";
                  footer.style.display = "flex";
                  footer.style.flexDirection = "row";
                  footer.style.paddingTop = "20px";
                  footer.style.justifyContent = "space-between";
                  footer.style.alignItems = "center";
                  const footerP = document.createElement("p");
                  footerP.textContent = `plan is ${plan.status}`;
                  footerP.style.color = "#ffffff90";
                  footer.appendChild(footerP);

                  const footerLink1 = document.createElement("a");
                  footerLink1.textContent = "apiKey";
                  footerLink1.style.color = "#ffffff90";
                  footerLink1.href = "http://localhost:3000/installed";

                  const footerLink2 = document.createElement("a");
                  footerLink2.textContent = "subscription";
                  footerLink2.style.color = "#ffffff90";
                  footerLink2.href = "http://localhost:3000/plans";
                  footer.appendChild(footerLink2);

                  SummaryTab.addEventListener("click", async () => {
                    SummaryTab.style.opacity = "1";
                    ChatTab.style.opacity = "0.7";
                    input.style.display = "none";
                    submitButton.style.display = "none";
                    answerParagraph.style.display = "none";
                    MainParagraph.style.display = "block";
                  });
                  ChatTab.addEventListener("click", async () => {
                    ChatTab.style.opacity = "1";
                    SummaryTab.style.opacity = "0.7";
                    input.style.display = "block";
                    submitButton.style.display = "block";
                    answerParagraph.style.display = "block";
                    MainParagraph.style.display = "none";
                  });
                  submitButton.addEventListener("click", async () => {
                    const question = input.value;
                    if (question.trim() == "") return;
                    const askQuestion = `${question}, using this knowledge from this video ${transcript}.`;
                    const openaiAnswer = await fetch(
                      "https://api.openai.com/v1/chat/completions",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${apiKey}`,
                        },
                        body: JSON.stringify({
                          model: "gpt-3.5-turbo-1106",
                          messages: [{ role: "user", content: askQuestion }],
                        }),
                      }
                    );

                    if (openaiAnswer.ok) {
                      const openaiAnswerData = await openaiAnswer.json();

                      // Display the response from OpenAI in the same mainDiv
                      answerParagraph.style.marginTop = "10px";
                      answerParagraph.style.marginBottom = "10px";
                      answerParagraph.style.padding = "5px";
                      if (
                        openaiAnswerData.choices &&
                        openaiAnswerData.choices.length > 0 &&
                        openaiAnswerData.choices[0].message &&
                        openaiAnswerData.choices[0].message.content
                      ) {
                        answerParagraph.textContent =
                          openaiAnswerData.choices[0].message.content;
                        input.value = "";
                        input.placeholder = question;
                      } else {
                      }
                    } else {
                      console.error("Error fetching data from OpenAI");
                    }
                  });
                }
                if (session && plan.status !== "active") {
                  const p1 = document.createElement("p");
                  p1.textContent = "please subscribe to one of our plans first";
                  p1.style.color = "white";
                  mainDiv.appendChild(p1);
                  ChatTab.style.display = "none";
                  SummaryTab.style.display = "none";
                  MainParagraph.style.display = "none";
                  input.style.display = "none";
                  submitButton.style.display = "none";
                  answerParagraph.style.display = "none";
                  subscribeButton.style.display = "block";
                  subscribeButton.addEventListener("click", () => {
                    chrome.runtime.sendMessage({
                      createNewTab: true,
                      url: `http://localhost:3000/pricing?next=${window.location.href}`,
                    });
                  });
                } else {
                  const p2 = document.createElement("p");
                  p2.textContent = "Please sign in first";
                  p2.style.color = "white";
                  mainDiv.appendChild(p2);
                  ChatTab.style.display = "none";
                  SummaryTab.style.display = "none";
                  MainParagraph.style.display = "none";
                  input.style.display = "none";
                  submitButton.style.display = "none";
                  answerParagraph.style.display = "none";
                  loginButton.style.display = "block";
                  loginButton.addEventListener("click", () => {
                    chrome.runtime.sendMessage({
                      createNewTab: true,
                      url: `http://localhost:3000/signin?next=${window.location.href}`,
                    });
                  });
                }
              });
            });
          }, 3000);
        }
      }
    }, 7000);
  } else {
    console.log("This is not a youtube video page");
  }
});

const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// VoiceRSS Javascript SDK


function tellMe(joke) {
  VoiceRSS.speech({
    key: "ddd2aba9cf744630b9ceb9928cef7bef",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

//function toggle-button
function toggleButton() {
  button.disabled = !button.disabled; //disables if enabled and vice-versa
}

let joke = "";

async function getJokes() {
  try {
    const apiURL =
      "https://v2.jokeapi.dev/joke/Pun,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
    const response = await fetch(apiURL);
    const data = await response.json();

    //console.log(data.joke) // this would give us the joke only if we have a single part jokes in the category cuz if we have two part jokes then          it has two parts namely setup and delivery  therefore it would be undefined
    /*Example:
    id: 50
lang: "en"
safe: true
setup: "Why do programmers wear glasses?"
type: "twopart" */

    // for two part jokes: we created an empty string initially called joke line no.120

    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellMe(joke);
    toggleButton();
  } catch (error) {
    console.log("Error! ", error);
  }
}

//event listeners:

button.addEventListener("click", getJokes);
audioElement.addEventListener('ended',toggleButton);


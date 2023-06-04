"use strict";

// Selecting html elements
const pictures = document.querySelectorAll(".picture");
const second = document.querySelector(".second-unit");
const minute = document.querySelector(".minute-unit");
const hour = document.querySelector(".hour-unit");
const timeUnits = document.querySelectorAll(".unit");
const reset = document.querySelector(".reset-button");
const clickable = document.querySelector(".clickable-text");
const relevant = document.querySelector(".relevant-paragraph");

// Declaring variables
let startTime = localStorage.getItem("time") || "";
const interval = setInterval(intervalHandler, 1000);
const throttleScroll = throttle(scrollHandler, 100);

function iniFrame() {
    if ( window.location !== window.parent.location )
    {
     
        // The page is in an iFrames
        console.log("The page is in an iFrame");
    }
    else {
         
        // The page is not in an iFrame
        console.log("The page is not in an iFrame");
    }
}
 
// Calling iniFrame function
iniFrame();

// Handler function for timer
function intervalHandler() {
  let currentTime = Math.floor(new Date().getTime() - startTime);
  let seconds = Math.floor(currentTime / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  second.textContent = ("" + (seconds % 60)).padStart(2, "0");
  minute.textContent = ("" + (minutes % 60)).padStart(2, "0");
  hour.textContent = ("" + hours).padStart(2, "0");
}

// Function to start timer and store start value to local storage
function startTimer() {
  if (!startTime) {
    startTime = new Date().getTime();
    localStorage.setItem("time", startTime);
  }
  interval;
}

// Scroll to relevant paragraph function
function scrollToHandler() {
  const options = { top: relevant.offsetTop, left: 0, behavior: "smooth" };
  window.scrollTo(options);
}

// Scroll handler function
function scrollHandler() {
  pictures.forEach((picture) => {
    const halfShown =
      window.scrollY + window.innerHeight - picture.offsetHeight / 2;
    const pictureBottom = picture.offsetTop + picture.offsetHeight;
    const slideIn = halfShown >= picture.offsetTop;
    const slideOut = pictureBottom <= window.scrollY;

    if (slideIn && !slideOut) {
      picture.classList.add("active");
    } else {
      picture.classList.remove("active");
    }
  });
}

// Reset button handler
function resetHandler() {
  startTime = "";
  startTimer();
}

// Flip timer containers on change
function changeHandler(event) {
  let container = event.target.closest(".time-container");
  container.classList.toggle("flip");
}

// Generic throttle function
function throttle(func, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

// Calling on page load to get initial photos right
scrollHandler();

// Event listeners
document.addEventListener("scroll", throttleScroll);
window.addEventListener("load", startTimer);
reset.addEventListener("click", resetHandler);
clickable.addEventListener("click", scrollToHandler);
timeUnits.forEach((unit) =>
  unit.addEventListener("DOMSubtreeModified", changeHandler)
);

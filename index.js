"use strict";

/* Coltrane Willsey	  *
 * 2022-12-07 [21:08] */

// Copyright (C) 2022 Coltrane Willsey (cwillsey06@gmail.com)
// Everyone is permitted to copy and distribute copies of this file under GNU GPL-3.0

const previousLink = document.querySelector("a.prev");
const nextLink = document.querySelector("a.next");

const upvotePostLink = document.querySelector("a.post-vote-up-link");
const downvotePostLink = document.querySelector("a.post-vote-down-link");

const downloadButton = document.querySelector("#image-download-link a");

const returnToSearchPageLink = document.querySelector(".search-name a");
const searchBar = document.querySelector("#tags");

const commandSilencingElements = [
  HTMLInputElement,
  HTMLTextAreaElement,
];

function shouldSilenceCommands(event) {
  if (event.repeat) return true;
  if (document.activeElement) {
    return commandSilencingElements.some(element => {
      return document.activeElement instanceof element;
    });
  } else {
    return false;
  }
}

function addHotkeyListener(key, fn) {
  document.addEventListener("keydown", (event) => {
    if (shouldSilenceCommands(event)) return;
    if (event.key === key) {
      fn();
    }
  });
}

function clickElement(element) {
  return () => {
    element.click();
  };
}

function focusInput(input) {
  return () => {
    input.focus();
  };
}

// Navigation
addHotkeyListener("h", clickElement(previousLink));
addHotkeyListener("l", clickElement(nextLink));

addHotkeyListener("ArrowLeft", clickElement(previousLink));
addHotkeyListener("ArrowRight", clickElement(nextLink));

// Voting
addHotkeyListener("+", clickElement(upvotePostLink));
addHotkeyListener("-", clickElement(downvotePostLink));

// Download
addHotkeyListener("d", clickElement(downloadButton));

// Search
addHotkeyListener("b", clickElement(returnToSearchPageLink));
addHotkeyListener("/", focusInput(searchBar));

// Special case for favorite buttons
const addFavoriteButton = document.querySelector("#add-fav-button");
const removeFavoriteButton = document.querySelector("#remove-fav-button");

addHotkeyListener("f", () => {
  if (removeFavoriteButton.style.display === "none") {
    clickElement(addFavoriteButton);
    return;
  }
  if (addFavoriteButton.style.display === "none") {
    clickElement(removeFavoriteButton);
    return;
  }
});

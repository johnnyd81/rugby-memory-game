//array of different card objects
let cardsArray = [
  {
    name: "player1",
    pic: "./pics/pic1.jpeg",
  },
  {
    name: "player2",
    pic: "./pics/pic2.jpeg",
  },
  {
    name: "player3",
    pic: "./pics/pic3.jpeg",
  },
  {
    name: "player4",
    pic: "./pics/pic4.jpeg",
  },
  {
    name: "player5",
    pic: "./pics/pic5.jpeg",
  },
  {
    name: "player6",
    pic: "./pics/pic6.jpeg",
  },
  {
    name: "player7",
    pic: "./pics/pic7.jpeg",
  },
  {
    name: "player8",
    pic: "./pics/pic8.jpeg",
  },
  {
    name: "player1",
    pic: "./pics/pic1.jpeg",
  },
  {
    name: "player2",
    pic: "./pics/pic2.jpeg",
  },
  {
    name: "player3",
    pic: "./pics/pic3.jpeg",
  },
  {
    name: "player4",
    pic: "./pics/pic4.jpeg",
  },
  {
    name: "player5",
    pic: "./pics/pic5.jpeg",
  },
  {
    name: "player6",
    pic: "./pics/pic6.jpeg",
  },
  {
    name: "player7",
    pic: "./pics/pic7.jpeg",
  },
  {
    name: "player8",
    pic: "./pics/pic8.jpeg",
  },
];

//function to randomly place cards on the board
function shuffleCards(arr) {
  let currCard = arr.length - 1;
  while (currCard != 0) {
    let randomCard = Math.floor(Math.random() * arr.length);
    currCard -= 1;

    let tempCard = arr[currCard];
    arr[currCard] = arr[randomCard];
    arr[randomCard] = tempCard;
  }
  return arr;
}

let gameDisplay = document.querySelector(".main");
let timeBox = document.querySelector(".timer");
let timer = document.querySelector(".timerNumber");
let modalBox = document.querySelector(".modalBox");
let modal = document.querySelector(".modal");
let msg = document.querySelector(".msg");
let restart = document.querySelector(".restart");
let cardsChosen = [];
let cardsChosenIds = [];
let cardsWon = [];

let gameTimer = setInterval(() => {
  let time = timer.textContent;
  time -= 1;
  timer.textContent = time;
  if (time == 10) {
    timeBox.style.color = "crimson";
    timeBox.style.textShadow = "1px 1px 2px white";
  } else if (time == 0) {
    clearInterval(gameTimer);
    modalBox.classList.add("active");
  } else if (cardsWon.length == 16) {
    clearInterval(gameTimer);
    modalBox.classList.add("active");
    modal.classList.add("winModal");
    let currTime = 50 - Number(timer.textContent);
    let winMsg =
      "WOW, good memory. You needed " +
      currTime +
      " seconds to find all the cards.";
    msg.textContent = "Congratulations, you found all the cards. " + winMsg;
  }
}, 1000);

function checkMatch() {
  let cards = document.querySelectorAll("img");
  let choiceOneId = cardsChosenIds.at(0);
  let choiceTwoId = cardsChosenIds.at(1);

  if (cardsChosen.at(0) === cardsChosen.at(1)) {
    cardsWon = [...cardsWon, ...cardsChosen];
    cards[choiceOneId].removeEventListener("click", flipCard);
    cards[choiceTwoId].removeEventListener("click", flipCard);
    cardsChosenIds.length = 0;
    cardsChosen.length = 0;
  } else {
    cards[choiceOneId].setAttribute("src", "./pics/backCard.jpeg");
    cards[choiceTwoId].setAttribute("src", "./pics/backCard.jpeg");
    cardsChosenIds.length = 0;
    cardsChosen.length = 0;
  }
}

function createBoard() {
  for (let i = 0; i < cardsArray.length; i++) {
    let card = document.createElement("img");
    card.setAttribute("class", "card");
    card.setAttribute("alt", "rugby-item");
    card.setAttribute("data-id", i);
    card.setAttribute("src", "./pics/backCard.jpeg");
    card.addEventListener("click", flipCard);
    gameDisplay.appendChild(card);
  }
}

function flipCard() {
  let cardId = this.getAttribute("data-id");
  if (cardsChosenIds.includes(cardId)) {
    alert("Please choose another card");
  } else {
    cardsChosen.push(cardsArray[cardId].name);
    cardsChosenIds.push(cardId);
  }
  this.setAttribute("src", cardsArray[cardId].pic);
  if (cardsChosen.length === 2) {
    setTimeout(checkMatch, 400);
  }
}

restart.addEventListener("click", () => {
  window.location.reload();
});

createBoard();
shuffleCards(cardsArray);

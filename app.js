// array of different player card objects i.e. names and images of the pairs of cards used in the game ui
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

//function to randomly place the cards on the game board
//the function is called when the webpage is loaded
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

// the variables required to manipulate the DOM
let gameDisplay = document.querySelector(".main");
let timeBox = document.querySelector(".timer");
let timer = document.querySelector(".timerNumber");
let modalBox = document.querySelector(".modalBox");
let modal = document.querySelector(".modal");
let msg = document.querySelector(".msg");
let restart = document.querySelector(".restart");

// the three arrays below keep track of the selected cards and whether they match or not
let cardsChosen = [];
let cardsChosenIds = [];
//the cardsWon array keeps track of cards that are already matched up
let cardsWon = [];

// the interval timer sets the timing of the game and certain events are triggered during different phases of the game
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

//the function belows checks if cards match or not
function checkMatch() {
  let cards = document.querySelectorAll("img");
  let choiceOneId = cardsChosenIds.at(0);
  let choiceTwoId = cardsChosenIds.at(1);

  if (cardsChosen.at(0) === cardsChosen.at(1)) {
    //the matching cards are added into the cardsWon array that eventually decides if all the cards are matched
    cardsWon = [...cardsWon, ...cardsChosen];
    //if a pair of cards are matched then their click event handler is removed to prevent duplicate values in the cardsChosen array
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

//adds the different cards to the board by looping over the cardsArray and adding each card to the screen
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

//the flipCard function flips a card when clicked. It is the callback function for the event handler for each card on the screen
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

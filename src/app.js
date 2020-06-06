class catFight {
  constructor(cats) {
    this.cats = cats;
    this._onEvent = this._onEvent.bind(this);
    this._func = this._func.bind(this);
  }

  init() {
    this._catClickHandler();
    this._toggleFight();
    this._randomFighter();
  }

  _catClickHandler() {
    Array.from(cats).forEach((item) => {
      item.addEventListener("click", this._onEvent);
    });
    this._buttonClickHandler(fightButton);
  }

  _onEvent(event) {
    event.preventDefault();
    if (event.currentTarget.closest("#firstSide")) side = true;
    else side = false;
    if (side) BoxInfo.first.image.style.border = "none";
    else BoxInfo.second.image.style.border = "none";
    winner = event.currentTarget;
    loser = event.currentTarget;

    this._getCatInfo(event.currentTarget);
    this._fillBox(event.currentTarget);
    this._toggleFight();
  }

  _getCatInfo(item) {
    infoCat = JSON.parse(item.dataset.info);
    id = infoCat.id;
    name = infoCat.name;
    age = infoCat.age;
    catInfo = infoCat.catInfo;
    wins = infoCat.record.wins;
    loss = infoCat.record.loss;
    total = wins + loss;
    percentage = ((wins / total) * 100).toFixed(3);
    img = item.querySelector("img");
  }

  _fillBox(item) {
    if (side) {
      this._getFirstFighter(item);
      BoxInfo.first.id = id;
      BoxInfo.first.nameInfo.innerText = name;
      BoxInfo.first.ageInfo.innerText = age;
      BoxInfo.first.skillsInfo.innerText = catInfo;
      BoxInfo.first.winsInfo.innerText = wins;
      BoxInfo.first.lossInfo.innerText = loss;
      BoxInfo.first.image.src = img.src;
    } else {
      this._getSecondFighter(item);
      BoxInfo.second.id = id;
      BoxInfo.second.nameInfo.innerText = name;
      BoxInfo.second.ageInfo.innerText = age;
      BoxInfo.second.skillsInfo.innerText = catInfo;
      BoxInfo.second.winsInfo.innerText = wins;
      BoxInfo.second.lossInfo.innerText = loss;
      BoxInfo.second.image.src = img.src;
    }
  }

  _getFirstFighter(item) {
    firstFighter = item;
    firstFighter.id = id;
    firstFighter.name = name;
    firstFighter.age = age;
    firstFighter.catInfo = catInfo;
    firstFighter.wins = wins;
    firstFighter.loss = loss;
    firstFighter.total = total;
    firstFighter.percentage = percentage;
    firstFighter.side = side;
    firstFighter.img = img;
  }

  _getSecondFighter(item) {
    secondFighter = item;
    secondFighter.id = id;
    secondFighter.name = name;
    secondFighter.age = age;
    secondFighter.catInfo = catInfo;
    secondFighter.wins = wins;
    secondFighter.loss = loss;
    secondFighter.total = total;
    secondFighter.percentage = percentage;
    secondFighter.img = img;
    secondFighter.side = side;
  }

  _toggleFight() {
    if (
        BoxInfo.first.nameInfo.innerText == "Cat Name" ||
        BoxInfo.second.nameInfo.innerText == "Cat Name"
    ) {
      fightButton.disabled = true;
    } else if (BoxInfo.first.id == BoxInfo.second.id) {
      fightButton.disabled = true;
    } else {
      fightButton.disabled = false;
    }
  }

  _buttonClickHandler(fightButton) {
    if (fightButton.disabled == false) {
      fightButton.addEventListener("click", (e) => {
        e.preventDefault();
        this._setTimer();
      });
    }
  }

  _setTimer() {
    Array.from(cats).forEach((item) => {
      item.removeEventListener("click", this._onEvent);
    });
    Array.from(buttons).forEach((item) => {
      item.disabled = true;
    });
    addnewBtn.disabled = true;
    let second = 3;
    setTimeout(this._func, 3000);
    const clockCounter = setInterval(function () {
      clock.innerText = second;
      second--;
      if (second == 0) {
        clearInterval(clockCounter);
      }
    }, 1000);
  }

  _func() {
    this._catClickHandler();
    Array.from(buttons).forEach((item) => {
      item.disabled = false;
    });
    addnewBtn.disabled = false;
    this._fight();
  }

  _fight() {
    let randomNumber = Math.random();
    randomNumber.toFixed(3);

    if (firstFighter.percentage > secondFighter.percentage) {
      if (firstFighter.percentage - secondFighter.percentage < 10) {
        if (randomNumber <= 0.59) {
          winner = firstFighter;
          loser = secondFighter;
        } else {
          winner = secondFighter;
          loser = firstFighter;
        }
      } else {
        if (randomNumber <= 0.69) {
          winner = firstFighter;
          loser = secondFighter;
        } else {
          winner = secondFighter;
          loser = firstFighter;
        }
      }
    } else if (secondFighter.percentage > firstFighter.percentage) {
      if (secondFighter.percentage - firstFighter.percentage < 10) {
        if (randomNumber <= 0.59) {
          winner = secondFighter;
          loser = firstFighter;
        } else {
          winner = firstFighter;
          loser = secondFighter;
        }
      } else {
        if (randomNumber <= 0.69) {
          winner = secondFighter;
          loser = firstFighter;
        } else {
          winner = firstFighter;
          loser = secondFighter;
        }
      }
    }

    winner.wins = winner.wins + 1;
    loser.loss = loser.loss + 1;

    this._updateBoard(winner, loser);
    this._updateCatInfo(winner, loser);
  }

  _updateBoard(winner, loser) {
    message.innerText = winner.name;
    if (winner.id == firstFighter.id)
      BoxInfo.first.image.style.border = "thick solid #42e35a";
    else if (winner.id == secondFighter.id)
      BoxInfo.second.image.style.border = "thick solid #42e35a";

    if (loser.id == firstFighter.id)
      BoxInfo.first.image.style.border = "thick solid #ed4a4a";
    else if (loser.id == secondFighter.id)
      BoxInfo.second.image.style.border = "thick solid #ed4a4a";

    winnerObj = {
      id: winner.id,
      name: winner.name,
      age: winner.age,
      catInfo: winner.catInfo,
      record: {
        wins: winner.wins,
        loss: winner.loss,
      },
    };
    loserObj = {
      id: loser.id,
      name: loser.name,
      age: loser.age,
      catInfo: loser.catInfo,
      record: {
        wins: loser.wins,
        loss: loser.loss,
      },
    };
  }

  _updateCatInfo(winner, loser) {
    let half = cats.length / 2;
    let hm1 = half - 1;
    let id1 = winner.id - 1;
    let id2 = parseInt(winner.id) + hm1;
    let id3 = loser.id - 1;
    let id4 = parseInt(loser.id) + hm1;

    console.log("winner id " + winner.id );
    console.log("loser id: " + loser.id);

    Array.from(cats).forEach((item, index) => {
      side = winner.side;
      if (index == id1) {
        item.dataset.info = JSON.stringify(winnerObj);
        this._getCatInfo(item);
        this._fillBox(item);
      }
    });
    Array.from(cats).forEach((item, index) => {
      if (index == id2) {
        item.dataset.info = JSON.stringify(winnerObj);
        this._getCatInfo(item);
        this._fillBox(item);
      }
    });

    Array.from(cats).forEach((item, index) => {
      side = loser.side;
      if (index == id3) {
        item.dataset.info = JSON.stringify(loserObj);
        this._getCatInfo(item);
        this._fillBox(item);
      }
    });

    Array.from(cats).forEach((item, index) => {
      side = loser.side;
      if (index == id4) {
        item.dataset.info = JSON.stringify(loserObj);
        this._getCatInfo(item);
        this._fillBox(item);
      }
    });

    this._updateDatabase(winner.id, loser.id);
  }

  _randomFighter() {
    randomFightButton.addEventListener("click", (e) => {
      e.preventDefault();
      var br = 0;
      for (var i = 0; i < parseInt(cats.length / 2); i++) {
        br++;
      }
      BoxInfo.first.image.style.border = "none";
      BoxInfo.second.image.style.border = "none";
      let numLeft = Math.floor(Math.random() * br);
      let numRight = Math.floor(Math.random() * br);
      if (numLeft == numRight) {
        this._randomFighter();
      } else {
        Array.from(cats).forEach((item, index) => {
          console.log("NumLeft: " + numLeft);
          if (index < cats.length / 2) {
            if (index + 1 == numLeft) {
              side = true;
              this._getCatInfo(item);
              this._fillBox(item);
            }
          } else if (index >= cats.length / 2) {
            console.log("numRight: " + numRight);
            if (index - cats.length / 2 + 1 == numRight) {
              side = false;
              this._getCatInfo(item);
              this._fillBox(item);
            }
          }
        });
        this._toggleFight();
      }
    });
  }

  //ajax poziv za ostvarivanje update-a u bazi pomoću id-a pobjednika i gubitnika
  _updateDatabase(idWinner, idLoser) {
    $.ajax({
      type: "POST",
      url: "./updateDatabase.php",
      data: {
        winner: idWinner,
        loser: idLoser,
      },
      success: function (data) {
        console.log("success");
      },
    });
  }
}

const firstSide = document.querySelector("#firstSide");
const secondSide = document.querySelector("#secondSide");
const cats = document.querySelectorAll(".fighter-box");
const buttons = document.querySelectorAll("button");
const fightButton = document.querySelector("#generateFight");
const randomFightButton = document.querySelector("#randomFight");
const addnewBtn = document.querySelector("form input");
const editBtn = document.querySelector("#editCat");
let message = document.querySelector(".container .message");
let side,
    img,
    id,
    name,
    age,
    catInfo,
    record,
    wins,
    loss,
    total,
    percentage,
    firstFighter,
    secondFighter,
    infoCat,
    winner,
    loser,
    winnerObj,
    loserObj;

const BoxInfo = {
  first: {
    id: firstSide.querySelector(".cat-info .id"),
    nameInfo: firstSide.querySelector(".cat-info .name"),
    ageInfo: firstSide.querySelector(".cat-info .age"),
    skillsInfo: firstSide.querySelector(".cat-info .skills"),
    winsInfo: firstSide.querySelector(".cat-info .record .wins"),
    lossInfo: firstSide.querySelector(".cat-info .record .loss"),
    image: firstSide.querySelector(
        ".featured-cat-fighter .featured-cat-fighter-image"
    ),
  },
  second: {
    id: secondSide.querySelector(".cat-info .id"),
    nameInfo: secondSide.querySelector(".cat-info .name"),
    ageInfo: secondSide.querySelector(".cat-info .age"),
    skillsInfo: secondSide.querySelector(".cat-info .skills"),
    winsInfo: secondSide.querySelector(".cat-info .record .wins"),
    lossInfo: secondSide.querySelector(".cat-info .record .loss"),
    image: secondSide.querySelector(
        ".featured-cat-fighter .featured-cat-fighter-image"
    ),
  },
};

const catFightObj = new catFight();
catFightObj.init();

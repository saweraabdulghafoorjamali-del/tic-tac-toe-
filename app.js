const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const msg = document.querySelector("#msg");

let turnX = true; // true yani Player X ki baari, false yani Player O ki baari
let count = 0; // Draw check karne ke liye total moves count karenge

// Winning Patterns (Jeetne ke saare 8 tareeqe)
const winPatterns = [
  [0, 1, 2], // Rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // Columns
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // Diagonals
  [2, 4, 6]
];

// Saare boxes par click listener lagana
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnX) {
      box.innerText = "X";
      box.classList.add("x-color"); // X ko blue color dene ke liye class add ki
      msg.innerText = "Player O's Turn";
      turnX = false;
    } else {
      box.innerText = "O";
      msg.innerText = "Player X's Turn";
      turnX = true;
    }
    
    box.disabled = true; // Ek baar click hone ke baad box ko lock kar diya
    count++;

    let isWinner = checkWinner();

    // Agar 9 moves ho gaye aur koi nahi jeeta, toh game Draw hai
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

// Game Draw hone par
const gameDraw = () => {
  msg.innerText = "Game was a Draw!";
  msg.style.color = "#94a3b8";
};

// Winner check karne ka function
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    // Check karo ki teeno boxes khali toh nahi hain aur teeno me same value hai ya nahi
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
  return false;
};

// Winner announce karne aur baaki boxes ko block karne ka function
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}! 🎉`;
  msg.style.color = "#22c55e"; // Green color for winner
  disableBoxes();
};

// Jeetne ke baad bache hue boxes ko disable karna
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// Game reset karne ka function
const resetGame = () => {
  turnX = true;
  count = 0;
  msg.innerText = "Player X's Turn";
  msg.style.color = "#38bdf8";
  
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("x-color");
  }
};

// Reset button par click event lagana
resetBtn.addEventListener("click", resetGame);
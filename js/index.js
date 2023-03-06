let context; // define context outside startGame()

window.onload = () => {
  // Set the start button to trigger the startGame function when clicked
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  let myGameArea = {
    canvas: document.getElementById("canvas"),
    start: function () {
      this.context = this.canvas.getContext("2d");
      this.frames = 0;
      window.requestAnimationFrame(updateCanvas);
    },
    clear: function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    score: function () {
      const points = Math.floor(this.frames / 5);
      this.context.font = '18px serif';
      this.context.fillStyle = 'black';
      this.context.fillText(`Score: ${points}`, 350, 50);
    },
  };
  
  // Call the start function when the Start button is clicked

  function startGame() {
    // Get the canvas element and its context
    let canvas = document.getElementById("canvas");
    context = canvas.getContext("2d"); // assign context inside startGame()

    // Load the road image and draw it on the canvas
    let roadImg = new Image();
    roadImg.onload = function () {
      // Draw the image at (0,0) with the width and height of the canvas
      context.drawImage(roadImg, 0, 0, canvas.width, canvas.height);
    };
    roadImg.src = "images/road.png";

    // Set up the car object with its image and starting position
    let car = {
      img: new Image(),
      x: canvas.width / 2 - 25, // Starting position is centered at the bottom of the canvas
      y: canvas.height - 100,
      speed: 1, // Set the car's speed (pixels per frame)
    };
    car.img.src = "images/car.png";

    // Listen for arrow key events to move the car
    document.addEventListener("keydown", (event) => {
      if (event.code === "ArrowLeft") {
        // Move the car left, but make sure it stays within the canvas bounds
        if (car.x - car.speed > 0) {
          car.x -= car.speed;
        } else {
          car.x = 0;
        }
      } else if (event.code === "ArrowRight") {
        // Move the car right, but make sure it stays within the canvas bounds
        if (car.x + car.speed < canvas.width - 50) {
          car.x += car.speed;
        } else {
          car.x = canvas.width - 50;
        }
      }
    });

    // Set up obstacle components
    class Component {
      constructor(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.update = function () {
          context.fillStyle = this.color;
          context.fillRect(this.x, this.y, this.width, this.height);
        };
      }
    }

    // Draw the car on the canvas
    function drawCar() {
      context.drawImage(car.img, car.x, car.y, 50, 100);
    }

    // update the obstacles array
    const myObstacles = [];
    function updateObstacles() {
      myGameArea.frames += 1;
      if (myGameArea.frames % 120 === 0) {
        let x = myGameArea.canvas.width;
        let minHeight = 20;
        let maxHeight = 200;
        let height = Math.floor(
          Math.random() * (maxHeight - minHeight + 1) + minHeight
        );
        let minGap = 50;
        let maxGap = 200;
        let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        myObstacles.push(new Component(10, height, "green", x, 0));
        myObstacles.push(
          new Component(10, x - height - gap, "green", x, height + gap)
        );
      }
      for (let i = 0; i < myObstacles.length; i++) {
        myObstacles[i].x -= car.speed;
        myObstacles[i].update();
      }
    }
    
    
  }
  function updateCanvas() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the road
    context.drawImage(roadImg, 0, 0, canvas.width, canvas.height);

    // Draw the car
    drawCar();

    // Update the obstacles
    updateObstacles();

    // Request the next animation frame
    window.requestAnimationFrame(updateCanvas);
    //update the score
    startGame.score ();
  }
};

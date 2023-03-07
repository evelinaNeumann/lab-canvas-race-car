window.onload = () => {
  let canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");
  let roadImg = new Image();
  roadImg.onload = function () {
    context.drawImage(roadImg, 0, 0, canvas.width, canvas.height);
  };
  roadImg.src = "images/road.png";

  let myGameArea = {
    canvas: canvas,
    context: context,
    frames: 0,
    score: function () {
      const points = Math.floor(this.frames / 5);
      this.context.font = '18px serif';
      this.context.fillStyle = 'black';
      this.context.fillText(`Score: ${points}`, 350, 50);
    },
  };

  let car = {
    img: new Image(),
    x: canvas.width / 2 - 25,
    y: canvas.height - 100,
    speed: 1,
  };
  car.img.src = "images/car.png";

  let myObstacles = [];

  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") {
      if (car.x - car.speed > 0) {
        car.x -= car.speed;
      } else {
        car.x = 0;
      }
    } else if (event.code === "ArrowRight") {
      if (car.x + car.speed < canvas.width - 50) {
        car.x += car.speed;
      } else {
        car.x = canvas.width - 50;
      }
    }
  });

  function drawCar() {
    context.drawImage(car.img, car.x, car.y, 50, 100);
  }

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

  function updateCanvas() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    // Draw the road
    context.drawImage(roadImg, 0, 0, canvas.width, canvas.height);
  
    // Draw the car
    drawCar();
  
    // Update the obstacles
    updateObstacles();
  
    // Update the score
    myGameArea.score();
  
    // Request the next animation frame
    window.requestAnimationFrame(updateCanvas);
  }
  
  function startGame() {
    window.requestAnimationFrame(updateCanvas);
  }
  
  // Call startGame() to start the game
  startGame();
}

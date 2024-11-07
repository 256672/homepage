//CLOCK SCRIPT
function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML =  h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
   }
   
   function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

//POST-IT NOTE SAVE (JAVASCRIPT)
if (localStorage["note"]) {
    var note = localStorage["note"];
    document.getElementById("note").value = note;
 }
  
 function autoSave() {
    var note = document.getElementById("note").value;
    localStorage.setItem("note", note);
 }
 
 //POST-IT NOTE SHOW AND HIDE
 var show = false;
 function showNote(){
    if (show == false){
        document.getElementById("note").style.opacity = 1;
        show = true;
    }
    else if (show == true){
        document.getElementById("note").style.opacity = 0;
        show = false;
    }
 }
 //CALCULATOR (JAVASCRIPT)
var showCalc = false;
function showCalculator(){
   if (showCalc == false){
       document.getElementById("calc").style.opacity = 1;
       showCalc = true;
   }
   else if (showCalc == true){
       document.getElementById("calc").style.opacity = 0;
       showCalc = false;
   }
}


//Embers
const canvas = document.getElementById('embersCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const embers = [];
    const emberCount = 200;

    // Ember particle settings
    const emberSettings = {
        maxSize: 4,
        minSize: 1,
        maxSpeed: 7,
        minSpeed: 0.5,
        color: 'rgba(255, 69, 0, 0.7)', // Orange-red color with transparency
    };

    // Adjust canvas size on resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Ember particle class
    class Ember {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 100;
            this.size = emberSettings.minSize + Math.random() * (emberSettings.maxSize - emberSettings.minSize);
            this.speed = emberSettings.minSpeed + Math.random() * (emberSettings.maxSpeed - emberSettings.minSpeed);
            this.opacity = 1;
            this.fadeRate = Math.random() * 0.02 + 0.005;
            this.color = emberSettings.color;
        }

        update() {
            this.y -= this.speed;
            this.opacity -= this.fadeRate;
            if (this.opacity <= 0) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color.replace('0.7', this.opacity.toFixed(2)); // Adjust opacity
            ctx.fill();
        }
    }

    // Create initial embers
    for (let i = 0; i < emberCount; i++) {
        embers.push(new Ember());
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        embers.forEach(ember => {
            ember.update();
            ember.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
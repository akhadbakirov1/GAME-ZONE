'use strict';

let requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function animate(draw, duration) {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        let timePassed = time - start;
        if (timePassed > duration) timePassed = duration;
        draw(timePassed);
        if (timePassed < duration) {
            requestAnimationFrame(animate);
        }
    });
}

function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };

}

let raccoon = document.getElementById('js-raccoon');

animate(function(timePassed) {
    raccoon.style.bottom = -30 + timePassed / 100 + '%';
}, 4000);

raccoon.onmousedown = function(e) {

    let coords = getCoords(raccoon),
        shiftX = e.pageX - coords.left,
        shiftY = e.pageY - coords.top;

    function moveAt(e) {
        raccoon.style.left = e.pageX - shiftX + 'px';
        raccoon.style.top = e.pageY - shiftY + 'px';
    }

    document.onmousemove = function(e) {
        moveAt(e);
    };

    raccoon.onmouseup = function() {
        document.onmousemove = null;
        raccoon.onmouseup = null;
    };

}

raccoon.ondragstart = function() {
    return false;
};

/*
 * Making falling text
 */

let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = canvas.width,
    height = canvas.height;


let mp = 25; //max dropElems

let dropElems = [];

let fontSize = function() {
  return Math.floor(Math.random() * (18 - 10)) + 10;
};

for (let i = 0; i < mp; i++) {
    dropElems.push({
        x: Math.random() * W, //x-coordinate
        y: Math.random() * H, //y-coordinate
        d: Math.random() * mp //density
    })
}

                    function draw()
                    {
                    	//Black BG for the canvas
                    	//translucent BG to show trail
                    	ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
                    	ctx.fillRect(0, 0, c.width, c.height);

                    	ctx.fillStyle = "#0F0"; //green text
                    	ctx.font = font_size + "px arial";
                    	//looping over drops
                    	for(var i = 0; i < drops.length; i++)
                    	{
                    		//a random chinese character to print
                    		var text = chinese[Math.floor(Math.random()*chinese.length)];
                    		//x = i*font_size, y = value of drops[i]*font_size
                    		ctx.fillText(text, i*font_size, drops[i]*font_size);

                    		//sending the drop back to the top randomly after it has crossed the screen
                    		//adding a randomness to the reset to make the drops scattered on the Y axis
                    		if(drops[i]*font_size > c.height && Math.random() > 0.975)
                    			drops[i] = 0;

                    		//incrementing Y coordinate
                    		drops[i]++;
                    	}


function draw() {
    ctx.fillText = ('Catch me if you can', );
    ctx.font = fontSize + 'px cursive Righteous';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

    for (let i = 0; i < mp; i++) {
        let elem = dropElems[i];
        ctx.moveTo(elem.x, elem.y);
    }
    for (let i = 0; i < dropText.length; i++)
    {
      //a random chinese character to print
      let text = dropText[Math.floor(Math.random()*dropText.length)];
      //x = i*font_size, y = value of drops[i]*font_size
      ctx.fillText(text, i * fontSize, dropText[i] * fontSize);

      //sending the drop back to the top randomly after it has crossed the screen
      //adding a randomness to the reset to make the drops scattered on the Y axis
      if (dropText[i] * fontSize > height && Math.random() > 0.975)
        dropText[i] = 0;

      //incrementing Y coordinate
      dropText[i]++;
    }
    // update();
}


// function update() {
//     for (let i = 0; i < mp; i++) {
//         let p = dropElems[i];
//         //Updating X and Y coordinates
//         //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
//         //Every particle has its own density which can be used to make the downward movement different for each flake
//         //Lets make it more random by adding in the radius
//         p.y += Math.cos(p.d) + 1 / 2;
//
//         //Sending flakes back from the top when it exits
//         //Lets make it a bit more organic and let flakes enter from the left and right also.
//         if (p.x > W + 5 || p.x < -5 || p.y > H) {
//             if (i % 3 > 0) //66.67% of the flakes
//             {
//                 dropElems[i] = {
//                     x: Math.random() * W,
//                     y: -10,
//                     d: p.d
//                 };
//             } else {
//                 //Enter from the right
//                 dropElems[i] = {
//                     x: W + 5,
//                     y: Math.random() * H,
//                     d: p.d
//                 };
//             }
//         }
//     }
// }
// }

//animation loop
setInterval(draw, 33);

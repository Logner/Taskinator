var counter = 10
var countdown = function() {
    console.log(counter);
    counter --;
    if (counter===0){
        console.log("blastoff");

        // Clears interval of the startCoundown variable
        clearInterval(startCountdown)
    };
};
// setInterval (func, milliseconds)
// why does adding brackets to countdown() only trigger the function once.
var startCountdown = setInterval(countdown, 1000);

// setTimeOut counter
var sayHello = function(){
    console.log("Hello There");
};

var timedGreeting = setTimeout(sayHello, 2000);

// clearTimeout(timedGreeting);
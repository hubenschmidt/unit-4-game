$(document).ready(function () {

    var scoreCounter;
    var wins;
    var losses;
    var imgArray = [
        "assets/images/frogs.jpg",
        "assets/images/goldbears.jpg",
        "assets/images/peaches.png",
        "assets/images/smurfs.jpg",
    ];

    //set up game
    configureGame();
    resetTargetAndScore();
    configureImages(generateRandomNumbers(), true)

    //reset global variables function
    function configureGame() {
        scoreCounter = 0; //track user's total
        wins = 0;
        losses = 0;
    };

    function resetTargetAndScore() {
        targetNumber = Math.floor(Math.random() * 101) + 19;
        $("#targetNumber").text(targetNumber);
        scoreCounter = 0;
    }

    //return 4 numbers in the form of an array
    function generateRandomNumbers() {
        var n = [];
        for (var i = 0; i < 4; i++) {
            n.push(Math.floor(Math.random() * 9) + 1);
        }
        return n;
    }

    function gameOver() {
        configureGame();
        configureImages(generateRandomNumbers(), false)
    };

    function configureImages(randomNumbers, shouldAppendImage) {
        //assign attributes to image array
        if (shouldAppendImage) {
            imgArray.forEach(function (element, index) {
                var $image = $("<img>");
                $image.addClass("haribo-image");
                $image.attr("src", imgArray[index]);
                $("#images").append($image);
            })
        }

        var imageItems = $("#images img")
        imgArray.forEach(function (element, index) {
            imageItems[index].setAttribute("data-haribovalue", randomNumbers[index]);
        })
    }

    //display results back to the user
    $(".haribo-image").on("click", function () {
        var hariboValue = ($(this).attr("data-haribovalue"));
        hariboValue = parseInt(hariboValue);
        scoreCounter += hariboValue;
        $("#scoreCounter").text(scoreCounter);

        //win/lose logic
        if (scoreCounter === targetNumber) {
            wins++;
            resetTargetAndScore();

            if (wins >= 3) {
                alert("you win!");
                gameOver();
            }
        } else if (scoreCounter > targetNumber) {
            losses++;
            resetTargetAndScore();

            if (losses >= 3) {
                gameOver();
            }
        }

        $("#winsNumber").text(wins);
        $("#lossesNumber").text(losses);
    });

});
var inquirer = require('inquirer');

var basicCardsArr = [];

function basicCards(front, back) {
    this.front = front;
    this.back = back;
}

inquirer.prompt([{
    name: "howManyCards",
    message: "How many flashcards would you like to create?"

}]).then(function(answer) {

    console.log("================================================");
    var numberOfCards = answer.howManyCards;
    var counter = 0

    function getCardData() {
        if (counter < numberOfCards) {
            inquirer.prompt([{
                name: "front",
                message: "What is the question?",
            }, {
                name: "back",
                message: "What is the answer?"
            }]).then(function(answerObj) {
                var card = new basicCards(answerObj.front, answerObj.back);
                basicCardsArr.push(card);
                counter++;
                getCardData();
            });
        } else {
            console.log("================================================");
            console.log("NOW, REPEAT THAT BACK TO ME!");
            console.log("================================================");

            var quizCounter = 0;
            var correctAnswers = 0;
            var wrongAnswers = 0;
            var i = 0;

            function giveQuiz(i) {
                if (quizCounter < basicCardsArr.length) {
                    inquirer.prompt([{
                        name: "quizAnswer",
                        message: basicCardsArr[i].front
                    }]).then(function(quizAnswerObj) {

                        if (quizAnswerObj.quizAnswer.toUpperCase() === basicCardsArr[i].back.toUpperCase()) {
                            console.log("You are correct!");
                            console.log("------------------------------------------------");
                            correctAnswers++;
                        } else {
                            console.log("Nope! The correct answer is " + basicCardsArr[i].back.toUpperCase() + ".");
                            console.log("------------------------------------------------");
                            wrongAnswers++;
                        }

                        quizCounter++;
                        i++;
                        giveQuiz(i);
                    });
                } else {
                    console.log("CORRECT ANSWERS: ", correctAnswers);
                    console.log("WRONG ANSWERS: ", wrongAnswers);
                    console.log("================================================");
                }
            }
            giveQuiz(i);
        }
    }
    getCardData();
});

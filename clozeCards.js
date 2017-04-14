var inquirer = require('inquirer');

var clozeCardsArr = [];

function clozeCards(fullText, cloze) {
    this.fullText = fullText;
    this.cloze = cloze;
    this.convertText = function() {
        if(this.fullText.toUpperCase().includes(this.cloze.toUpperCase())){
            partialText = this.fullText.replace(this.cloze, ".....");
            return partialText; 
        }
    };
    this.partialText = this.convertText();
}

inquirer.prompt([{
    name: "howManyCards",
    message: "How many flashcards would you like to create?"

}]).then(function(answer) {

    console.log("================================================");
    var numberOfCards = answer.howManyCards;
    var counter = 0

    function getCardData() {
        var input = "";
        if (counter < numberOfCards) {
            inquirer.prompt([
                {
                    name: "fullText",
                    message: "What is your full statement?",
                    validate: function(value) {
                        if (value) {
                            input = value;
                            return true;
                        }else{
                            return false;
                        }
                    }
                }, 
                {
                    name: "cloze",
                    message: "What word would you like to omit?",
                    validate: function(value) {
                        if (input.toUpperCase().includes(value.toUpperCase())) {
                            return true;
                        }else{
                            console.log("\nOops! Can't omit something that's not there.")
                            return false;
                        }
                    }
                }
            ]).then(function(answerObj) {
                var card = new clozeCards(answerObj.fullText, answerObj.cloze);
                clozeCardsArr.push(card);
                counter++;
                getCardData();
            });
        } else {
            console.log("================================================");
            console.log("NOW, HELP ME FINISH MY SENTENCES!");
            console.log("================================================");

            var quizCounter = 0;
            var correctAnswers = 0;
            var wrongAnswers = 0;
            var i = 0;

            function giveQuiz(i) {
                if (quizCounter < clozeCardsArr.length) {
                    inquirer.prompt([{
                        name: "quizCloze",
                        message: clozeCardsArr[i].partialText
                    }]).then(function(quizAnswerObj) {

                        if (quizAnswerObj.quizCloze.toUpperCase() === clozeCardsArr[i].cloze.toUpperCase()) {
                            console.log("You are correct!");
                            console.log("------------------------------------------------");
                            correctAnswers++;
                        } else {
                            console.log("Nope! The correct answer is: '" + clozeCardsArr[i].partialText.replace(".....", clozeCardsArr[i].cloze.toUpperCase()) + "'");
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

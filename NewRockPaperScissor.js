/*update the score and save it in a variable. Can use varable or object.Every time we make a move need to 
update the score from last time.In order to save the score from last time we need to KEEP THIS OUTSIDE 
OF THE FUNCTION.. If it wsas inside the func the func will create new score every time. */ 
        /*const score ={      //always setting the score to 0
            win: 0,
            losses: 0,
            ties: 0
        };*/

        //This Is a string which need to be convert back to object -console.log(localStorage.getItem('score'));example    //getItem gets a value out of a local storage, wiil get the value 'hello' we save earlier in web browser console
        /*let  score=JSON.parse(localStorage.getItem('score'));

        if(!score){
        //if(score === null){     //!score same as score === null(falsy value), !score means falsy value, falsy value has null,0,undefined
          score={
            wins: 0,
            losses: 0,
            ties: 0
          }
        };*/        //OR

        //using || operator shorter way
        let  score=JSON.parse(localStorage.getItem('score')) || {
            win: 0,
            losses: 0,
            ties: 0
          };
          updateScore();
          
        let isAutoPlaying = false;
        let intervalId ; 

        function autoPlay() {
            if(!isAutoPlaying){
                intervalId = setInterval (() => {       // setInterval returns a number, we can use it to stop the interval
                    const playerMove = pickComputerMove();
                    playGame(playerMove);
                },1000);
                isAutoPlaying = true;
            }else{
                clearInterval(intervalId);
                isAutoPlaying = false;
            }
        }

        // addEventListener will not be used if onclick is used
        document.querySelector('.js-rock-button')
        .addEventListener('click' , () => {
            playGame('rock');
        });
        document.querySelector('.js-paper-button')
        .addEventListener('click' , () => {
            playGame('paper');
        });
        document.querySelector('.js-scissor-button')
        .addEventListener('click' , () => {
            playGame('scissor');
        })

        // document.body.addEventListener('keydown' , () => {
        //     console.log('keydown');
        // })   // will listen to any key pressed on keyboard and print keydown

        // document.body.addEventListener('keydown' , (event) => {
        //     console.log(event.key);
        // })   // will listen to specific key pressed on keyboard nd orint the key

        document.body.addEventListener('keydown' , (event) => {
            if (event.key === 'r'){
                playGame('rock')
            }else if (event.key === 'p') {
                playGame('paper')
            }else if(event.key === 's'){
                playGame('scissor')
            }
        });
        function playGame(playerMove){
            const computerMove = pickComputerMove();  //return computerMove wiil come here

        let result='';
        if(playerMove === 'scissor'){
            if( computerMove ==='rock'){
            result='You Loose.';
        }else if(computerMove === 'paper'){
            result='You Win.';
        }else if(computerMove ==='scissor'){
            result='Tie.';
        }
        }else if(playerMove === 'paper'){
            if( computerMove ==='rock'){
                result='You Win.';
            }else if(computerMove === 'paper'){
                result='Tie.';
            }else if(computerMove ==='scissor'){
                result='You Loose.';
            }
        }else if(playerMove === 'rock'){
            if( computerMove ==='rock'){
                result='Tie.';
            }else if(computerMove === 'paper'){
                result='You Loose.';
            }else if(computerMove ==='scissor'){
                result='You Win.';
            }
        }
        //This is how we increase the wins property in the score object by 1
        if(result === 'You Win.'){
            score.win +=1;
        }else if(result === 'You Loose.'){
            score.losses += 1;
        }else if(result === 'Tie.'){
            score.ties += 1;
        }
        updateScore();
        //every time When the web browser will be reloaded, all the values will be deleted So we have to store it in a local storage.//must contain string
        //localStorage.setItem('message' , 'hello');example      //message is name and hello is value here will use latter.//will run all the above code and save the string in the local storage
        localStorage.setItem('score',JSON.stringify(score));     //coverting object score to string becoz localStorage supports only string.


        document.querySelector('.js-result').innerHTML=result;
        document.querySelector('.js-moves').innerHTML=` You
        <img src="${playerMove}-emoji.png" class="move-icon">
        <img src="${computerMove}-emoji.png" class="move-icon">
        Computer`;
        }
        function updateScore(){
            document.querySelector('.js-score').innerHTML=`Wins: ${score.win} , Losses: ${score.losses} , Ties: ${score.ties}`;

        }

        function pickComputerMove() {


        const randomNumber = Math.random();

        let computerMove = '';  

        if (randomNumber >= 0 && randomNumber < 1 / 3) {
            computerMove = 'rock';
        } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
            computerMove = 'paper';
        } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
            computerMove = 'scissor';
        }
        return computerMove;   //Return statement let us get a value outside of a function 
    }

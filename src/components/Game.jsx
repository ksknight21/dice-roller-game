import { propTypes } from 'formsy-react';
import React, { Component, useState } from 'react';
import '../App.css';

function Game() {


    //**************************************//
    //Initialisation / Var Declaration
    //**************************************//
    //Player One
    const [turnScore, setTurnScore] = useState(0);                       //Turn Score
    const [throwScore, setThrowScore] = useState(1);                     //Throw Score
    const [maxDice, setMaxDice] = useState(10);                          //Max number of dice available to throw
    const [currentPlayer, setCurrentPlayer] = useState(1);               //Current Player
    const [bankOne, setBankOne] = useState(0);                           //Bank Score - Player One
    const [bankTwo, setBankTwo] = useState(0);                           //Bank Score - Player Two
    const [bank, setBank] = useState(0);                                 //Bank Score
    const dieImage = require(`../assets/${throwScore}.png`);             //Die Image

    //Use effect to update state instantly for currentPlayer and bankscores.
    React.useEffect(() => {
        setCurrentPlayer(currentPlayer)
        if(currentPlayer === 1){
            setBankOne(bankOne)            
            setBank(bankOne)
        }
        else{
            setBankTwo(bankTwo)            
            setBank(bankTwo)
        }
    }, [bank,bankOne,bankTwo,currentPlayer]);

    //Toggle (To determine which players go it is)
    const [isToggled, setIsToggled] = React.useState(true);            //Var to determine which players go
    const toggle = React.useCallback(() => setIsToggled(!isToggled));   //Logic to help set toggle

    //**************************************//
    //Functions
    //**************************************//

    //Simulate rolling of the dice and game logic included.
    function rollDice() {

        //Update die Count to count for this roll
        setMaxDice(maxDice - 1);

        //Check if the player has any remaining dice
        if (maxDice != 0) {

            //Create random int between 1 and 6
            let calc = Math.floor(Math.random() * 6) + 1; 
            setThrowScore(calc); //Update throwScore with generated int

            //Check that a 1 or 6 has not been rolled, as these won't count towards score
            if (calc != 1 && calc != 6) {

                //Update throw score, turn score and the current players bank
                setThrowScore(calc);
                setTurnScore(turnScore + calc);

                //Update the bank depending on the current player
                if(currentPlayer===1){
                    setBankOne(bankOne + calc);
                    setBank(bankOne + calc);
                }
                else{
                    setBankTwo(bankTwo + calc);
                    setBank(bankTwo + calc);
                }

                //If the players bank score (Inclusive of current throw) is 200+ then the player wins
                if(bank + calc >= 200){
                    alert("Player " + currentPlayer + " has won the game");
                }
                
            }
        }
        //If no remaining die throws end, ask player to end their go.
        else{
            setMaxDice(0);
            alert("Your turn has ended, Please press End Turn");
        }

    }

    //Return a player component
    function Player() {
        return (
            <div className="PlayerStats">
                <div>Player: {currentPlayer}</div>
                <div>Bank: {bank}</div>
                <div>Turn Score: {turnScore}</div>
                <div>Die remaining: {maxDice}</div>
            </div>
        )
    }

    //Switch player turns
    function endTurn() {
        setMaxDice(10);
        setIsToggled(!isToggled);
        setCurrentPlayer(!isToggled ? 1 : 2);
        setThrowScore(1);
        setTurnScore(0);
    }


    //**************************************//
    //Main Game Component
    //**************************************//
    return (
        <div>

            

            {/*Store the game in a header*/}
            <header className="Game-Board">

            <Player className="Player" data={currentPlayer} />

                {/*Container for the die image. Inline CSS*/}
                <div style={{ display: 'flex', margin: 20 }}>
                    <img src={dieImage} className="die" alt="Die one" />
                </div>

                {/*Container for the die value*/}
                <span data-status={throwScore} className="DieValue">{throwScore}</span>

                {/*Buttons to either roll the dice or end the current players turn*/}
                <span>
                    <button className="button" onClick={rollDice}>Roll</button>
                    <button className="button" onClick={endTurn}>End Turn</button>
                </span>
            </header>

        </div>
    );
}


//Format numbers
Game.propTypes = {
    bank: propTypes.number,
    throwScore: propTypes.number,
    turnScore: propTypes.number
}







export default Game;
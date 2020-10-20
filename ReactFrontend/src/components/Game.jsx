import { propTypes } from 'formsy-react';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import '../App.css';
import axios from 'axios';
import Slider from './Slider';


function Game() {



    //**************************************//
    //Initialisation / Var Declaration
    //**************************************//
    const [turnScore, setTurnScore] = useState(0);                       //Turn Score
    const [throwScore, setThrowScore] = useState(0);                     //Throw Score
    const [maxDice, setMaxDice] = useState(10);                          //Max number of dice available to throw
    const [currentPlayer, setCurrentPlayer] = useState(1);               //Current Player
    const [bankOne, setBankOne] = useState(0);                           //Bank Score - Player One
    const [bankTwo, setBankTwo] = useState(0);                           //Bank Score - Player Two
    const [bank, setBank] = useState(0);                                 //Bank Score
    const dieImage = require(`../assets/${5}.png`);                      //Die Image
    const [dieResults, setDieResults] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); //Die Results
    const [maxScore, setMaxScore] = useState(200);                       //Max Score

    //Use effect to update state instantly (Effectively like did component update/mount etc...
    //Handler for when dieResults is updated
    useLayoutEffect(() => {

        //Update die Count to count for this roll
        var countOfOneAndSix = 0;
        var ii;
        var arrayLength = dieResults.length;
        var roundScore = 0;
        for (ii = 0; ii < arrayLength; ii++) {

            var dieVal = dieResults[ii];
            if (dieVal == 1 || dieVal == 6) {
                countOfOneAndSix = countOfOneAndSix + 1;
            }
            else {
                roundScore += dieVal;
            }
        }
        setMaxDice(maxDice - countOfOneAndSix);
        setThrowScore(roundScore);

        //put data to API at this point, as this is where the component did update stage.
        put(currentPlayer, bank, turnScore, maxDice, turnScore);

    }, [dieResults]);

    //handler for when throwscore is updated
    useEffect(() => {

        //Check if the player has dice remaining, because if not score doesnt count
        if (maxDice >= 0) {
            setTurnScore(turnScore + throwScore);
        } else {
            setTurnScore(0);
        }

        //put data to API at this point, as this is where the component did update stage.
        put(currentPlayer, bank, turnScore, maxDice, turnScore);

        //call api to get data. rolling dice in call so that we can use the response below
        axios.get('http://localhost:8080/api/v1/person').then((response) => {

            //Output the API data in console
            console.log(response.data[0]);
            console.log(response.data[1]);

        }, (error) => {
            console.log(error);
        });

    }, [throwScore]);

    //handler for when player one or two's bank is updated
    useEffect(() => {

        if (currentPlayer == 1) {
            setBank(bankOne);
            if (bankOne >= maxScore) {
                alert("Player " + 1 + " has won the game!");
            }
        } else {
            setBank(bankTwo);
            if (bankTwo >= maxScore) {
                alert("Player " + 2 + " has won the game!");
            }
        }

        //put data to API at this point, as this is where the component did update stage.
        put(currentPlayer, bank, turnScore, maxDice, turnScore);

    }, [bankOne, bankTwo]);



    //Toggle (To determine which players go it is)
    const [isToggled, setIsToggled] = React.useState(true);            //Var to determine which players go

    //**************************************//
    //Functions
    //**************************************//    

    //Simulate rolling of the dice and game logic included.
    function rollDice() {


        //Check if the player has any remaining dice
        if (maxDice > 0) {

            //create an array for each die result the player has available
            let dieArray = [];
            var i;
            //First add how ever many die's the user has left
            for (i = 0; i < maxDice; i++) {
                dieArray.push(Math.floor(Math.random() * 6) + 1);
            }
            //populate the rest of the array with zeroes
            for (i = dieArray.length; i <= 10; i++) {
                dieArray.push(0);
            }

            //Update vars
            setDieResults(dieArray);

        }
        //If no remaining die throws end, ask player to end their go.
        else {
            setMaxDice(0);
            alert("No remaining die left, you have lost your points");
            setTurnScore(0);
        }


    }

    //Return a player component
    function Player() {
        return (
            <div className="PlayerStats">
                <div>Player: {currentPlayer}</div>
                <div>Turn Score: {turnScore}</div>
                <div>Die remaining: {maxDice}</div>
            </div>
        )
    }

    //Switch player turns
    function endTurn() {

        //Check if the player has any rolls left, if not then don't update bank
        if (maxDice > 0) {

            if (currentPlayer == 1) {
                setBankOne(bankOne + turnScore)
            } else {
                setBankTwo(bankTwo + turnScore);
            }
            alert("Next players go");
        } else {
            alert("You have run out of die, no score. Next players go");
        }

        //Reset vars for player two
        setMaxDice(10);
        setIsToggled(!isToggled);
        setCurrentPlayer(!isToggled ? 1 : 2);
        setThrowScore(0);
        setTurnScore(0);
    }

    //Post method to post player stats
    function post(playerName, playerBank, playerThrowScore, playerMaxDice, playerTurnScore) {
        axios.post('http://localhost:8080/api/v1/person', {
            headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Credentials': true },
            name: playerName,
            bank: playerBank,
            throwScore: playerThrowScore,
            maxDice: playerMaxDice,
            turnScore: playerTurnScore
        })
            .then((response) => {
                //console.log(response);
            }, (error) => {
                alert("Could not connect to API, see console for more detail");
                console.log(error)
            });

    }

    //Post method to post player stats
    function deletePlayer(playerName) {
        axios.delete('http://localhost:8080/api/v1/person/' + currentPlayer, {
            headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Credentials': true },
            name: playerName,
        })
            .then((response) => {
                //console.log(response);
            }, (error) => {
                alert("Could not connect to API, see console for more detail");
                console.log(error)
            });

    }

    //Get method to API to view current player stats

    //Put method to API to update current player stats
    function put(playerName, playerBank, playerThrowScore, playerMaxDice, playerTurnScore) {
        axios.put('http://localhost:8080/api/v1/person/' + currentPlayer, {
            headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Credentials': true },
            name: playerName,
            bank: playerBank,
            throwScore: playerThrowScore,
            maxDice: playerMaxDice,
            turnScore: playerTurnScore
        })
            .then((response) => {
                //console.log(response);
            }, (error) => {
                alert("Could not connect to API, see console for more detail");
                console.log(error)
            });

    }

    const onChangeSlider = e => {
        setMaxScore(parseInt(e.target.value, 10));
    }

    //post player one and two into the api on initialisation
    post(1, bank, throwScore, maxDice, turnScore);
    post(2, bank, throwScore, maxDice, turnScore);
    put(1, bank, throwScore, maxDice, turnScore);
    put(2, bank, throwScore, maxDice, turnScore);

    //**************************************//
    //Main Game Component
    //**************************************//
    return (
        <div>

            <div className="Banks">
                <div className="Bank">Player 1 Bank: {bankOne}</div>
                <div className="BankTwo">Player 2 Bank: {bankTwo}</div>
            </div>

            {/*Store the game in a header*/}
            <header className="Game-Board">

                {/*Slider for the max score*/}
                <div className="App">
                    <div className="App-header">
                        <div className="GoalScore">Goal Score:</div>
                        <Slider
                            min={20}
                            max={1000}
                            step={1}
                            defaultLength={maxScore}
                            value={maxScore}
                            onChangeValue={onChangeSlider}
                            linearGradientColor="#4aa1f3"
                            rangeBackgroundColor="#d7dcdf"
                            sliderThumbColor="#4aa1f3"
                        />
                    </div>
                </div>

                {/* Player vars*/}
                <Player className="Player" data={currentPlayer} />

                {/*Container for the die image. Inline CSS*/}
                <div className="allDie">
                    <div style={{ display: 'flex', margin: 20 }}>
                        <img src={require(`../assets/${dieResults[0]}.png`)} className="die" alt="Die one" />
                    </div>
                    {/*Container for the die value*/}
                    <span data-status={dieResults[0]} className="DieValue">{dieResults[0]}</span>
                    <div style={{ display: 'flex', margin: 20 }}>
                        <img src={require(`../assets/${dieResults[1]}.png`)} className="die" alt="Die one" />
                    </div>
                    {/*Container for the die value*/}
                    <span data-status={dieResults[1]} className="DieValue">{dieResults[1]}</span>
                    <div style={{ display: 'flex', margin: 20 }}>
                        <img src={require(`../assets/${dieResults[2]}.png`)} className="die" alt="Die one" />
                    </div>
                    {/*Container for the die value*/}
                    <span data-status={dieResults[2]} className="DieValue">{dieResults[2]}</span>
                    <div style={{ display: 'flex', margin: 20 }}>
                        <img src={require(`../assets/${dieResults[3]}.png`)} className="die" alt="Die one" />
                    </div>
                    {/*Container for the die value*/}
                    <span data-status={dieResults[3]} className="DieValue">{dieResults[3]}</span>
                    <div style={{ display: 'flex', margin: 20 }}>
                        <img src={require(`../assets/${dieResults[4]}.png`)} className="die" alt="Die one" />
                    </div>
                    {/*Container for the die value*/}
                    <span data-status={dieResults[4]} className="DieValue">{dieResults[4]}</span>
                    <div style={{ display: 'flex', margin: 20 }}>
                        <img src={require(`../assets/${dieResults[5]}.png`)} className="die" alt="Die one" />
                    </div>
                    {/*Container for the die value*/}
                    <span data-status={dieResults[5]} className="DieValue">{dieResults[5]}</span>
                    <div style={{ display: 'flex', margin: 20 }}>
                        <img src={require(`../assets/${dieResults[6]}.png`)} className="die" alt="Die one" />
                    </div>
                    {/*Container for the die value*/}
                    <span data-status={dieResults[6]} className="DieValue">{dieResults[6]}</span>
                    <div style={{ display: 'flex', margin: 20 }}>
                        <img src={require(`../assets/${dieResults[7]}.png`)} className="die" alt="Die one" />
                    </div>
                    {/*Container for the die value*/}
                    <span data-status={dieResults[7]} className="DieValue">{dieResults[7]}</span>
                    <div style={{ display: 'flex', margin: 20 }}>
                        <img src={require(`../assets/${dieResults[8]}.png`)} className="die" alt="Die one" />
                    </div>
                    {/*Container for the die value*/}
                    <span data-status={dieResults[8]} className="DieValue">{dieResults[8]}</span>
                    <div style={{ display: 'flex', margin: 20 }}>
                        <img src={require(`../assets/${dieResults[9]}.png`)} className="die" alt="Die one" />
                    </div>
                    {/*Container for the die value*/}
                    <span data-status={dieResults[9]} className="DieValue">{dieResults[9]}</span>
                </div>

                {/*Buttons to either roll the dice or end the current players turn*/}
                <span>
                    <button className="button" onClick={rollDice}>Roll</button>
                    <button className="button" onClick={endTurn}>End Turn</button>
                </span>
            </header>

        </div>
    );
}


export default Game;
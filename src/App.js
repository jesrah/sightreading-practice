import React, { Component } from 'react';
import './App.css';
import CardList from './CardList';

//TO DO's: 
//Add version control (upload to Github)
//Add an option to add a custom time to the timer; must be sanitized to be a positive integer between 0 and 301
//Add an option to see all notes at once or display one or four notes at a time
//Add a view that shows only one card at a time, with a counter showing how many cards are left
//make it accessible (can tab through the notes)
//Add sanitized inputs for each one to get the right answer
//Build a high score board to keep track of fastest scores
//Add a blitz mode where it's as many notes as you can get in 1 minute, keep track of high score (most notes)
//Make it mobile friendly
//Upload to AWS and publish on website
//Add tests (the timer should stop at 0; hitting refresh should not run the timer; the notes are tabbable)

class App extends Component {
  constructor () {
    super();
    this.defaultTime = 101;
    this.cardsArray = ['Bass_A_High', 'Bass_A', 'Bass_B_High', 'Bass_B', 'Bass_C_High', 'Bass_C', 'Bass_D_High', 'Bass_D', 'Bass_E', 'Bass_F', 'Bass_F_High', 'Bass_G_High', 'Bass_G', 'Treble_A_Low', 'Treble_A_Mid', 'Treble_B', 'Treble_C_Low', 'Treble_C', 'Treble_D_Low', 'Treble_D', 'Treble_E_Low', 'Treble_E', 'Treble_F_Low', 'Treble_F', 'Treble_G_Mid', 'Treble_G' ];
    this.state = {
      timerStarted: false,
      seconds: this.defaultTime,
      cards: this.cardsArray,
      flippedCards: [],
    }
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.handleShuffle = this.handleShuffle.bind(this);
    this.handleCardFlip = this.handleCardFlip.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }


  handleClick() {
    console.log('click!')
  }
  //clicking on any card will start the timer
  startTimer() {
    // console.log('timerStarted is ', this.state.timerStarted)
    if (this.state.seconds > 0 && this.state.timerStarted === false) {
      this.setState({
        timerStarted: true,
      })
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({
      seconds: seconds,
    })

    if(seconds == -1) {
      clearInterval(this.timer);
      this.setState({
        timerStarted: false,
        seconds: this.defaultTime,
        flippedCards: [],
      })

    }
  }

  handleShuffle() {
    let array = this.state.cards.slice();
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    this.setState({
      cards: array,
    })
  }

  handleRefresh() {
    this.handleShuffle();
    this.setState({
      flippedCards: [],
      seconds: this.defaultTime,
    })
  }

  handleCardFlip(i) {

    let updatedFlippedCards = this.state.flippedCards.slice();

    if (updatedFlippedCards.indexOf(i) !== -1) {
      updatedFlippedCards.splice(updatedFlippedCards.indexOf(i), 1);
    } else {
      updatedFlippedCards.push(i);
    }
    this.setState({
      flippedCards: updatedFlippedCards,
    })
  }

  componentDidMount(){
    this.handleShuffle();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
            <h1 className="App-title lobster">Sightreading Practice</h1>
            <p>Guess the note and then flip the card. Can you guess all the notes before the clock runs out?
              <button className="timer" onClick={this.startTimer}>{this.state.seconds == -1 || this.state.seconds === this.defaultTime ? 'start' : this.state.seconds}</button>        
              <button className="refreshBtn" type="button" onClick={this.handleRefresh}>refresh</button>
            </p>
        </header>
        <CardList handleCardFlip={this.handleCardFlip} shuffle={this.handleShuffle} cards={this.state.cards} flipped={this.state.flippedCards}/>

      </div>
    );
  }
}

export default App;

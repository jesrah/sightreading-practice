import './CardList.css'

const CardList = (props) => {
    let cardArray = props.cards;

    let cards = cardArray.map((ele, index) => {
        let flipped = false;
        //if our array where we keep track of cards that has been flipped contains this card, display it as flipped
        if (props.flipped.indexOf(index) !== -1) {
            flipped = true;
        }
        return (
        <div 
        className="imgCard" 
        key={index} 
        onClick={() => {props.handleCardFlip(index)}}>
            <div className="inner">
                <div className={`front ${flipped ? 'flipped' : '' }`}>
                    <img 
                        className="note-img" 
                        alt={`Piano note ${ele}`} 
                        src={require(`./assets/images/${ele}.png`).default}
                    />
                </div>
                <div className={`back ${flipped ? 'flipped' : '' }`}>
                    {ele.split('_')[1]}
                </div>
            </div>
            
        </div>
        )
    })
    return (
        <div className="cardlist">
            {cards}
        </div>
        
    )
}

export default CardList;
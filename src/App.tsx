import React from 'react';
import './App.css';

enum CardType {
  air,
  fire,
  earth,
  water,
}

type CardProps = {
  cardType: CardType
}

const Card = (props: CardProps) => {
  return (
    <div className="Card">
      {CardType[props.cardType]}
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <div className="Row">
        <Card cardType={CardType.air} />
      </div>
      <div className="Row">
        <Card cardType={CardType.fire} />
      </div>
    </div>
  );
}

export default App;

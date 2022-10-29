'use strict';

import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import WeatherDay from './WeatherDay';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Weather.css';

class Weather extends React.Component {

  render() {
    // console.log('Rains of Castemere!');
    if (this.props.forecast.length === 0) {
      return ('');
    }
    return (
      <div>
        <h1> Projected Weather</h1>
        <CardDeck>
          {this.props.forecast.map((day, index) => (
            <WeatherDay key={index} day={day} />
          ))}
        </CardDeck>
      </div>
    );
  }
}


export default Weather;
'use strict';

import React from 'react';
import Card from 'react-bootstrap/Card';

class WeatherDay extends React.Component {

  render() {
    return (
      <div>
        <Card style={{ width: '20rem' }}>
          <Card.Title>📅 {this.props.day.date} 📅</Card.Title>
          <Card.Body>
            {/* <Card.Text>Forecast</Card.Text> */}
            <Card.Subtitle>{this.props.day.description}</Card.Subtitle>
            <Card.Text>Low Temp : {`${this.props.day.lowTemp}°F`}</Card.Text>
            <Card.Text>High Temp : {`${this.props.day.hiTemp}°F`}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
export default WeatherDay;
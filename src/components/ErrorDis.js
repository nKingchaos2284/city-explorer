import React from 'react';
import Alert from 'react-bootstrap/Alert';

class ErrorDis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    render() {
        if(this.props.showErrorDis) {
            return (
                <Alert variant="danger" onClose={this.props.handleCloseErrorDis} dismissible>
                    <Alert.Heading>{this.props.errorMessage}</Alert.Heading>
                    <p>
                       Just Enter a city to explore and receive local weather, movies, and location GPS coordinates!
                    </p>
                </Alert>
            )
        }
    }
}

export default ErrorDis;
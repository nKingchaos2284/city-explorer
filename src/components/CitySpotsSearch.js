import React from 'react';
import axios from 'axios';

import './CitySpotsSearch.js';
import ErrorDis from './ErrorDis.js';
import Weather from './Weather.js';
import Movies from './Movies.js';
import CitySpotsDis from './CitySpotsDis.css';

class CitySpotsSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city : '',
            cityData: [],
            mapImageData: '',
            forecastData: [],
            movieData: [],
            error: false,
            errorMessage: '',
            showErrorDis: false
        }
    }

    handOpenErrorDis = () => {
        this.setState({
            showErrorDis: true
        })
    }

    handleCloseErrorDis = () => {
        this.setState({
            showErrorDis: false
        })
    }

    getMapData = async (event) => {
        event.preventDefault();
        try {
            // get city data
            let cityDataUrl = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_CITYSLICKER_API_KEY}&q=${this.state.city}&format=json`;
            let cityData = await axios.get(cityDataUrl);
            let lon = cityData.data[0].lon;
            let lat = cityData.data[0].lat;

            // get map image
            let mapImageUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITYSLICKER_API_KEY}&center=${lat},${lon}&zoom=14`;
            let mapImageData = await axios.get(mapImageUrl);

            this.setState({
                cityData: cityData.data[0],
                mapImageData: mapImageData.request.responseURL,
                error: false,
            }, () => {
                this.getForecastData();
                this.getMovieData();
            });
        } catch(error) {
            this.setState({
                error: true,
                errorMessage: error.message,
                showErrorDis: true
            })
        }
    }

    getForecastData = async () => {
        try {
          
            let forecastUrl = `${process.env.REACT_APP_SERVER}/weather?lat=${this.state.cityData.lat}&lon=${this.state.cityData.lon}`;
      
            let forecastData = await axios.get(forecastUrl);
            
            this.setState({
                forecastData: forecastData.data,
                error: false,
            })
        } catch(error) {
            this.setState({
                error: true,
                errorMessage: error.message,
                showErrorDis: true
            }) 
        }
    }

    getMovieData = async () => {
        try {
            let movieUrl = `${process.env.REACT_APP_SERVER}/movies?searchQuery=${this.state.city}`;
            let movieData = await axios.get(movieUrl);
            this.setState({
                movieData: movieData  
            })

        } catch(error) {
            this.setState({
                error: true,
                errorMessage: error.message,
                showErrorDis: true
            })

        }
    }

    handleInput = (event) => {
        event.preventDefault();
        this.setState({
            city: event.target.value
        })
    }
    
    render() {
        return (
            <>
                <form onSubmit={this.getMapData}>
                    <label>Enter a City to Explore:
                        <input type="text" onInput={this.handleInput}/>
                        <button type="submit">And Here We Go!</button>
                    </label>
                </form>
                {
                    this.state.city !== '' && 
                    this.state.cityData.length !== 0 && 
                    this.state.mapImageData !== '' && 
                    this.state.forecastData.length !== 0 &&
                    this.state.movieData.length !== 0 &&
                    !this.state.error
                    ?
                    <>
                        <div className='info-cards'>
                            <CitySpotsDis
                                cityData={this.state.cityData}
                                mapImageData={this.state.mapImageData}
                            />
                            <Weather
                                forecastData={this.state.forecastData}
                            />
                            <Movies
                                movieData={this.state.movieData}
                                /> 
                        </div>
                    </>
                    :
                    this.state.city !== '' && this.state.error 
                    ?
                    <ErrorDis
                        errorMessage={this.state.errorMessage}
                        showErrorDis={this.state.showErrorDis}
                    />
                    :
                    <></>
                }
            </>
        );
    }
}

export default CitySpotsSearch;
import React from "react";
import axios from "axios";

import "./App.css";

import favicon from "./images/favicon.png";

class App extends React.Component {
    state = {
        advice: "",
    };

    componentDidMount() {
        this.fetchAdvice();
    }

    fetchAdvice = () => {
        const id = Math.floor(Math.random() * 100) - 1; //generate random id for random advice

        axios
            .get("https://api.adviceslip.com/advice/" + id.toString())
            .then((response) => {
                const { advice } = response.data.slip;

                this.setState({ advice }); //equal to {advice: advice} since property and value have same name
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        const { advice } = this.state;

        return (
            <div className='app'>
                <img className='guruImage' src={favicon} alt='guru' />
                <div className='card'>
                    <h1 className='heading'>{advice}</h1>
                    <button className='button' onClick={this.fetchAdvice}>
                        <span>I need more advice!</span>
                    </button>
                </div>
            </div>
        );
    }
}

export default App;

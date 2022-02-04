import React from "react";
import axios from "axios";

import "./App.css";

import favicon from "./images/favicon.png";
import favicon2 from "./images/favicon2.png";

class App extends React.Component {
    state = {
        advice: "",
        active: false,
        count: 0,
    };

    componentDidMount() {
        this.fetchAdvice();
    }

    fetchAdvice = () => {
        const id = Math.floor(Math.random() * 100) - 1; //generate random id for random advice

        if (this.state.count === 5)   {
            this.setState({active: !this.state.active});
            this.setState({advice: "Stop asking so many questions. You drained me of all my wisdom already!"});

        }   else    {
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
            
        this.setState({count: this.state.count+1});
    };

    render() {
        const { advice } = this.state;

        return (
            <div className='app'>
                <img className='guruImage' src={this.state.active ? favicon2 : favicon} alt='guru' />
                <div className={this.state.active ? 'enoughCard card' : 'card'}>
                    <h1 className={this.state.active ? 'enoughHeading heading' : 'heading'}>{advice}</h1>
                    <button className={this.state.active ? 'disabled button' : 'button'} onClick={this.fetchAdvice}>
                        <span>I need more advice!</span>
                    </button>
                </div>
            </div>
        );
    }
}

export default App;

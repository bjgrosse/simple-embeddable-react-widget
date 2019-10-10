import React from 'react'
import ReactDOM from 'react-dom';
import Config from '../../config';

const widgetName = Config.name;

class Widget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
        };
    }

    render() {
        if (this.state.message) {
            return <div><h1>I'm a {widgetName}</h1><div>I have a message: {this.state.message}</div></div>;
        }
        else {
            return <div><h1>I'm a {widgetName}</h1></div>;
        }
    }

    setMessage(message){
        this.setState({message: message});
    }
};

export default Widget;
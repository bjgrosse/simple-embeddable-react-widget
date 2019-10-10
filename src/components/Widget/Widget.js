import React from 'react'
import ReactDOM from 'react-dom';
import Config from '../../config';
import './widget.css';

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
            return <div className="widget-container"><h1>I'm a {widgetName}</h1><div>I have a message: {this.state.message}</div></div>;
        }
        else {
            return <div className="widget-container"><h1>I'm a {widgetName}</h1></div>;
        }
    }

    setMessage(message){
        this.setState({message: message});
    }
};

export default Widget;
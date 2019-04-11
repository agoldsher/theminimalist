import React from "react";
import io from "socket.io-client";

class MsgDash extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            sent: '',
            message: '',
            messages: [],
            personID: ""
        };

        this.socket = io('localhost:3001');
    };

    componentDidMount() {
        this.connect();
        this.receiveMessages();
    };

    connect = () => {
        // the room will be the two peoples user IDs or names
        const person = "greg"
        this.socket.emit("person", person);
        console.log("sent to server " + person)
        this.setState({ personID: person});
    };

    receiveMessages = () => {
        this.socket.on('message', (data) => {
            console.log(data);
            //this.setState({ messages: [...this.state.messages, data] })
         });
    };

    render() {
        return (
            <div></div>
        );
    };
};

export default MsgDash;
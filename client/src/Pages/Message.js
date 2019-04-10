import React from "react";
import io from "socket.io-client";

class Message extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            sent: '',
            message: '',
            messages: [],
            roomID: ""
        };

        this.socket = io('localhost:3001');
    };

    componentDidMount() {
        this.connect();
        this.receiveMessages();
    };

    connect = () => {
        // the room will be the two peoples user IDs or names
        const room = "abc123"
        this.socket.emit("room", room);
        this.setState({ roomID: room});
    };

    receiveMessages = () => {
        this.socket.on('message', (data) => {
            this.setState({ messages: [...this.state.messages, data] })
         });
    };

    emitMsgToServer = () => {
        const newMsg = {
            from: this.state.username,
            msg: this.state.username + ": " + this.state.message,
            to: this.state.sent,
            room: this.state.roomID
        };
        this.socket.emit("server", newMsg)
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Chat with {this.state.username}</div>
                                <div className="messages">
                                    {this.state.messages.map(message => {
                                        return (
                                            <div> {message}</div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="card-footer">
                                <input type="text"
                                    placeholder="Username"
                                    value={this.state.username}
                                    onChange={ev => this.setState({ username: ev.target.value })}
                                    className="form-control"
                                />
                                <input type="text"
                                    placeholder="Username2"
                                    value={this.state.sent}
                                    onChange={ev => this.setState({ sent: ev.target.value })}
                                    className="form-control"
                                />
                                <input type="text"
                                    placeholder="Message"
                                    className="form-control"
                                    value={this.state.message}
                                    onChange={ev => this.setState({ message: ev.target.value })}
                                />
                                <br />
                                <button onClick={this.emitMsgToServer} className="btn btn-primary form-control">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};


export default Message;
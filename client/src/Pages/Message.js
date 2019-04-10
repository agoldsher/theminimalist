import React from "react";
import io from "socket.io-client";
//import API from "../utils/API";

class Message extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            sent: '',
            message: '',
            messages: [],
            users: [],
            sId: "",
            roomID: ""
        };

        this.socket = io('localhost:3001');
    };

    componentDidMount() {
        //this.listenforUsers();
        //this.listenForSocketId();
        //this.listenForOtherMsg();
        //this.listenforOwnMsg();
        this.connect();
        this.receiveMessages();
    };


    // listenforUsers =() => {
    //     this.socket.on("users", (data => {
    //         console.log(data);
    //         this.setState({ users: data })
    //     }))
    // };

    // listenForSocketId() {
    //     this.socket.on("id", (Id) => {
    //         console.log(Id);
    //         this.setState({ sId: Id.socketId })
    //     })
    // }

    connect = () => {
        // the room will be the two peoples user IDs
        const room = "abc123"
        this.socket.emit("room", room);
        console.log(room + "entered");
        this.setState({ roomID: room})
        // API.getRoomMessages
    };

    receiveMessages = () => {
        this.socket.on('message', (data) => {
            console.log('Incoming message:', data);
            this.setState({ messages: [...this.state.messages, data] })
         });
    }

    emitMsgToServer = () => {
        const newMsg = {
            from: this.state.username,
            msg: this.state.username + ": " + this.state.message,
            to: this.state.sent,
            room: this.state.roomID
        };
        // Go to #1 to server
        this.socket.emit("server", newMsg)
    }

    // listenforOwnMsg = () => {
    //     this.socket.on("greg", (data) => {
    //         console.log("I'm getting a msg here it is\n" + data)
    //     })
    // }

    // listenForOtherMsg() {
    //     this.socket.on(this.state.username, (data) => {
    //         console.log("I'm getting a msg here it is\n" + data)
    //     })
    // }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Global Chat</div>
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
    }
};




export default Message;
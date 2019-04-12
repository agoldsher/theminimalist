import React from "react";
import io from "socket.io-client";
import API from "../utils/API";

class Message extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            messages: [],
            roomID: "",
            postTitle: "",
            postImage: "",
            postCity: "",
            postState: "",
        };
        this.socket = io('localhost:3001');
    };

    componentDidMount() {
        console.log(this.props);
        this.createConnection();
        this.receiveMessages();
    };

    createConnection = () => {
        API.getPost(this.props.match.params.id)
            .then(res => {
                this.setState({ 
                    postTitle: res.data.title,
                    postImage: res.data.image,
                    postCity: res.data.city, 
                    postState: res.data.state 
                });
            })
            .catch(err => console.log(err));
        const room = this.props.match.params.id
        this.socket.emit("room", room);
        this.setState({ roomID: room });
    };

    receiveMessages = () => {
        this.socket.on('message', (data) => {
            this.setState({ messages: [...this.state.messages, data] })
        });
    };

    emitMsgToServer = () => {
        const newMsg = {
            msg: "name" + ": " + this.state.message,
            room: this.state.roomID
        };
        this.socket.emit("server", newMsg)
    };

    render() {
        return (
            <div className="container">
            <h1>Forum page for {this.state.postTitle}</h1>
            <img alt={this.state.postTitle} src={this.state.postImage}></img>
            <p>{this.state.postCity + ", " + this.state.postState}</p>
                <div className="messages">
                    {this.state.messages.map(message => {
                        return (
                            <div> {message}</div>
                        )
                    })}
                </div>
                <div className="card-footer">
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
        );
    };
};

export default Message;
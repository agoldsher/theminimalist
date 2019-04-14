import React from "react";
import io from "socket.io-client";
import API from "../utils/API";
import { connect } from "react-redux";
import { withRouter } from "react-router";

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
            loggedInName: ""
        };
        this.socket = io('localhost:3001');
    };

    componentDidMount() {
        this.createConnection();
        this.receiveMessages();
    };

    createConnection = () => {
        const { user } = this.props.auth;
        API.getPost(this.props.match.params.id)
            .then(res => {
                this.setState({ 
                    postTitle: res.data.title,
                    postImage: res.data.image,
                    postCity: res.data.city, 
                    loggedInName: user.userName
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
            name: this.state.loggedInName,
            msg: this.state.loggedInName + ": " + this.state.message,
            room: this.state.roomID
        };
        this.socket.emit("server", newMsg)
    };

    deleteMsg = (msg) => {
        const message = {};
        message.room = this.state.roomID;
        message.body = msg;
        this.socket.emit("delete", message);
        this.setState({ messages: [] })
    };

    render() {
        return (
            <div className="container">
            <h1>Forum page for {this.state.postTitle}</h1>
            <img alt={this.state.postTitle} src={this.state.postImage}></img>
            <p>{this.state.postCity + ", " + this.state.postState}</p>
                <div className="messages">
                    {this.state.messages.map(message => {
                        if (this.state.loggedInName === message.substr(0, message.indexOf(":")))
                        return (
                            <div>{message}
                            <button onClick={()=>this.deleteMsg(message)}>x</button>
                            </div>
                        )
                        return (
                            <div>{message}</div>
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

const mapStateToProps = (state) => {
    return {auth: state.auth}
};
export default withRouter(connect(mapStateToProps, {})(Message));
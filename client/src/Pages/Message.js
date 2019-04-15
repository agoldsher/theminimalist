import React from "react";
import io from "socket.io-client";
import API from "../utils/API";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material/react-button';

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
        this.socket = io("mongodb://<heroku_w8pp3q6n>:<theminimalist2019!>@ds121026.mlab.com:21026/heroku_w8pp3q6n");
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
            <div className="message-container">
                <div className="forum-content">
                    <div className="img-container">
                        <h1>Forum page for {this.state.postTitle}</h1>
                        <img alt={this.state.postTitle} src={this.state.postImage}></img>
                        {/* <p>{this.state.postCity}</p> */}
                    </div>
                    <div className="message-container">
                    <h1>{this.state.postCity}</h1>
                        <div className="messages">
                            {this.state.messages.map(message => {
                                if (this.state.loggedInName === message.substr(0, message.indexOf(":")))
                                    return (
                                        <div>
                                            <Button onClick={() => this.deleteMsg(message)}><DeleteIcon /></Button>
                                            {message}
                                        </div>
                                    )
                                return (
                                    <div>{message}</div>
                                )
                            })}
                            <input type="text" style={{height:"40px"}}
                                placeholder="Message"
                                className="form-control"
                                value={this.state.message}
                                onChange={ev => this.setState({ message: ev.target.value })}
                            />
                            
                            <br />

                            <Button onClick={this.emitMsgToServer} className="btn btn-primary form-control">Send</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return { auth: state.auth }
};
export default withRouter(connect(mapStateToProps, {})(Message));
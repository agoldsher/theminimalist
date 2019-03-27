import React from "react";
import "./style.css";

export function Input(props) {
    return (
        <div className="form-group">
            <label>{props.name}:</label>
            <input className="form-control" {...props} />
        </div>
    );
}

export function DropDown(props) {
    return (
        <div className="form-group">
            <label>{props.name}:</label>
            <select className="form-control">
                <option></option>
            </select>
        </div>
    );
}

export function TextArea(props) {
    return (
        <div className="form-group">
            <label>{props.name}:</label>
            <textarea className="form-control" rows="20" {...props} />
        </div>
    );
}

export function ImgUpload(props) {
    return (
        <div className="form-group">
            <label>{props.name}:</label>
            <input type="file" className="form-control-file" id="image"></input>
        </div>
    );
}

export function FormBtn(props) {
    return (
        <button {...props} className="form-control">Post</button>
    );
}
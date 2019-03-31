import React from "react";
import "./style.css";

export function Input(props) {
    return (
        <div className="form-group">
            <label>{props.label}</label>
            <input className="form-control" {...props} />
        </div>
    );
};

export function DropDown(props) {
    return (
        <div className="form-group">
            <label>{props.label}</label>
            <select {...props} className="form-control">
                {props.categories.map((item, key) => {
                    return <option value={item} key={key}>{item}</option>;
                })}
            </select>
        </div>
    );
};

export function TextArea(props) {
    return (
        <div className="form-group">
            <label>{props.label}</label>
            <textarea className="form-control" rows="20" {...props} />
        </div>
    );
};

export function ImgUpload(props) {
    return (
        <div className="form-group">
            <label>{props.label}</label>
            <input type="file" id="upload" name={props.name} ref={props.fileRef}></input>
        </div>
    );
};

export function FormBtn(props) {
    return (
        <button {...props} className="form-control"></button>
    );
};
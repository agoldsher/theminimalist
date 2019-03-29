import React from "react";
import "./style.css";
import Button from "react-bootstrap/Button";
import FormLabel from "react-bootstrap/FormLabel";

export function Input(props) {
    return (
        <div className="">
            {/* <label>{props.label}</label> */}
            <input className="form-control" {...props} />
        </div>
    );
}

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
}

export function TextArea(props) {
    return (
        <div className="form-group">
            <FormLabel>{props.label}</FormLabel>
            <textarea className="form-control" rows="20" {...props} />
        </div>
    );
}

export function ImgUpload(props) {
    return (
        <div className="form-group">
            <label>{props.label}</label>
            <input type="file" className="form-control-file" name={props.name}></input>
        </div>
    );
}

export function FormBtn(props) {
    return (
        <Button {...props} className="form-button"></Button>
    );
}
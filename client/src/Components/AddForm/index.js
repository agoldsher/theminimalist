import React from "react";
import "./style.css";
import Button from "react-bootstrap/Button";
import FormLabel from "react-bootstrap/FormLabel";

export function Input(props) {
    return (
        <div className="form-input">
            {/* <label>{props.label}</label> -Don't know if this section of code was needed for something else, commented it out as it was interfering with navbar layout */}
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
        <div className="form-group description-area">
            <FormLabel>{props.label}</FormLabel>
            <textarea className="form-control" rows="7" {...props} />
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
        <Button {...props} className="form-button mr-3"></Button>
    );
};

export function textDisplay() {
    return (
        <div classname="form-group display"></div>
    )
}
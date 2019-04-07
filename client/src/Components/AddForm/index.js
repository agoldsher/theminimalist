import React, { Component } from "react";
import "./style.css";
// import Button from "react-bootstrap/Button";
import Button from "@material/react-button";
import FormLabel from "react-bootstrap/FormLabel";
import { Body2, Headline6, Headline4, Subtitle2 } from "@material/react-typography";
import TextField from "@material/react-text-field";
import Select from "@material/react-select";

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
            <Select {...props} className="form-control" label={props.label} onChange={props.onChange}>
                {props.categories.map((item, key) => {
                    return <option value={item} key={key}>{item}</option>;
                })}
            </Select>
        </div>
    );
};


// export class DropDown extends Component (props) {
//     state={

//     };
//     constructor(props) {
//         super(props)
//         this.fileInput = React.createRef();
//         this.handleFormSubmit = this.handleFormSubmit.bind(this);
//     };
//     render (
//         <div className="form-group">
//             <Select {...props} className="form-control" label={props.label} onChange={props.onChange}>
//                 {props.categories.map((item, key) => {
//                     return <option value={item} key={key}>{item}</option>;
//                 })}
//             </Select>
//         </div>
//     );
// };

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
            {/* <TextField label={props.label}>
                <Input  type="file" id="upload" name={props.name} ref={props.fileRef}/>
            </TextField> */}
        </div>
    );
};

export function FormBtn(props) {
    return (
        <Button {...props} className="form-button mr-3"></Button>
    );
};

export function TextDisplay(props) {
    return (
        // <div className="form-group display">{props.label}</div>
        <Body2 className="form-group display">{props.label}</Body2>
    )
}
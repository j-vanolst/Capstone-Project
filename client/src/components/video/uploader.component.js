import React, { Component } from 'react'
import Input from 'react-validation/build/input'

export default class Uploader extends React.Component {
    constructor(props) {
        super(props)

        this.onChangeFile = this.onChangeFile.bind(this)
        this.loadFile = this.loadFile.bind(this)

        this.state = {
            filename: '',
            file: ''
        }
    }

    onChangeFile(e) {
        let files = e.target.files
        if (files.length) {
            this.setState({
                filename: files[0].name
            })
            console.log(this.state)
        }
    }

    loadFile(e) {

    }

    render() {
        return (
            <div>
                <label htmlFor={this.props.name}>{this.props.labelText}</label>
                <Input
                    type="file"
                    className="form-control"
                    name={this.props.name}
                    value={this.state.filename}
                    onChange={this.onChangeFile}
                />
            </div>
        )
    }
}
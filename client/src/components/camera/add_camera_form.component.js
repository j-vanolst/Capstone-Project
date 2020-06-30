import React, { Component } from 'react'

import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'

import { isURL } from 'validator'

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}

const url = value => {
    if (!isURL(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid URL.
            </div>
        )
    }
}


export default class AddCameraForm extends Component {
    constructor(props) {
        super(props)

        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeLocation = this.onChangeLocation.bind(this)
        this.onChangeURL = this.onChangeURL.bind(this)
        this.getInput = this.getInput.bind(this)
        this.checkInput = this.checkInput.bind(this)


        this.state = {
            name: '',
            location: '',
            url: ''
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeLocation(e) {
        this.setState({
            location: e.target.value
        })
    }

    onChangeURL(e) {
        this.setState({
            url: e.target.value
        })
    }

    getInput() {
        return {
            name: this.state.name,
            location: this.state.location,
            url: this.state.url
        }
    }

    checkInput() {
        this.form.validateAll()

        if (this.checkBtn.context._errors.length === 0) {
            return true
        }

        return false
    }

    render() {
        return (
            <Form
                ref={c => {
                    this.form = c
                }}
            >
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChangeName}
                        validations={[required]}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="location"
                        value={this.state.location}
                        onChange={this.onChangeLocation}
                        validations={[required]}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="url">URL</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="url"
                        value={this.state.url}
                        onChange={this.onChangeURL}
                        validations={[required, url]}
                    />
                </div>

                <CheckButton
                    style={{ display: "none" }}
                    ref={c => {
                        this.checkBtn = c;
                    }}
                />
            </Form>
        )
    }
}

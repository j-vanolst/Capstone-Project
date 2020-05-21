import React, { Component } from 'react'


import VideoService from '../services/video_service'


const user = JSON.parse(localStorage.getItem('user'))


export default class Test extends React.Component {
    constructor(props) {
        super(props)

        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.loadFile = this.loadFile.bind(this)

        this.state = {
            filename: '',
            file: ''
        }
    }

    onChangeHandler(e) {
        let files = e.target.files

        if (files.length) {
            let file = files[0]
            this.setState({
                filename: file.name,
                file: file
            })
        }
    }

    loadFile() {
        const reader = new FileReader()

        VideoService.test(this.state.filename, user.id, this.state.file)

        // reader.readAsDataURL(file)

        // reader.onload = (e) => {
        //     let contents = e.target.result
        //     this.setState({
        //         filename: filename,
        //         file: contents
        //     })

        //     VideoService.test(this.state.filename, this.state.file)

        // }

    }

    render() {
        return (
            <div>
                <label htmlFor="file">Video File</label>
                <input type="file" name="file" onChange={this.onChangeHandler} />
                <button onClick={this.loadFile}>Submit</button>
            </div>

        )
    }
}
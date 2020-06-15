import React, { Component, createRef } from 'react'

export default class ScheduleDay extends Component {
    constructor(props) {
        super(props)

        this.onChangeDay = this.onChangeDay.bind(this)
        this.onChangeStartTime = this.onChangeStartTime.bind(this)
        this.onChangeEndTime = this.onChangeEndTime.bind(this)
        this.toJSON = this.toJSON.bind(this)

        this.state = {
            day: '',
            startTime: '',
            endTime: '',
            dayRef: this.props.dayRef
        }
    }

    onChangeDay(e) {
        this.setState({
            day: e.target.value
        })
        this.state.dayRef.setDay(e.target.value)
    }

    onChangeStartTime(e) {
        this.setState({
            startTime: e.target.value
        })
        this.state.dayRef.setStartTime(e.target.value)
    }

    onChangeEndTime(e) {
        this.setState({
            endTime: e.target.value
        })
        this.state.dayRef.setEndTime(e.target.value)
    }

    toJSON() {
        return JSON.stringify(this.state)
    }

    render() {
        return (
            <div>
                <select name="day" onChange={this.onChangeDay} value={this.state.day} className="form-control">
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                </select>

                <div className="form-group">
                    <label htmlFor="startTime">Start Time</label>
                    <input name="startTime" type="time" className="form-control" onChange={this.onChangeStartTime} value={this.state.startTime}></input>
                </div>

                <div className="form-group">
                    <label htmlFor="endTime">End Time</label>
                    <input name="endTime" type="time" className="form-control" onChange={this.onChangeEndTime} value={this.state.endTime}></input>
                </div>
            </div>
        )
    }
}
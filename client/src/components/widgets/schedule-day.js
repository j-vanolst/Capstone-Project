import React, { Component, createRef } from 'react'

export default class ScheduleDay extends Component {
    constructor(props) {
        super(props)

        this.onChangeDay = this.onChangeDay.bind(this)
        this.onChangeStartTime = this.onChangeStartTime.bind(this)
        this.onChangeEndTime = this.onChangeEndTime.bind(this)
        this.toJSON = this.toJSON.bind(this)
        this.remove = this.remove.bind(this)

        this.schedule = this.props.schedule

        this.state = {
            dayRef: this.props.dayRef
        }
    }

    onChangeDay(e) {
        let dayRef = this.state.dayRef
        dayRef.schedule.day = e.target.value
        this.setState({
            dayRef: dayRef
        })
    }

    onChangeStartTime(e) {
        let dayRef = this.state.dayRef
        dayRef.schedule.startTime = e.target.value
        this.setState({
            dayRef: dayRef
        })
    }

    onChangeEndTime(e) {
        let dayRef = this.state.dayRef
        dayRef.schedule.endTime = e.target.value
        this.setState({
            dayRef: dayRef
        })
    }

    toJSON() {
        return JSON.stringify(this.state)
    }

    remove() {
        this.props.schedule.remove(this.state.dayRef)
        this.props.handler()
    }

    render() {
        return (
            <div>
                <div class="form-group">
                    <label htmlFor="day">Day</label>
                    <select name="day" onChange={this.onChangeDay} value={this.state.dayRef.day} className="form-control">
                        <option value="monday">Monday</option>
                        <option value="tuesday">Tuesday</option>
                        <option value="wednesday">Wednesday</option>
                        <option value="thursday">Thursday</option>
                        <option value="friday">Friday</option>
                        <option value="saturday">Saturday</option>
                        <option value="sunday">Sunday</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="startTime">Start Time</label>
                    <input name="startTime" type="time" className="form-control" onChange={this.onChangeStartTime} value={this.state.dayRef.startTime}></input>
                </div>

                <div className="form-group">
                    <label htmlFor="endTime">End Time</label>
                    <input name="endTime" type="time" className="form-control" onChange={this.onChangeEndTime} value={this.state.dayRef.endTime}></input>
                </div>

                <div className="form-group">
                    <button className="btn btn-outline-danger" onClick={this.remove}>Remove</button>
                </div>
            </div>
        )
    }
}
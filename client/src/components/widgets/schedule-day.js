import React, { Component } from 'react'

export default class ScheduleDayForm extends Component {
    constructor(props) {
        super(props)

        this.onChangeDay = this.onChangeDay.bind(this)
        this.onChangeStartTime = this.onChangeStartTime.bind(this)
        this.onChangeEndTime = this.onChangeEndTime.bind(this)

        this.state = {
            day: this.props.day,
            startTime: this.props.startTime,
            endTime: this.props.endTime
        }

    }

    onChangeDay(e) {
        this.props.dayRef.setDay(e.target.value)
        this.setState({
            day: e.target.value
        })
    }

    onChangeStartTime(e) {
        this.props.dayRef.setStartTime(e.target.value)
        this.setState({
            startTime: e.target.value
        })
    }

    onChangeEndTime(e) {
        this.props.dayRef.setEndTime(e.target.value)
        this.setState({
            endTime: e.target.value
        })
    }

    render() {
        return (
            <div>
                <div className="form-row mb-3">
                    <div className="col-auto">
                        <label htmlFor="day">Day</label>
                        <select name="day" onChange={this.onChangeDay} value={this.state.day} className="form-control">
                            <option value="monday">Monday</option>
                            <option value="tuesday">Tuesday</option>
                            <option value="wednesday">Wednesday</option>
                            <option value="thursday">Thursday</option>
                            <option value="friday">Friday</option>
                            <option value="saturday">Saturday</option>
                            <option value="sunday">Sunday</option>
                        </select>
                    </div>
                    <div className="col-auto">
                        <label htmlFor="startTime">Start</label>
                        <input name="startTime" type="time" className="form-control" onChange={this.onChangeStartTime} value={this.state.startTime}></input>
                    </div>
                    <div className="col-auto">
                        <label htmlFor="endTime">End</label>
                        <input name="endTime" type="time" className="form-control" onChange={this.onChangeEndTime} value={this.state.endTime}></input>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-outline-danger my-3 btn-sm" onClick={this.props.removeDay}>Remove</button>
                    </div>
                </div>
            </div>
        )
    }
}
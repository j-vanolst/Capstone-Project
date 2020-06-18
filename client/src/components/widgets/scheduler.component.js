import React, { Component, createRef } from 'react'
import { Button } from 'react-bootstrap'

import ScheduleDayForm from './schedule-day'

export default class Scheduler extends Component {
    constructor(props) {
        super(props)

        this.addDay = this.addDay.bind(this)
        this.removeDay = this.removeDay.bind(this)

        this.state = {
            scheduleDays: []
        }
    }

    componentDidMount() {
        this.parseJSON()
    }

    addDay() {
        let newDay = new ScheduleDay()
        let scheduleDays = this.state.scheduleDays
        scheduleDays.push(newDay)
        this.setState({
            scheduleDays: scheduleDays
        })
    }

    removeDay(removeDay) {
        let removedIndex = this.state.scheduleDays.findIndex(aDay => aDay.day == removeDay.day)
        let scheduleDays = this.state.scheduleDays
        scheduleDays.splice(removedIndex)
        this.setState({
            scheduleDays: scheduleDays
        })
    }

    getInput() {
        let schedule = []
        for (let aDay of this.state.scheduleDays) {
            schedule.push({ day: aDay.day, startTime: aDay.startTime, endTime: aDay.endTime })
        }
        return schedule
    }

    parseJSON() {
        if (!this.props.schedule) {
            return
        }

        let schedule = JSON.parse(this.props.schedule)
        let scheduleDays = this.state.scheduleDays

        for (let aDay of schedule) {
            let newDay = new ScheduleDay(aDay.day, aDay.startTime, aDay.endTime)
            scheduleDays.push(newDay)
        }

        this.setState({
            scheduleDays: scheduleDays
        })
    }

    render() {
        const scheduleDays = []
        for (let i = 0; i < this.state.scheduleDays.length; i++) {
            let aDay = this.state.scheduleDays[i]
            console.log(aDay)
            scheduleDays.push(<ScheduleDayForm key={i} day={aDay.day} startTime={aDay.startTime} endTime={aDay.endTime} dayRef={aDay} removeDay={this.removeDay} />)
        }
        return (
            <div>
                <div>
                    {scheduleDays}
                </div>
                <Button variant="success" onClick={this.addDay}>Add Day</Button>
                {this.state.key}
            </div>
        )
    }
}

class ScheduleDay {
    constructor(day = 'monday', startTime = '', endTime = '') {
        this.day = day
        this.startTime = startTime
        this.endTime = endTime
    }

    setDay(newDay) {
        this.day = newDay
    }

    setStartTime(newStartTime) {
        this.startTime = newStartTime
    }

    setEndTime(newEndTime) {
        this.endTime = newEndTime
    }
}
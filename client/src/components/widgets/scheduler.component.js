import React, { Component, createRef } from 'react'

import ScheduleDay from './schedule-day'


import './scheduler.css'
import input from 'react-validation/build/input'

const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
]

export default class Scheduler extends Component {
    constructor(props) {
        super(props)

        this.scheduleRef = createRef()

        this.addDay = this.addDay.bind(this)
        this.save = this.save.bind(this)

        this.dayRefs = []
        this.days = []

        this.state = {
            days: []
        }
        this.children = []
    }

    addDay() {
        let newDay = new test()
        this.dayRefs.push(newDay)
        this.days.push(<ScheduleDay dayRef={newDay} />)
        this.setState({
            days: this.days
        })
    }

    save() {
        let output = []
        for (let aDay of this.dayRefs) {
            output.push(aDay.toJSON())
        }
        console.log(JSON.stringify(output))
    }

    render() {
        return (
            <div>
                <div ref={this.scheduleRef} className="schedule">
                    {this.state.days}
                </div>
                <button className="btn btn-primary" onClick={this.addDay}>Add Day</button>
                <button className="btn btn-success" onClick={this.save}>Save</button>
            </div>
        )
    }
}

class test {
    constructor() {
        this.schedule = {
            day: '',
            startTime: '',
            endTime: ''
        }
    }

    setDay(day) {
        this.schedule.day = day
    }

    setStartTime(startTime) {
        this.schedule.startTime = startTime
    }

    setEndTime(endTime) {
        this.schedule.endTime = endTime
    }

    toJSON() {
        return this.schedule
    }
}
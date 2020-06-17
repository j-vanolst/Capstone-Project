import React, { Component, createRef } from 'react'

import ScheduleDay from './schedule-day'

import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

import CameraService from '../../services/camera_service'
import VideoService from '../../services/video_service'

import './scheduler.css'
import input from 'react-validation/build/input'

export default class Scheduler extends Component {
    constructor(props) {
        super(props)

        this.scheduleRef = createRef()

        this.addDay = this.addDay.bind(this)
        this.toJSON = this.toJSON.bind(this)
        this.handler = this.handler.bind(this)

        this.schedule = new Schedule()

        this.state = {
            days: []
        }
    }

    componentDidMount() {
        if (!this.props.schedule == '') {
            this.readJSON()
            this.setState({
                days: this.schedule.allMyDaysElements
            })
        }
    }

    addDay() {
        let newDay = new Day()
        this.schedule.addDay(newDay, this.schedule, this.handler)
        this.setState({
            days: this.schedule.allMyDaysElements
        })
    }

    toJSON() {
        if (!this.schedule.checkDays()) {
            // Add notification
            let notification = {
                title: 'Error',
                message: `Two or more instances of a the same day scheduled.`,
                type: 'danger',
                insert: 'top',
                container: 'top-center',
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: true
                }
            }
            store.addNotification(notification)
            return
        }
        return this.schedule.toJSON()
    }

    handler() {
        this.setState({
            days: this.schedule.allMyDaysElements
        })
    }

    readJSON() {
        this.schedule = new Schedule()
        let scheduleJSON = JSON.parse(this.props.schedule)
        for (let aDay of scheduleJSON) {
            this.schedule.addDay(aDay, this.schedule, this.handler)
        }
        return
    }

    render() {
        return (
            <div>
                <div ref={this.scheduleRef} className="schedule">
                    {this.state.days}
                </div>
                <button className="btn btn-outline-primary" onClick={this.addDay}>Add Day</button>
            </div>
        )
    }
}


class Schedule {
    constructor() {
        this.allMyDays = []
        this.allMyDaysElements = []
    }

    addDay(newDay, schedule, handler) {
        this.allMyDays.push(newDay)
        this.allMyDaysElements.push(<ScheduleDay dayRef={newDay} schedule={schedule} handler={handler} />)
    }

    checkDays() {
        let usedDays = []
        for (let aDay of this.allMyDays) {
            if (!usedDays.includes(aDay.schedule.day)) {
                usedDays.push(aDay.schedule.day)
            }
            else {
                return false
            }
        }
        return true
    }

    toJSON() {
        let output = []
        for (let aDay of this.allMyDays) {
            output.push(aDay.toJSON())
        }
        return JSON.stringify(output)
    }

    remove(aDay) {
        let removedIndex = this.allMyDays.findIndex(day => day.schedule.day == aDay.schedule.day)
        this.allMyDays.splice(removedIndex)
        this.allMyDaysElements.splice(removedIndex)
    }
}

class Day {
    constructor() {
        this.schedule = {
            day: 'monday',
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
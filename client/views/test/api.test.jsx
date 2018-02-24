import React from 'react'
import axios from 'axios'

/* eslint-disable */
export default class TestApi extends React.Component{

    getTopics() {
        axios.get('/api/topics').then(resp => {
            console.log(resp)
        }).catch(err => {
            console.log(err)
        })
    }

    login() {
        axios.post('/api/user/login', { accesstoken: 'fdab5b8f-a30c-4c96-8de2-850f5e8f85ff' }).then(resp => {
            console.log(resp)
        }).catch(err => {
            console.log(err)
        })
    }

    markAll() {
        axios.post('/api/message/mark_all?needAccessToken=true').then(resp => {
            console.log(resp)
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.getTopics}>Topics11</button>
                <button onClick={this.login}>login</button>
                <button onClick={this.markAll}>markAll</button>
            </div>
        )
    }
}
/* eslint-enable */

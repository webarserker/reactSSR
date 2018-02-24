const router = require('express').Router()
const axios = require('axios')

const baseUrl = 'https://cnodejs.org/api/v1'

router.post('/login', function (req, res, next) {

    axios.post(`${baseUrl}/accesstoken`, { accesstoken: req.body.accesstoken }).then(resp => {
        if (resp.status === 200 && resp.data.success) {
            req.session.user = {
                accesstoken: req.body.accesstoken,
                loginName: resp.data.loginname,
                id: resp.data.id,
                avatarUrl: resp.data.avatar_url
            }
            console.log(req.session.user)
            res.json({
                sucess: true,
                data: resp.data
            })
        }
    }).catch(err => {
        if (err.response) {
            res.json({
                sucess: true,
                data: err.response.data
            })
        } else {
            next(err)
        }
    })
})

module.exports = router

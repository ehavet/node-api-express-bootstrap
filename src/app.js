import express from 'express'
const app = express()
import boom from 'express-boom'
import config from './config.js'
import candiesRoutes from './routes.js'
import logger from 'express-pino-logger'
import cors from 'cors'

function init () {
    app.use(cors())
    app.use(logger())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(boom())
    app.use(candiesRoutes)
    app.use(function(req,res){
        res.boom.notFound(`Could not find resource ${req.path}`)
    })

    app.listen(config.get('APP_PORT'), () => {
        console.log(`Express server listening on http://localhost:${config.get('APP_PORT')}`)
    })
}

init()

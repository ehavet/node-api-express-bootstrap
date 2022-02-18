import express from 'express'
const router = express.Router()
import container from './container.js'
import candiesEndpoints from './candies/api/v0/candies.api.js'

export default candiesEndpoints(router, container)
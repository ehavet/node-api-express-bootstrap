import {param, body, validationResult} from 'express-validator'
import {CandyNotFoundError} from '../../domain/candies.errors.js'

export default function (router, container) {
    router.use(async function (
        req,
        res,
        next
    ) {
        console.log('Time: %d', Date.now())
        next()
    })

    router.get('/v0/candies',
        async function (
            req,
            res,
        ) {
            try {
                res.status(200).send(await container.GetCandies())
            } catch (error) {
                res.status(500).send({error: 'erreur 500'})
            }
        })

    router.get('/v0/candies/:id',
        param('id').trim().notEmpty().withMessage('candy\'s id must be provided'),
        async function (
            req,
            res,
        ) {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const messages = errors.array().map(element => element.msg)
                return res.boom.badRequest(messages)
            }
            try {
                res.status(200).send(await container.GetCandy(req.params.id))
            } catch (error) {
                switch (true) {
                case error instanceof CandyNotFoundError:
                    return res.boom.notFound(error.message)
                default:
                    res.boom.internal(error)
                }

            }
        })

    router.post('/v0/candies/',
        body('name')
            .trim().notEmpty().withMessage('name property must be provided'),
        body('sugar_level')
            .trim().notEmpty().withMessage('sugar_level property must be provided')
            .isIn(['high', 'down']).withMessage('sugar_level value can be only high or down'),
        body('description')
            .trim().notEmpty().withMessage('description property must be provided'),
        async function (req, res) {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const messages = errors.array().map(element => element.msg)
                return res.boom.badRequest(messages)
            }

            try {
                await container.CreateCandy(req.body.name, req.body.sugar_level, req.body.description)
                res.status(201).send()
            } catch (error) {
                res.boom.internal(error)
            }
        })

    router.delete('/v0/candies/:id',
        param('id').trim().notEmpty().withMessage('candy\'s id must be provided'),
        async function (
            req,
            res,
        ) {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const messages = errors.array().map(element => element.msg)
                return res.boom.badRequest(messages)
            }
            try {
                res.status(204).send(await container.DeleteCandy(req.params.id))
            } catch (error) {
                switch (true) {
                    case error instanceof CandyNotFoundError:
                        return res.boom.notFound(error.message)
                    default:
                        res.boom.internal(error)
                }

            }
        })

    return router
}


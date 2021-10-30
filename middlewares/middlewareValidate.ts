import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
const validateType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            name: Joi.string().required(),
            username: Joi.string().required(),
            email: Joi.string().required(),
            address: Joi.object({
                street: Joi.string().required(),
                suite: Joi.string().required(),
                city: Joi.string().required(),
                zipcode: Joi.string().required()
            }),
            phone: Joi.string().required(),
            website: Joi.string().allow(null, ''),

        })
        await schema.validateAsync(req.body)
        // console.log(error)
        next()
    } catch (err) {
        console.log(err)
        return res.status(400).send("Something has error, Json invalid")
    }
}

export default { validateType }
import joi from 'joi'

export const userSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().ref('password').required(),

});

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
})
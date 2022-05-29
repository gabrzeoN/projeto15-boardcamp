import joi from "joi";

const customerSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().pattern(new RegExp('^[0-9]{10,11}$')).required(),
    cpf: joi.string().pattern(new RegExp('^[0-9]{11}$')).required(),
    birthday: joi.string().pattern(new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}$')).required()
    // birthday: joi.string().pattern(new RegExp('^[0-9]{1900,2022}-[0-9]{1,12}-[0-9]{1,30}$')).required() // TODO: validar melhor birthday
});

export default customerSchema;
import joi from "joi";

const gameSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    categoryId: joi.number().integer().positive().required(),
    stockTotal: joi.number().positive().required(),
    pricePerDay: joi.number().positive().required()
});

export default gameSchema;
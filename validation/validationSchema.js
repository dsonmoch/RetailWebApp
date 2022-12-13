const joi = require("joi");

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().alphanum().required(),
});

const userDetailsInputSchema = joi.object({
  fields: joi.string(),
});

const productDetailsInputSchema = joi.object({
  page: joi.number().required(),
  items: joi.number().required(),
  sortBy: joi.string(),
  filterBy: joi.string(),
});

module.exports = {
  loginSchema,
  userDetailsInputSchema,
  productDetailsInputSchema,
};

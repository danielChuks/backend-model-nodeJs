
/**
 * the function in general is to help handle the error in the code.
 * @param {* Takes the error and returns the message} err 
 * @param {* } req 
 * @param {* We check the response to know the status of the response to know it status} res 
 * @param {*} next 
 */
const errorhandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message
  });
};

module.exports = {
  errorhandler,
}
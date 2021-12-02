class validator {

  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages[0]);
  }

}

module.exports = validator;

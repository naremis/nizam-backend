const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const degreeSchema = mongoose.Schema({
  name: String,
  shortName: String,
  timePeriod: String,
  degreeLevel: String,
});

// add plugin that converts mongoose to json
degreeSchema.plugin(toJSON);

degreeSchema.statics.degreeExists = async function (name) {
  const degree = await this.findOne({ name });
  return !!degree;
};
const Degree = mongoose.model('Degree', degreeSchema);

module.exports = Degree;

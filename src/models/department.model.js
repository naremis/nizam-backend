const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const degreeSchema = mongoose.Schema({
  name: String,
  shortName: String,
  timePeriod: String,
  degreeLevel: {
    type: String,
    default: 'Bachelors',
  },
});
const departmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    shortName: {
      type: String,
      required: true,
    },
    abbr: {
      type: String,
      required: true,
    },
    hod: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    actingHOD: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    programOffice: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    programsOffered: [{ type: degreeSchema }],
    professors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
departmentSchema.plugin(toJSON);

departmentSchema.statics.departmentExists = async function (name) {
  const department = await this.findOne({ name });
  return !!department;
};

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;

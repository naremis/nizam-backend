const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const facultySchema = mongoose.Schema(
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
    chairman: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    actingChairman: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    charimanOffice: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    departments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }],
    faculty: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
facultySchema.plugin(toJSON);

facultySchema.statics.facultyExists = async function (name) {
  const faculty = await this.findOne({ name });
  return !!faculty;
};
const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;

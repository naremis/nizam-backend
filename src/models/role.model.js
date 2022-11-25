const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const roleSchema = mongoose.Schema(
  {
    _id: String,
    name: {
      type: String,
      required: true,
      index: true,
    },
    can: [{ type: String }],
    toShow: [{ type: String }],
    facultyLevel: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
roleSchema.plugin(toJSON);

roleSchema.statics.roleExists = async function (id) {
  const role = await this.findById(id);
  return !!role;
};

const Token = mongoose.model('Role', roleSchema);

module.exports = Token;

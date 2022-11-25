const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const { projectStages, examiners, docTypes, marksTypes } = require('../config/project');

const marksSchema = mongoose.Schema({
  value: {
    type: Number,
    min: 0,
    max: 99,
  },
  marksType: {
    type: String,
    enum: marksTypes,
  },
  assigner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

const examinerSchema = mongoose.Schema({
  examiner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  examinerType: {
    type: String,
    enum: examiners,
  },
});
const documentSchema = mongoose.Schema({
  originalname: String,
  docname: String,
  docType: {
    type: String,
    enum: docTypes,
  },
  docURL: String,
  uploadedAt: { type: Date, default: Date.now },
});

const projectSchema = mongoose.Schema(
  {
    project: {
      name: {
        type: String,
        required: true,
        index: true,
      },
      title: String,
      abstract: String,
      scope: String,
      neiche: String,
      majorModules: [{ type: String }],
    },
    group: {
      memberCount: { type: Number, min: 1, max: 7 },
      groupName: String,
      groupDescription: String,
      groupMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    degree: { type: mongoose.Schema.Types.ObjectId, ref: 'Degree' },
    recomendedSupervisors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    projectStatus: {
      type: String,
      enum: projectStages,
    },
    projectLevel: mongoose.Schema.Types.Mixed,
    documents: [{ type: documentSchema }],
    marks: [{ type: marksSchema }],
    examiners: [{ type: examinerSchema }],
    acceptanceLetter: {
      name: String,
      issueDate: Date,
    },
    version: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
projectSchema.plugin(toJSON);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

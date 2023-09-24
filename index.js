#!/usr/bin/bash

const { execSync } = require("child_process");
const path = require("path");

const dirName = path.resolve(__dirname);
const tempFilePath = path.join(dirName, "temp.groq");
const binPath = path.join(dirName, "bin/groqfmt");

function format(str) {
  try {
    const strSanitized = str.replace(/"/g, "'").replace(/\$/g, "\\$");
    const result = execSync(`echo "${strSanitized}" | tee ${tempFilePath} | ${binPath} ${tempFilePath}`);
    return result.toString();
  } catch (ex) {
    throw new Error(ex);
  }
}

module.exports = { format };

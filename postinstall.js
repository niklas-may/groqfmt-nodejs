#!/usr/bin/env node

"use strict";

var fs = require("fs");
var path = require("path");
var childProcess = require("child_process");
var util = require("util");
var execPromise = util.promisify(childProcess.exec);
var mkdirp = require("mkdirp");

var packageJsonPath = path.join(".", "package.json");
var packageJson = JSON.parse(fs.readFileSync(packageJsonPath));

function validateConfiguration() {
  if (!packageJson.version) {
    return "'version' property must be specified";
  }

  if (!packageJson.groqfmtBinaries || typeof packageJson.groqfmtBinaries !== "object") {
    return "'groqfmtBinaries' property must be defined and be an object";
  }

  if (!packageJson.groqfmtBinaries[process.platform]) {
    throw new Error("Installation is not supported for this platform: " + process.platform);
  }
}

async function install() {
  try {
    validateConfiguration();
    const binUrl = packageJson.groqfmtBinaries[process.platform];
    const fileName = path.basename(binUrl).includes(".exe") ? "groqfmt.exe" : "groqfmt";
    const targetDir = path.join(process.cwd(), "bin");
    await mkdirp(targetDir);

    await execPromise(`curl -L -o ${targetDir}/groqfmt ${binUrl} && chmod +x bin/${fileName}`);
  } catch (e) {
    console.log(`Error installing groqfmt-nodejs: ${e.message}`);
  }
}

install();

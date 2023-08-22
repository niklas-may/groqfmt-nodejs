#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const util = require("util");
const mkdirp = require("mkdirp");

const packageJson = JSON.parse(fs.readFileSync(path.join(".", "package.json")));

const execPromise = util.promisify(childProcess.exec);

function validateConfiguration() {
  if (!packageJson.groqfmtBinaries || typeof packageJson.groqfmtBinaries !== "object") {
    throw new Error("'groqfmtBinaries' property must be defined and be an object");
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
    mkdirp(targetDir);

    await execPromise(`curl -L -o ${targetDir}/groqfmt ${binUrl} && chmod +x bin/${fileName}`);
  } catch (e) {
    console.log(`Error installing groqfmt-nodejs: ${e.message}`);
  }
}

install();

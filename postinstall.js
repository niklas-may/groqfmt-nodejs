#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const util = require("util");
const mkdirp = require("mkdirp");

const packageJson = JSON.parse(fs.readFileSync(path.join(".", "package.json")));

const execPromise = util.promisify(childProcess.exec);

function getBinUrl() {
  const url = packageJson.groqfmtBinaries[process.platform];

  if (!url) {
    throw new Error("Installation is not supported for this platform: " + process.platform);
  }

  return url;
}

async function install() {
  try {
    const binUrl = getBinUrl();
    const fileName = path.basename(binUrl).includes(".exe") ? "groqfmt.exe" : "groqfmt";
    const fileDir = path.join(process.cwd(), "bin");
    const filePath = `bin/${fileName}`;
    
    mkdirp(fileDir);
    await execPromise(`curl -L -o ${filePath} ${binUrl} && chmod +x ${filePath}`);
  } catch (e) {
    console.log(`Error installing "${packageJson.name}": ${e.message}`);
  }
}

install();

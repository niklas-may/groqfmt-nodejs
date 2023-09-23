#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const util = require("util");

const packageJson = JSON.parse(fs.readFileSync(path.join(".", "package.json")));

const execPromise = util.promisify(childProcess.exec);

function getBinUrl() {
  let key = process.platform;

  if (key === "linux") {
    // process.arch ‘x32’, ‘x64’, ‘arm’, ‘arm64’, ‘s390’, ‘s390x’, ‘mipsel’, ‘ia32’, ‘mips’, ‘ppc’ and ‘ppc64’.
    key = process.platform + "-" + process.arch;
  }

  const url = packageJson.groqfmtBinaries[key];

  if (!url) {
    throw new Error("Installation is not supported for this platform: " + process.platform);
  }

  return url;
}

async function install() {
  try {
    const binUrl = getBinUrl();
    const fileName = path.basename(binUrl).includes(".exe") ? "groqfmt.exe" : "groqfmt";
    const filePath = `bin/${fileName}`;

    await execPromise(`curl -L -o ${filePath} ${binUrl} && chmod +x ${filePath}`);
  } catch (e) {
    console.log(`Error installing "${packageJson.name}": ${e.message}`);
  }
}

install();

const util = require("util");
const { exec } = require("child_process");
const execProm = util.promisify(exec);
const path = require("path");

const dirName = path.resolve(__dirname);
const tempFilePath = path.join(dirName, "temp.groq");
const binPath = path.join(dirName, "bin/groqfmt");

async function format(str) {
  let result;

  try {
    const strSanitized = str.replace(/"/g, "'");
    result = await execProm(`echo "${strSanitized}" | tee ${tempFilePath} | ${binPath} ${tempFilePath} `);
    return result.stdout;
  } catch (ex) {
    throw new Error(ex);
  }
}

module.exports = { format };

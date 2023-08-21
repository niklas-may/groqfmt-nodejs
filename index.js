const util = require("util");
const { exec } = require("child_process");
const execProm = util.promisify(exec);
const path = require("path");

const dirName = path.resolve(__dirname);

async function format(str) {
  let result;

  const strSanitized = str.replace(/"/g, "'");

  const tempFile = path.join(dirName, "temp.groq");
  const scriptFile = path.join(dirName, "bin/groqfmt");

  try {
    result = await execProm(`echo "${strSanitized}" | tee ${tempFile} | ${scriptFile} ${tempFile} `);
    return result.stdout;
  } catch (ex) {
    throw new Error(ex);
  }
}

module.exports = format;

const fs = require('fs');
const path = require('path');

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  directoryExists: (filePath) => {
    return fs.existsSync(filePath);
  },

  readFileSync: (filePath, type="utf8") => {
    return fs.readFileSync(filePath, type);
  },

  writeFileSync: (filePath, data) =>
  {
    return fs.writeFileSync( filePath, data );
  }
};
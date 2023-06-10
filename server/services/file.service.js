const config = require("config");

class FileSirvice {
  fileSave(files) {
    return files.map(
      (f) => `${config.get("baseURL")}:${config.get("port")}/${f.filename}`
    );
  }
}

module.exports = new FileSirvice();

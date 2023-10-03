import { createRequire } from "module";

export const getFilePath = (file) => {
  const filePath = file.path;
  const fileSplit = filePath.includes("/")
    ? filePath.split("/")
    : filePath.split("\\");
  return `${fileSplit[1]}/${fileSplit[2]}`;
};

export const unlinkImage = (file) => {
  const require = createRequire(import.meta.url);

  const { unlink } = require("fs").promises;
  const path = process.cwd() + "/uploads/" + file;

  unlink(path)
    .then(() => console.log(`File ${path} has been deleted`))
    .catch((error) => console.error(error));
};

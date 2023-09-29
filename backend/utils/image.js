export const getFilePath = (file) => {
  const filePath = file.path;
  const fileSplit = filePath.includes("/")
    ? filePath.split("/")
    : filePath.split("\\");
  return `${fileSplit[1]}/${fileSplit[2]}`;
};

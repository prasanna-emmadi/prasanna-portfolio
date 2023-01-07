import path from "path";
import { readdir, readFile, writeFile, unlink } from "node:fs/promises";
import Showdown from "showdown";
const converter = new Showdown.Converter();
const BLOGS_PATH = "../blogs";

const preHtmlTags = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />


  <!-- Favicons -->
  <link rel="apple-touch-icon" sizes="180x180" href="assets/icons/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="assets/icons/favicon-32x32.png" />

`;

const postHtmlTags = `
</body>
</html>
`;

// get list of file markdowns
// generate them and push them blogs directory
const getFiles = async () => {
  try {
    const files = await readdir(BLOGS_PATH);
    const fileArray = [];
    for (const file of files) {
      const fileFullPath = path.join(BLOGS_PATH, file);
      fileArray.push(fileFullPath);
    }
    console.log(fileArray);
    return fileArray;
  } catch (error) {
    console.error(error);
  }
};

const filterFilesOfType = async (ext) => {
  const files = await getFiles();
  return files.filter((file) => {
    const parsedResult = path.parse(file);
    return parsedResult.ext === ext;
  });
};

const getMarkdownFiles = async () => {
  return await filterFilesOfType(".md");
};

const getHtmlFiles = async () => {
  return await filterFilesOfType(".html");
};

const getFileNameWithoutExtension = (filePath) => {
  const parsedResult = path.parse(filePath);
  return {
    fullPath: path.join(parsedResult.dir, parsedResult.name),
    name: parsedResult.name,
  };
};

const writeHtmlFile = async (filePath, content) => {
  const controller = new AbortController();
  const { signal } = controller;
  await writeFile(filePath, content, { signal });
};

const sanitizeTitle = (title) => {
  return title.replaceAll("_", " ").toLocaleUpperCase();
};

const convertToMarkdown = async (filePath) => {
  try {
    const text = await readFile(filePath, "utf-8");
    const htmlContent = converter.makeHtml(text);
    const { fullPath, name } = getFileNameWithoutExtension(filePath);
    const htmlFile = fullPath + ".html";
    const title = sanitizeTitle(name);
    const titleAndOtherTags = `<title>${title}</title>
</head>
<body>`;

    const allHtmlContent =
      preHtmlTags + titleAndOtherTags + htmlContent + postHtmlTags;
    // write to file in the blogs dir

    writeHtmlFile(htmlFile, allHtmlContent);
  } catch (error) {
    console.error(error);
  }
};

const removeExistingHmtlFiles = async () => {
  try {
    const htmlFiles = await getHtmlFiles();
    const removeFilePromises = htmlFiles.map((htmlFile) => {
      return unlink(htmlFile);
    });
    await Promise.all(removeFilePromises);
  } catch (error) {
    console.error(error);
  }
};

const convert = async () => {
  try {
    await removeExistingHmtlFiles();
    const markDownfilePaths = await getMarkdownFiles();
    const promises = markDownfilePaths.map((markDownfilePath) => {
      return convertToMarkdown(markDownfilePath);
    });
    await Promise.all(promises);
  } catch (error) {
    console.error(error);
  }
};

convert();

# Markdown to Html using Node

## Why
I have decided to write all my blogs in Markdown, as the syntax is easier to perceive compared to html.
Then I had to convert all my Markdown to Html files.

## How
I have done in the following steps
1. Get the list of all existing Markdown files.
2. Convert each one of them to html using a package called [slowdown](https://showdownjs.com/)
3. Write the generated html content to html files

Lets explore each of the steps one by one.

### Steps
#### 1. Getting the list of all existing Markdown files
I have used the node [fs/promises](https://nodejs.org/api/fs.htm)  to 
- fs.readdir to get the array of the files in the directory
- Array.filter method to filter files with ".md" extension

The code is follows
```
const DEST_PATH = "";
const getFiles = async () => {
  try {
    const files = await readdir(DEST_PATH);
    const fileArray = [];
    for (const file of files) {
      const fileFullPath = path.join(DEST_PATH, file);
      fileArray.push(fileFullPath);
    }
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
```

### 2 & 3. Convert Markdown to html files
I have used a package called [slowdown](https://showdownjs.com/) in the following ways
- Create a instance of converter
- Read the contents of the Markdown file 
- Call converter.makeHtml to convert the contents of Markdown file to html

The code is as follows
```

const convertToMarkdown = async (filePath) => {
  try {
    const text = await readFile(filePath, "utf-8");
    const htmlContent = converter.makeHtml(text);
    const preHtmlTags = "<html><body>"; 
    const postHtmlTags = "</body></html>"; 
    const allHtmlContent = preHtmlTags + htmlContent + postHtmlTags;
    // write to file in the blogs dir
    const htmlFile = getFileNameWithoutExtension(filePath) + ".html";

    writeHtmlFile(htmlFile, allHtmlContent);
  } catch (error) {
    console.error(error);
  }
};
```
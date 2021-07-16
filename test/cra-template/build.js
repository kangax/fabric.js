const path = require('path');
const fs = require('fs-extra');
const babel = require("@babel/core");

/**
 * https://babeljs.io/docs/en/babel-preset-typescript#via-node-api
 */
function transformTS(filePath) {
  const data = babel.transformSync(fs.readFileSync(filePath).toString(), {
    presets: ["@babel/preset-typescript"],
    filename: filePath
  });
  return data.code;
}

const EXT = { ts: 'js', tsx: 'js' };

function changeExtension(file) {
  const ext = path.extname(file);
  const basename = path.basename(file, ext);
  return path.join(path.dirname(file), `${basename}.${EXT[ext.slice(1)]}`);
}

function transformTSTraversal(folderPath) {
  const files = {};
  const traverse = (fileName) => {
    const fileExt = path.extname(fileName).slice(1);
    if (fs.lstatSync(fileName).isDirectory()) {
      fs.readdirSync(fileName)
        .forEach(file => {
          traverse(path.join(fileName, file));
        });
    } else if (Object.keys(EXT).some(ext => ext === fileExt) && !fileName.endsWith('.d.ts')) {
      files[changeExtension(path.relative(folderPath, fileName))] = transformTS(fileName);
    }
  }
  traverse(folderPath);
  return files;
}

// build

const srcDir = path.resolve(__dirname, 'common');
const jsDir = path.resolve(__dirname, 'js');
const tsDir = path.resolve(__dirname, 'ts');
const BLACKLIST = [];

function finalizeBuild(templateDir, template) {
  // update template.json
  const templateJSONPath = path.resolve(templateDir, 'template.json');
  const templateData = JSON.parse(fs.readFileSync(templateJSONPath).toString());
  templateData.package.sandboxConfig = {
    fabric: null,
    template
  }
  fs.writeFileSync(templateJSONPath, JSON.stringify(templateData, null, '\t'));

  // update app .env
  const envPath = path.resolve(templateDir, 'template', '.env');
  let env = fs.readFileSync(envPath).toString();
  env += `\nREACT_APP_TEMPLATE=${template}\n`;
  fs.writeFileSync(envPath, env);

  // copy sandbox.js
  const sandboxPath = path.resolve(__dirname, 'sandbox.js');
  fs.copySync(sandboxPath, path.resolve(templateDir, 'template', 'sandbox.js'));
}

function buildJSTemplate() {
  // copy non ts files
  fs.copySync(srcDir, jsDir, {
    filter: (src, dest) => {
      if (BLACKLIST.some(p => p.endsWith(path.basename(src)))) return false;
      const fileExt = path.extname(src).slice(1);
      return Object.keys(EXT).every(ext => ext !== fileExt) || src.endsWith('.d.ts');
    }
  });

  // transform ts files to js and write to folder
  const files = transformTSTraversal(srcDir);
  for (const fileName in files) {
    const dest = path.resolve(jsDir, fileName);
    fs.ensureFileSync(dest, files[fileName]);
    fs.writeFileSync(dest, files[fileName]);
  }

  finalizeBuild(jsDir, 'js');
}

function buildTSTemplate() {
  // copy files
  fs.copySync(srcDir, tsDir, {
    filter: (src, dest) => {
      if (BLACKLIST.some(p => p.endsWith(path.basename(src)))) return false;
      return true;
    }
  });

  finalizeBuild(tsDir, 'ts');
}

buildJSTemplate();
buildTSTemplate();

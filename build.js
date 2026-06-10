const fs = require("fs");
const path = require("path");

const dist = path.join(__dirname, "dist");

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });

  for (const item of fs.readdirSync(src)) {
    const from = path.join(src, item);
    const to = path.join(dest, item);
    const stat = fs.statSync(from);

    if (stat.isDirectory()) {
      copyDir(from, to);
    } else {
      copyFile(from, to);
    }
  }
}

if (fs.existsSync(dist)) {
  fs.rmSync(dist, { recursive: true, force: true });
}

fs.mkdirSync(dist, { recursive: true });

copyFile("index.html", path.join(dist, "index.html"));
copyFile("style.css", path.join(dist, "style.css"));

copyDir("pricing", path.join(dist, "pricing"));
copyDir("terms", path.join(dist, "terms"));
copyDir("privacy", path.join(dist, "privacy"));
copyDir("refund", path.join(dist, "refund"));
copyDir("contact", path.join(dist, "contact"));

console.log("Static website copied to dist successfully.");
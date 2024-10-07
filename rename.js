const fs = require('fs');
const path = require('path');

// 定义源目录和目标目录
const distDir = path.join(__dirname, 'dist');
const docsDir = path.join(__dirname, 'docs');

// 检查 dist 文件夹是否存在
if (fs.existsSync(distDir)) {
    // 如果 docs 文件夹已存在，则删除它
    if (fs.existsSync(docsDir)) {
        fs.rmdirSync(docsDir, { recursive: true });
    }

    // 将 dist 文件夹重命名为 docs
    fs.renameSync(distDir, docsDir);
    console.log('Successfully renamed "dist" to "docs".');
} else {
    console.log('The "dist" directory does not exist.');
}

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

// 处理博客提交请求
app.post('/submit-blog', (req, res) => {
    const content = req.body.content;
    const timestamp = new Date().toISOString();
    const filename = path.join(__dirname, '_posts', `${timestamp}.md`);

    fs.writeFile(filename, content, (err) => {
        if (err) {
            return res.status(500).send('Error saving the file.');
        }
        res.send('File saved successfully.');
    });
});

// 获取博客列表
app.get('/blogs', (req, res) => {
    fs.readdir(path.join(__dirname, '_posts'), (err, files) => {
        if (err) {
            return res.status(500).send('Error reading the directory.');
        }
        const blogs = files.map(file => ({
            filename: file,
            url: `/posts/${file}`
        }));
        res.json(blogs);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

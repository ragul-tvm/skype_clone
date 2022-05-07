const express = require('express');
const path = require('path');

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'))
})
app.get('/:fileName', (req, res) => {
    res.sendFile(path.join(__dirname, req.params.fileName))
})
app.get('/Front_end/Personal_portfolio_ubuntu_style/images/:imageName', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Front_end/Personal_portfolio_ubuntu_style/images/', req.params.imageName))
})


app.listen(3003, () => console.log('Front-end server is started'))
const fs = require('fs');
const path = require('path');

function getData(file = "") {
    const json = fs.readFileSync(path.join(__dirname, file), 'utf-8');
    return JSON.parse(json)
};



module.exports = {
    getData
};
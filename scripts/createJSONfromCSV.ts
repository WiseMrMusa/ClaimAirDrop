let csvToJson = require('convert-csv-to-json');

let fileInputName = './files/Untitled.csv'; 
let fileOutputName = './files/data.json';

csvToJson.fieldDelimiter(',').generateJsonFileFromCsv(fileInputName,fileOutputName);
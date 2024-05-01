// const fs = require('fs');
// const xlsx = require('xlsx');

// async function readExcelData() {
//     const excelFilePath = 'Dynamic_RCS_Sheet (1).xlsx';

//     // Read Excel file
//     const workbook = xlsx.readFile(excelFilePath);
//     const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
//     const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

//     // Array to store Excel data
//     let exceldata = [];

//     for (let i = 1; i < sheetData.length; i++) {
//         const row = sheetData[i];

//         const file = {
//             mno: row.__EMPTY,
//             name: row.__EMPTY_1,
//             Card_Title_V1: row.__EMPTY_2,
//             cardDesc_V1: row.__EMPTY_3,
//             SuggR_V1: row.__EMPTY_4,
//             SuggUrl_V1: row.__EMPTY_5,
//             SuggDial_V1: row.__EMPTY_6,
//         };

//         exceldata.push(file);
//     }

//     return exceldata;
// }

// const jsondata = {
//     "name": "[cuestomeVar]",
//     "type": "rich_card",
//     "orientation": "VERTICAL",
//     "height": "SHORT_HEIGHT",
//     "standAlone": {
//         "cardTitle": "Hi [cuestomeVar]",
//         "cardDescription": "Hello, [cuestomeVar]",
//         "fileName": "fileName",
//         "thumbnailFileName": "1695720018215.jpeg"
//     },
//     "suggestions": [
//         {
//             "suggestionType": "reply",
//             "displayText": "[cuestomeVar]",
//             "postback": "IR"
//         },
//         {
//             "suggestionType": "url_action",
//             "displayText": "[cuestomeVar]",
//             "postback": "www.answer&win.com",
//             "url": "www.answer&win.com"
//         }
//     ]
// };

// async function main() {
//     const exceldata = await readExcelData();
//     // Do whatever you want with exceldata here
//     console.log('Excel data:', exceldata);

//     let modifiedJsonDataArray = [];

//     for (let i = 0; i < exceldata.length; i++) {
//         const currentName = exceldata[i].name;

//         // Clone the jsondata object
//         let modifiedJsonData = JSON.parse(JSON.stringify(jsondata));

//         // Replace [cuestomeVar] with the current name
//         modifiedJsonData.name = currentName;
//         modifiedJsonData.standAlone.cardTitle = `Hi ${currentName}`;
//         modifiedJsonData.standAlone.cardDescription = `Hello, ${currentName}`;
//         modifiedJsonData.suggestions[0].displayText = currentName;
//         modifiedJsonData.suggestions[1].displayText = currentName;

//         const finalData = {
//             mobileNumber : exceldata[i].mno,
//             data : modifiedJsonData
//         }

//         modifiedJsonDataArray.push(JSON.stringify(finalData));
//     }

//     console.log('Modified JSON data array:', modifiedJsonDataArray);
// }

// main();




const fs = require('fs');
const xlsx = require('xlsx');

async function readExcelData() {
    const excelFilePath = 'Dynamic_RCS_Sheet (1).xlsx';

    // Read Excel file
    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Array to store Excel data
    let exceldata = [];

    for (let i = 1; i < sheetData.length; i++) {
        const row = sheetData[i];

        const file = {
            mno: row.__EMPTY,
            name: row.__EMPTY_1,
            Card_Title_V1: row.__EMPTY_2,
            cardDesc_V1: row.__EMPTY_3,
            SuggR_V1: row.__EMPTY_4,
            SuggUrl_V1: row.__EMPTY_5,
            SuggDial_V1: row.__EMPTY_6,
        };

        exceldata.push(file);
    }

    return exceldata;
}

const jsondata = {
    "name": "[cuestomeVar]",
    "type": "rich_card",
    "orientation": "VERTICAL",
    "height": "SHORT_HEIGHT",
    "standAlone": {
        "cardTitle": "Hi [cuestomeVar]",
        "cardDescription": "Hello, [cuestomeVar]",
        "fileName": "fileName",
        "thumbnailFileName": "1695720018215.jpeg"
    },
    "suggestions": [
        {
            "suggestionType": "reply",
            "displayText": "[cuestomeVar]",
            "postback": "IR"
        },
        {
            "suggestionType": "url_action",
            "displayText": "[cuestomeVar]",
            "postback": "www.answer&win.com",
            "url": "www.answer&win.com"
        }
    ]
};

async function main() {
    const exceldata = await readExcelData();
    // Do whatever you want with exceldata here
    console.log('Excel data:', exceldata);

    const chunkSize = 2; // Set the chunk size
    let count = 0;
    let modifiedJsonDataArray = [];

    for (let i = 0; i < exceldata.length; i++) {
        const currentName = exceldata[i].name;

        // Clone the jsondata object
        let modifiedJsonData = JSON.parse(JSON.stringify(jsondata));

        // Replace [cuestomeVar] with the current name
        modifiedJsonData.name = currentName;
        modifiedJsonData.standAlone.cardTitle = `Hi ${currentName}`;
        modifiedJsonData.standAlone.cardDescription = `Hello, ${currentName}`;
        modifiedJsonData.suggestions[0].displayText = currentName;
        modifiedJsonData.suggestions[1].displayText = currentName;

        const finalData = {
            mobileNumber : exceldata[i].mno,
            data : modifiedJsonData
        }

        modifiedJsonDataArray.push(JSON.stringify(finalData));
        count++;

        // Log the count
        console.log('Processed mno count:', count);

        // If reached the chunk size or processed all data, send the chunk
        if (count === chunkSize || i === exceldata.length - 1) {
            console.log('Sending modified data chunk:', modifiedJsonDataArray);
            // Code to send modifiedJsonDataArray to your desired destination goes here

            // Reset counters and array for the next chunk
            count = 0;
            modifiedJsonDataArray = [];
        }
    }
}

main();

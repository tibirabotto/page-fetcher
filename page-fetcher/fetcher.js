const request = require('request');
const fs = require('fs');

const url = process.argv[2];
const filePath = process.argv[3];

if (fs.existsSync(filePath)) {
    console.error('File already exists');
} else {

    try {
        new URL(url);
    } catch (error) {
        console.error('Invalid URL. Please provide a valid URL.');
        process.exit(1);
    }

    request(url, (error, response, body) => {
        if (error) {
            console.error('Error:', error);
        } else if (response.statusCode != 200) {
            console.error('Invalid Status Code:', response.statusCode);
        } else {
            fs.writeFile(filePath, body, (error) => {
                if (error) {
                    console.error('Error writing file:', error);
                } else {
                    const bytes = Buffer.byteLength(body, 'utf8');
                    console.log(`Downloaded and saved ${bytes} bytes to ${filePath}`);
                }
            });
        }
    });
}
import path from 'path';
import fs from 'fs';
import ip from 'ip';

const savePaths = [
    '../../../configs/axios/src/server.json',
    '../../../dashboard/src/configs/server.json',
];

export default function createServerConfigurations() {
    let obj = {};
    if (process.env.IS_LOCAL) {
        obj = {
            url: `http://${ip.address()}:${process.env.PORT}`,
        };
    } else {
        obj = {
            url: process.env.SERVER_URL,
        };
    }
    const str = JSON.stringify(obj);
    savePaths.forEach((file) => {
        const filePath = path.resolve(__dirname, file);
        fs.writeFileSync(filePath, str);
    });
}

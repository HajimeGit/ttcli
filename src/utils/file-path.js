import path from 'path';

const fileName = 'ttcli-list.json';

export const getJsonFilePath = (name) => path.join(process.cwd(), fileName);

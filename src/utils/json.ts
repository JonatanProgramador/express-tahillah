import fs from 'node:fs';
import ENV from '../env';
import path from 'node:path';

class Json {

    static async readJson(name: string) {
        return await fs.promises.readFile(path.resolve(ENV.path, 'json', name), 'utf-8');
    }

    static async writeJson(name: string, data: string) {
        try {
            await fs.promises.writeFile(path.resolve(ENV.path, 'json', name), data, 'utf-8');
            return true;
        } catch {
            return false;
        }
    }
}

export default Json
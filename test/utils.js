import { mkdtemp, readFile }    from 'fs/promises';
import { tmpdir }               from 'os';
import { join }                 from 'path';
import { fileURLToPath }        from 'url';

export const createTempDirectory = () => mkdtemp(join(tmpdir(), '/'));

export const joinPath = (...paths) => join(projectRoot, ...paths);

export async function loadJSON(fileName)
{
    const text = await readFile(fileName);
    const value = JSON.parse(text);
    return value;
}

export const projectRoot = fileURLToPath(new URL('..', import.meta.url));

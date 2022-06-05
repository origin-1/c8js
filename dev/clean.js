#!/usr/bin/env node

import { deleteDirectory } from '../lib/utils.js';

const baseURL = new URL('..', import.meta.url);
const promises =
['coverage', 'docs', 'tmp'].map(dirName => deleteDirectory(new URL(dirName, baseURL)));
await Promise.all(promises);

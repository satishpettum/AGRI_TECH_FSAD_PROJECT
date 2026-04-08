import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import babel from '@babel/core';

const srcDir = path.resolve('./src');

const tsFiles = globSync('**/*.{ts,tsx}', { cwd: srcDir, absolute: true });

console.log(`Found ${tsFiles.length} ts/tsx files to transform.`);

let successCount = 0;
let failCount = 0;

for (const file of tsFiles) {
    try {
        if (file.endsWith('.d.ts')) {
            console.log(`Skipping declaration file ${file}`);
            continue;
        }

        const isTsx = file.endsWith('.tsx');
        const newExt = isTsx ? '.jsx' : '.js';
        const newFile = file.slice(0, -path.extname(file).length) + newExt;

        // Read file contents
        const code = fs.readFileSync(file, 'utf-8');

        // Transform with Babel to strip TS but preserve JSX
        const result = babel.transformSync(code, {
            filename: file,
            presets: [
                ['@babel/preset-typescript', {
                    isTSX: true,
                    allExtensions: true
                }],
            ],
            // Retain line numbers and comments as much as possible
            retainLines: true,
            generatorOpts: {
                retainLines: true,
            },
            plugins: [
                '@babel/plugin-syntax-jsx'
            ]
        });

        if (result && result.code) {
            fs.writeFileSync(newFile, result.code, 'utf-8');

            // Delete original typescript file
            fs.unlinkSync(file);
            successCount++;
        } else {
            console.error(`Failed to transform (no output): ${file}`);
            failCount++;
        }

    } catch (error) {
        console.error(`Error processing ${file}:`, error);
        failCount++;
    }
}

console.log(`Transformation complete. ${successCount} successful, ${failCount} failed.`);

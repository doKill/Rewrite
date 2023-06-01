import fs from 'fs';
import path from 'path';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { rimraf } from 'rimraf';

const files = fs.readdirSync('src');
const entries = files.reduce((obj, file) => {
    if (path.extname(file) === '.js') {
        const name = path.basename(file, '.js');
        obj[name] = `src/${file}`;
    }
    return obj;
}, {});

rimraf('dist');

export default {
    input: entries,
    output: {
        dir: 'dist',
        format: 'cjs',
        strict: false
    },
    plugins: [
        babel({
            exclude: 'node_modules/**',
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-optional-chaining']
        }),
        terser()
    ]
};

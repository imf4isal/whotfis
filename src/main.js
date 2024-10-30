#!/usr/bin/env node

import chalk from 'chalk';
import boxen from 'boxen';
import fetch from 'node-fetch';

const theme = {
    primary: '#10B981',
    secondary: '#6EE7B7',
    text: '#E2E8F0',
    dim: '#94A3B8',
};

const username = process.argv[2];
if (!username) {
    console.error('Please provide a GitHub username');
    console.error('Usage: whothefuckis <github-username>');
    process.exit(1);
}

const GISTS_URL = `https://api.github.com/users/${username}/gists`;

async function fetchData() {
    try {
        const response = await fetch(GISTS_URL);
        const gists = await response.json();

        if (!Array.isArray(gists)) {
            throw new Error('User not found or API rate limit exceeded');
        }

        const wtfisGist = gists.find(
            (gist) => gist.files && 'wtfis.json' in gist.files
        );

        if (!wtfisGist) {
            throw new Error(`No wtfis.json found for user ${username}`);
        }

        const wtfisFile = wtfisGist.files['wtfis.json'];
        const contentResponse = await fetch(wtfisFile.raw_url);
        const data = await contentResponse.json();

        return data;
    } catch (error) {
        console.error(chalk.red('Error:'), error.message);
        process.exit(1);
    }
}

function generateAscii(name) {
    const letters = {
        A: [
            '█████╗ ',
            '██╔══██╗',
            '███████║',
            '██╔══██║',
            '██║  ██║',
            '╚═╝  ╚═╝',
        ],
        B: [
            '██████╗ ',
            '██╔══██╗',
            '██████╔╝',
            '██╔══██╗',
            '██████╔╝',
            '╚═════╝ ',
        ],
        C: [
            ' ██████╗',
            '██╔════╝',
            '██║     ',
            '██║     ',
            '╚██████╗',
            ' ╚═════╝',
        ],
        D: [
            '██████╗ ',
            '██╔══██╗',
            '██║  ██║',
            '██║  ██║',
            '██████╔╝',
            '╚═════╝ ',
        ],
        E: [
            '███████╗',
            '██╔════╝',
            '█████╗  ',
            '██╔══╝  ',
            '███████╗',
            '╚══════╝',
        ],
        F: [
            '███████╗',
            '██╔════╝',
            '█████╗  ',
            '██╔══╝  ',
            '██║     ',
            '╚═╝     ',
        ],
        G: [
            ' ██████╗',
            '██╔════╝',
            '██║  ███╗',
            '██║   ██║',
            '╚██████╔╝',
            ' ╚═════╝ ',
        ],
        H: [
            '██╗  ██╗',
            '██║  ██║',
            '███████║',
            '██╔══██║',
            '██║  ██║',
            '╚═╝  ╚═╝',
        ],
        I: ['██╗', '██║', '██║', '██║', '██║', '╚═╝'],
        J: [
            '     ██╗',
            '     ██║',
            '     ██║',
            '██   ██║',
            '╚█████╔╝',
            ' ╚════╝ ',
        ],
        K: [
            '██╗  ██╗',
            '██║ ██╔╝',
            '█████╔╝ ',
            '██╔═██╗ ',
            '██║  ██╗',
            '╚═╝  ╚═╝',
        ],
        L: [
            '██╗     ',
            '██║     ',
            '██║     ',
            '██║     ',
            '███████╗',
            '╚══════╝',
        ],
        M: [
            '███╗   ███╗',
            '████╗ ████║',
            '██╔████╔██║',
            '██║╚██╔╝██║',
            '██║ ╚═╝ ██║',
            '╚═╝     ╚═╝',
        ],
        N: [
            '███╗   ██╗',
            '████╗  ██║',
            '██╔██╗ ██║',
            '██║╚██╗██║',
            '██║ ╚████║',
            '╚═╝  ╚═══╝',
        ],
        O: [
            ' ██████╗',
            '██╔═══██╗',
            '██║   ██║',
            '██║   ██║',
            '╚██████╔╝',
            ' ╚═════╝ ',
        ],
        P: [
            '██████╗ ',
            '██╔══██╗',
            '██████╔╝',
            '██╔═══╝ ',
            '██║     ',
            '╚═╝     ',
        ],
        Q: [
            ' ██████╗ ',
            '██╔═══██╗',
            '██║   ██║',
            '██║▄▄ ██║',
            '╚██████╔╝',
            ' ╚══▀▀═╝ ',
        ],
        R: [
            '██████╗ ',
            '██╔══██╗',
            '██████╔╝',
            '██╔══██╗',
            '██║  ██║',
            '╚═╝  ╚═╝',
        ],
        S: [
            '███████╗',
            '██╔════╝',
            '███████╗',
            '╚════██║',
            '███████║',
            '╚══════╝',
        ],
        T: [
            '████████╗',
            '╚══██╔══╝',
            '   ██║   ',
            '   ██║   ',
            '   ██║   ',
            '   ╚═╝   ',
        ],
        U: [
            '██╗   ██╗',
            '██║   ██║',
            '██║   ██║',
            '██║   ██║',
            '╚██████╔╝',
            ' ╚═════╝ ',
        ],
        V: [
            '██╗   ██╗',
            '██║   ██║',
            '██║   ██║',
            '╚██╗ ██╔╝',
            ' ╚████╔╝ ',
            '  ╚═══╝  ',
        ],
        W: [
            '██╗    ██╗',
            '██║    ██║',
            '██║ █╗ ██║',
            '██║███╗██║',
            '╚███╔███╔╝',
            ' ╚══╝╚══╝ ',
        ],
        X: [
            '██╗  ██╗',
            '╚██╗██╔╝',
            ' ╚███╔╝ ',
            ' ██╔██╗ ',
            '██╔╝ ██╗',
            '╚═╝  ╚═╝',
        ],
        Y: [
            '██╗   ██╗',
            '╚██╗ ██╔╝',
            ' ╚████╔╝ ',
            '  ╚██╔╝  ',
            '   ██║   ',
            '   ╚═╝   ',
        ],
        Z: [
            '███████╗',
            '╚══███╔╝',
            '  ███╔╝ ',
            ' ███╔╝  ',
            '███████╗',
            '╚══════╝',
        ],
    };

    const chars = name.toUpperCase().split('');

    let asciiLines = ['', '', '', '', '', ''];

    chars.forEach((char) => {
        if (letters[char]) {
            letters[char].forEach((line, index) => {
                asciiLines[index] += line;
            });
        }
    });

    return '\n    ' + asciiLines.join('\n    ');
}

function generateSection(key, data) {
    if (typeof data !== 'object' || data === null) return '';

    const entries = Object.entries(data);
    if (entries.length === 0) return '';

    const header = `${chalk.hex(theme.text).bold(`$ ${key.toLowerCase()}`)}`;

    const maxKeyLength = Math.max(...entries.map(([key]) => key.length));

    const lines = entries.map((entry, index) => {
        const [itemKey, itemValue] = entry;
        const isFirst = index === 0;
        const isLast = index === entries.length - 1;
        const prefix = isFirst ? '┌' : isLast ? '└' : '├';

        const formattedKey = itemKey.charAt(0).toUpperCase() + itemKey.slice(1);
        const padding = ' '.repeat(maxKeyLength - formattedKey.length);

        const formattedValue = itemValue.startsWith('http')
            ? chalk.hex(theme.dim).underline(itemValue)
            : chalk.hex(theme.text)(itemValue);

        return `${chalk.hex(theme.dim)(prefix)} ${chalk
            .hex(theme.text)
            .bold(formattedKey)}${padding}  ${formattedValue}`;
    });

    return `\n\n    ${header}
    ${lines.join('\n    ')}`;
}

async function main() {
    const data = await fetchData();

    const ascii = generateAscii(data.name);

    let output = `${chalk.hex(theme.primary)(ascii)}

    ${chalk.hex(theme.text).bold('$ whoami')}
    ${chalk.hex(theme.secondary)(data.designation)}`;

    for (const [key, value] of Object.entries(data)) {
        if (key === 'name' || key === 'designation') continue;
        output += generateSection(key, value);
    }

    output += `\n\n\n    ${chalk.hex(theme.dim)(
        '// Thanks for checking out!'
    )}`;

    console.log(
        boxen(output, {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: theme.primary,
            float: 'center',
        })
    );
}

main().catch((error) => {
    console.error(chalk.red('Error:'), error.message);
    process.exit(1);
});

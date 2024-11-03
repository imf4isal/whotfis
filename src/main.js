#!/usr/bin/env node

import chalk from 'chalk';
import boxen from 'boxen';
import fetch from 'node-fetch';
import getGithubContribution from './gh-contribution.js';

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
const PUBLIC_INFORMATION_URL = `https://api.github.com/users/${username}`;

let isGistAvailable = true;

async function fetchData() {
    try {
        const response = await fetch(GISTS_URL);
        const gists = await response.json();

        if (!Array.isArray(gists)) {
            throw new Error('User not found or API rate limit exceeded');
        }

        const whotfisGist = gists.find(
            (gist) => gist.files && 'whotfis.json' in gist.files
        );

        if (!whotfisGist) {
            isGistAvailable = false;
            const publicResponse = await fetch(PUBLIC_INFORMATION_URL);
            const publicInfo = await publicResponse.json();

            const overview = {
                github: publicInfo.html_url,
            };

            if (publicInfo.email) {
                overview.email = publicInfo.email;
            }

            if (publicInfo.bio) {
                overview.bio = publicInfo.bio;
            }

            if (publicInfo.blog) {
                overview.blog = publicInfo.blog;
            }

            if (publicInfo.twitter_username) {
                overview.x = `https://x.com/${publicInfo.twitter_username}`;
            }

            if (publicInfo.location) {
                overview.location = publicInfo.location;
            }

            if (publicInfo.company) {
                overview.company = publicInfo.company;
            }

            return {
                name: publicInfo.login,
                designation: publicInfo.name,
                overview: overview,
            };
        }

        const whotfisFile = whotfisGist.files['whotfis.json'];
        const contentResponse = await fetch(whotfisFile.raw_url);
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
            ' █████╗ ',
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
            ' ██████╗ ',
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

        const formattedValue =
            typeof itemValue === 'string' && itemValue.startsWith('http')
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
    const contributions = await getGithubContribution(data.name);
    const ascii = generateAscii(data.name);

    let output = `${chalk.hex(theme.primary)(ascii)}


    ${chalk.hex(theme.text).bold('$ whoami')}
    ${chalk.hex(theme.secondary)(data.designation)}`;

    for (const [key, value] of Object.entries(data)) {
        if (key === 'name' || key === 'designation') continue;
        output += generateSection(key, value);
    }

    output += `\n\n    ${chalk.hex(theme.text).bold('$ github contributions')}
    ${' '.repeat(4)}${chalk.hex(theme.text).bold(contributions)}${' '.repeat(
        4
    )}`;

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

    if (!isGistAvailable) {
        console.log(
            `${chalk.hex(theme.text)(
                `Note: The information is fetched from the public profile.`
            )}
      \n${chalk.hex(theme.text)(
          'Customize your profile view by visiting'
      )} ${chalk
                .hex(theme.dim)
                .underline('https://github.com/imf4isal/whotfis')}`
        );
    }
}

main().catch((error) => {
    console.error(chalk.red('Error:'), error.message);
    process.exit(1);
});

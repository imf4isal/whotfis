import chalk from 'chalk';
import {
    getOppositeColor,
    getSampleContribution,
    fetchGithubContribution,
} from './utils/github.js';
import fs from 'fs';

export default async function getGithubContribution(username) {
    const contributions = await fetchGithubContribution(username);
    // const contributions = await getSampleContribution(
    //     "contributions-sample.json"
    // );

    const weeklyContribution =
        contributions.data.user.contributionsCollection.contributionCalendar
            .weeks;

    if (!weeklyContribution) {
        console.log('ERROR: Contribution not found.');
        return;
    }

    let formattedWeeklyContribution = {
        _1: [],
        _2: [],
        _3: [],
        _4: [],
        _5: [],
        _6: [],
        _7: [],
    };

    weeklyContribution.forEach((item, index) => {
        const contributionDays = item.contributionDays;
        formattedWeeklyContribution._1[index] = contributionDays[0];
        formattedWeeklyContribution._2[index] = contributionDays[1];
        formattedWeeklyContribution._3[index] = contributionDays[2];
        formattedWeeklyContribution._4[index] = contributionDays[3];
        formattedWeeklyContribution._5[index] = contributionDays[4];
        formattedWeeklyContribution._6[index] = contributionDays[5];
        formattedWeeklyContribution._7[index] = contributionDays[6];
    });

    const leftPadding = ' '.repeat(4);
    const rightPadding = ' '.repeat(4);

    let chart = '';
    Object.entries(formattedWeeklyContribution).forEach(([key, value]) => {
        const week = value;
        let chartRow = leftPadding;
        week.forEach((day) => {
            const color = day?.contributionCount > 0 ? day?.color : '#292929';
            chartRow = chartRow + ' ' + chalk.hex(color ?? '#00000000')('■');
        });
        chartRow += rightPadding;
        chart = chart + '\n' + chartRow;
    });

    return chart;
}

import { TRIVIAL_PASSWORDS } from './trivial_passwords';

function checkRule(pass,rule) {
    let regex = new RegExp(rule,'g');
    let matches = pass.match(regex);
    if (matches) return {
        pass: true,
        n: matches.length
    }
    else return {
        pass: false,
        n: 0
    }
}

function getUniqueCount(str) {
    if (!str || !str.length) return 0;

    let found = [];
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (found.indexOf(str[i]) === -1) {
            count ++;
            found.push(str[i]);
        }
    }
    return count;
}

function matchTrivials(pass) {
    let count = 0;
    let len = 0;
    TRIVIAL_PASSWORDS.forEach((word)=>{
        let matches = pass.match(new RegExp(word,'g'));
        if (matches) {
            count += matches.length;
            len += word.length*matches.length;
        }
    })
    return {count,len};
}

export function passrank(pass) {
    if (!pass || !pass.length) return 0;

    let rules = {
        CONTAINS_LOWER_CASE: '[a-z]',
        CONTAINS_UPPER_CASE: '[A-Z]',
        CONTAINS_NUMBERS: '[0-9]',
        CONTAINS_SYMBOLS: '[!,.@#$%^&*?_~()[]{} ]',

        MIXES_CASING: '((?=[a-z][A-Z]+|[A-Z][a-z]+))',
        MIXES_LETTERS_NUMBERS: '((?=[a-zA-Z][0-9]+|[0-9][a-zA-Z]+))',
        MIXES_SIGNS: '((?=[a-zA-Z0-9][!,.@#$%^&*?_~()[]{} ]+|[!,.@#$%^&*?_~()[]{} ][a-zA-Z0-9]+))',
    }

    let checks = {};

    for (let rule in rules) {
        checks[rule] = checkRule(pass,rules[rule]);
    }

    let rank = 0;


    let uniques = getUniqueCount(pass);

////////////////////////////

    let mixBonus = checks.MIXES_CASING.n + checks.MIXES_LETTERS_NUMBERS.n + checks.MIXES_SIGNS.n;

    if (checks.CONTAINS_NUMBERS.pass &&
        checks.CONTAINS_SYMBOLS.pass &&
        checks.CONTAINS_LOWER_CASE.pass &&
        checks.CONTAINS_UPPER_CASE.pass) {

        rank += (Math.pow(uniques,1.3) * Math.pow(Math.max(1,mixBonus),1.35) * Math.pow(pass.length,1.35));

    }
    else if (checks.CONTAINS_NUMBERS.pass &&
        checks.CONTAINS_SYMBOLS.pass &&
        (checks.CONTAINS_LOWER_CASE.pass || checks.CONTAINS_UPPER_CASE.pass)) {

        rank += (Math.pow(uniques,1.25) * Math.pow(Math.max(1,mixBonus),1.25) * Math.pow(pass.length,1.25));

    }
    else if (checks.CONTAINS_LOWER_CASE.pass && checks.CONTAINS_UPPER_CASE.pass && checks.CONTAINS_SYMBOLS.pass) {

        rank += (Math.pow(uniques,1.25) * Math.pow(Math.max(1,mixBonus),1.25) * Math.pow(pass.length,1.25));

    }
    else if (checks.CONTAINS_NUMBERS.pass &&
        checks.CONTAINS_SYMBOLS.pass) {

        rank += (Math.pow(uniques,1.2) * Math.pow(Math.max(1,mixBonus),1.2) * Math.pow(pass.length,1.2));

    }
    else if ((checks.CONTAINS_LOWER_CASE.pass || checks.CONTAINS_UPPER_CASE.pass) &&
             checks.CONTAINS_SYMBOLS.pass) {

        rank += (Math.pow(uniques,1.15) * Math.pow(Math.max(1,mixBonus),1.15) * Math.pow(pass.length,1.2));

    }
    else if (checks.CONTAINS_LOWER_CASE.pass && checks.CONTAINS_UPPER_CASE.pass) {

        rank += (Math.pow(uniques,1.15) * Math.pow(Math.max(1,mixBonus),1.15) * Math.pow(pass.length,1.2));

    }
    else {
        rank += Math.pow(uniques,1.1) * Math.pow(Math.max(1,mixBonus),1.1) * Math.pow(pass.length,1.1);
    }




////////////////////////////

    rank=Math.round(Math.log(rank)*Math.sqrt((uniques >= 3 ? uniques : 1)*(pass.length >= 8 ? Math.sqrt(pass.length) : 1)));
    if (pass.length >= 15) rank = rank * Math.pow((pass.length-14),1.02)
    if (pass.length >= 8 && uniques >= 6) rank = rank * Math.pow((pass.length-7),1.02)

/*
    let triviaMatch = matchTrivials(pass);
    if (triviaMatch.count) {
        console.log(triviaMatch)
        rank = rank/(triviaMatch.count / (pass.length/triviaMatch.len) )
    }
*/

    //Normalize
    if (rank >= 450) rank = 100;
    else if (rank >= 50) rank = 50 + 50*((rank-50)/400);
    else rank = rank;

    return Math.round(rank);
}


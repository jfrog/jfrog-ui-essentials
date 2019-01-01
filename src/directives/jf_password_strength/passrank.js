import { TRIVIAL_PASSWORDS } from './trivial_passwords';   


function checkRule(pass, rule) {
    let regex = new RegExp(rule, 'g');
    let matches = pass.match(regex);
    if (matches)
        return {
            pass: true,
            n: matches.length
        };
    else
        return {
            pass: false,
            n: 0
        };
}   


function getUniqueCount(str) {
    if (!str || !str.length)
        return 0;

    let found = [];
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (found.indexOf(str[i]) === -1) {
            count++;
            found.push(str[i]);
        }
    }
    return count;
}   


function matchTrivials(pass) {
    let count = 0;
    let len = 0;
    TRIVIAL_PASSWORDS.forEach(word => {
        let matches = pass.match(new RegExp(word, 'g'));
        if (matches) {
            count += matches.length;
            len += word.length * matches.length;
        }
    });
    return {
        count,
        len
    };
}   

export function passrank(pass) {
    if (!pass || !pass.length)
        return 0;

    let rules = {
        CONTAINS_LOWER_CASE: '[a-z]',
        CONTAINS_UPPER_CASE: '[A-Z]',
        CONTAINS_NUMBERS: '[0-9]',
        CONTAINS_SYMBOLS: '[^A-Za-z0-9]',

        MIXES_CASING: '((?=[a-z][A-Z]+|[A-Z][a-z]+))',
        MIXES_LETTERS_NUMBERS: '((?=[a-zA-Z][0-9]+|[0-9][a-zA-Z]+))',
        MIXES_SIGNS: '((?=[a-zA-Z0-9][^A-Za-z0-9]+|[^A-Za-z0-9][a-zA-Z0-9]+))'
    };

    let checks = {};

    for (let rule in rules) {
        checks[rule] = checkRule(pass, rules[rule]);
    }

    let rank = 0;


    let uniques = getUniqueCount(pass);

    ////////////////////////////

    let mixBonus = checks.MIXES_CASING.n + checks.MIXES_LETTERS_NUMBERS.n + checks.MIXES_SIGNS.n;

    let debugStr = '';

    if (checks.CONTAINS_NUMBERS.pass && checks.CONTAINS_SYMBOLS.pass && checks.CONTAINS_LOWER_CASE.pass && checks.CONTAINS_UPPER_CASE.pass) {

        debugStr += 'N+S+L+U';

        rank += Math.pow(uniques, 4) * Math.pow(Math.max(1, mixBonus), 4) * Math.pow(pass.length, 2);   

    } else if (checks.CONTAINS_NUMBERS.pass && checks.CONTAINS_SYMBOLS.pass && (checks.CONTAINS_LOWER_CASE.pass || checks.CONTAINS_UPPER_CASE.pass)) {

        debugStr += 'N+S+(L|U)';

        rank += Math.pow(uniques, 3) * Math.pow(Math.max(1, mixBonus), 3) * Math.pow(pass.length, 2.5);   

    } else if (checks.CONTAINS_LOWER_CASE.pass && checks.CONTAINS_UPPER_CASE.pass && checks.CONTAINS_SYMBOLS.pass) {

        debugStr += 'S+L+U';

        rank += Math.pow(uniques, 3) * Math.pow(Math.max(1, mixBonus), 4) * Math.pow(pass.length, 3);   

    } else if (checks.CONTAINS_LOWER_CASE.pass && checks.CONTAINS_UPPER_CASE.pass && checks.CONTAINS_NUMBERS.pass) {

        debugStr += 'N+L+U';

        rank += Math.pow(uniques, 3) * Math.pow(Math.max(1, mixBonus), 3) * Math.pow(pass.length, 3);   

    } else if (checks.CONTAINS_NUMBERS.pass && checks.CONTAINS_SYMBOLS.pass) {

        debugStr += 'N+S';

        rank += Math.pow(uniques, 2) * Math.pow(Math.max(1, mixBonus), 2) * Math.pow(pass.length, 2);   

    } else if ((checks.CONTAINS_LOWER_CASE.pass || checks.CONTAINS_UPPER_CASE.pass) && checks.CONTAINS_SYMBOLS.pass) {

        debugStr += 'S+(L|U)';

        rank += Math.pow(uniques, 1.5) * Math.pow(Math.max(1, mixBonus), 1.5) * Math.pow(pass.length, 1.5);   

    } else if ((checks.CONTAINS_LOWER_CASE.pass || checks.CONTAINS_UPPER_CASE.pass) && checks.CONTAINS_NUMBERS.pass) {

        debugStr += 'N+(L|U)';

        rank += Math.pow(uniques, 1.5) * Math.pow(Math.max(1, mixBonus), 1.5) * Math.pow(pass.length, 1.2);   

    } else if (checks.CONTAINS_LOWER_CASE.pass && checks.CONTAINS_UPPER_CASE.pass) {

        debugStr += 'L+U';

        rank += Math.pow(uniques, 1.25) * Math.pow(Math.max(1, mixBonus), 1.25) * Math.pow(pass.length, 1.1);   

    } else {
        debugStr += '0000';

        rank += Math.pow(uniques, 1.1) * Math.pow(Math.max(1, mixBonus), 1.1) * Math.pow(pass.length, 0.5);
    }

    debugStr += ' * ' + `u: ${ uniques } mb: ${ mixBonus } l: ${ pass.length } *`;



    ////////////////////////////

    //Length and Uniqueness bonus
    if (mixBonus >= 1)
        rank = rank * Math.pow(pass.length, Math.log(Math.pow(pass.length * uniques, 1.5)));
    else
        rank = rank * Math.pow(pass.length, Math.log(Math.pow(pass.length * uniques, 1.2)));
    //log
    rank = Math.round(Math.log(rank));

    debugStr += ` r: ${ rank }`;

    //Normalize
    if (rank >= 38)
        rank = 100;
    else
        rank = Math.round(rank / 38 * 100);

    debugStr += ` rN: ${ rank }`;

    //    console.log(debugStr);

    return Math.round(rank);
}



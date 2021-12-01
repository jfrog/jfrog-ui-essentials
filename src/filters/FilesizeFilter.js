import {VueFactory} from "../services/VueFactory";

export function install() {
    const {Vue} = VueFactory.getInstance();

    Vue.filter('filesize', function (bytes, precision) {
        if (bytes === 0)
            return 'empty file';
        if (isNaN(parseFloat(bytes)) || !isFinite(bytes))
            return '-';
        if (typeof precision === 'undefined')
            precision = 1;
        var units = [
            'bytes',
            'kB',
            'MB',
            'GB',
            'TB',
            'PB',
            'EB',
            'ZB',
            'YB'
        ], number = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) + ' ' + units[number];
    });
}


async function calendar() {
    var days_labels = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
    var months_labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var html = "";
    var csvText = await getCsvData();
    var csv = csvToArray(csvText);

    function getDaysInMonth(m, y) {
        return new Date(y, m + 1, 0).getDate();
    }

    for (let month = 0; month < 12; month++) {
        let year = 2022;
        var days_in_month = getDaysInMonth(month, year);
        var first_day_weekday = new Date(year, month, 1).getDay();

        var prev_month = month == 0 ? 11 : month - 1;
        var prev_year = prev_month == 11 ? year - 1 : year;
        var prev_days = getDaysInMonth(prev_month, prev_year);

        html += '<div class="month-div">';
        html += '<h2>' + months_labels[month] + ' ' + year + '</h2>';
        html += '<table class="calendar-table">';
        html += '<tr class="week-days">';
        for (var i = 0; i <= 6; i++) {
            html += '<td class="day">';
            html += days_labels[i];
            html += '</td>';
        }
        html += '</tr>';

        var weekDay = 0; s
        var nextDate = 1;
        var currDate = 1;

        for (var i = 0; i < 6 * days_labels.length; i++) {
            if (weekDay == 0) {
                html += '<tr class="week">';
            }

            if (i < new Date(year, month, 1).getDay()) {
                html += '<td class="day other-month">' + (prev_days - first_day_weekday + i + 1) + '</td>';
            } else if (currDate > days_in_month) {
                html += '<td class="day other-month">' + nextDate + '</td>';
                nextDate++;
            } else {
                var options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
                var display_date = new Date(year, month, currDate);

                var info = csv.find(i => Number.parseInt(i.month) - 1 === month && Number.parseInt(i.day) === currDate);

                html += '<td class="day" title="' + display_date.toLocaleDateString('en-US', options) + '">' + currDate;

                if (info !== undefined) {
                    html += ' <br/>(' + Number.parseInt(info.rank) + ')';
                }

                html += '</td>';

                currDate++;
            }

            if (weekDay == days_labels.length - 1) {
                html += '</tr>';
                weekDay = 0;
            } else {
                weekDay++;
            }
        }

        html += '</tr></table></div>';
    }

    return html;
}

// https://sebhastian.com/javascript-csv-to-array/
function csvToArray(str, delimiter = ",") {
    const nl = "\n";
    const headers = str.slice(0, str.indexOf(nl)).split(delimiter);
    const rows = str.slice(str.indexOf(nl) + 1).split(nl);
    const arr = rows.map(function (row) {
        const values = row.split(delimiter);
        const el = headers.reduce(function (object, header, index) {
            object[header] = values[index];
            return object;
        }, {});
        return el;
    });

    return arr;
}

async function getCsvData() {
    return await (await fetch("./data.csv")).text();
}

calendar().then(html => document.getElementById('calendar').innerHTML = html);
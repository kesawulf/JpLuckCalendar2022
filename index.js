function calendar() {
    var days_labels = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
    var months_labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var html = "";

    var csv = csvToArray(getCsvData());

    function getDaysInMonth(m, y) {
        return new Date(y, m + 1, 0).getDate();
    }

    for (let month = 0; month < 12; month++) {
        let year = 2022;
        var days_in_month = getDaysInMonth(month, year),
            first_day_date = new Date(year, month, 1),
            first_day_weekday = first_day_date.getDay();

        var prev_month = month == 0 ? 11 : month - 1,
            prev_year = prev_month == 11 ? year - 1 : year,
            prev_days = getDaysInMonth(prev_month, prev_year);

        // calendar header
        html += '<h2>' + months_labels[month] + ' ' + year + '</h2>';
        html += '<table class="calendar-table">';
        html += '<tr class="week-days">';
        for (var i = 0; i <= 6; i++) {
            html += '<td class="day">';
            html += days_labels[i];
            html += '</td>';
        }
        html += '</tr>';

        var w = 0; // week day
        var n = 1; // next days date
        var c = 1; // current date

        for (var i = 0; i < 6 * days_labels.length; i++) {
            if (w == 0) {
                // first week's day
                html += '<tr class="week">';
            }

            if (i < new Date(year, month, 1).getDay()) {
                // previous month's day
                html += '<td class="day other-month">' + (prev_days - first_day_weekday + i + 1) + '</td>';
            } else if (c > days_in_month) {
                // next month's day
                html += '<td class="day other-month">' + n + '</td>';
                n++;
            } else {
                // current month's day
                var options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
                var display_date = new Date(year, month, c);

                var info = csv.find(i => Number.parseInt(i.month) - 1 === month && Number.parseInt(i.day) === c);

                if (info === undefined) {
                    html += '<td class="day" title="' + display_date.toLocaleDateString('en-US', options) + '">' + c + '</td>';
                } else {
                    html += '<td class="day" title="' + display_date.toLocaleDateString('en-US', options) + '">' + c + ' (' + info.rank + ')</td>';
                }

                c++;
            }

            if (w == days_labels.length - 1) {
                // last week's day
                html += '</tr>';
                w = 0;
            } else {
                w++;
            }
        }

        html += '</tr></table><br />';
    }

    return html;
}

// https://sebhastian.com/javascript-csv-to-array/
function csvToArray(str, delimiter = ",") {
    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
    const arr = rows.map(function (row) {
        const values = row.split(delimiter);
        const el = headers.reduce(function (object, header, index) {
            object[header] = values[index];
            return object;
        }, {});
        return el;
    });

    // return the array
    return arr;
}


function getCsvData() {
    return `rank,month,day
    1,12,8
    2,9,7
    3,10,27
    4,9,14
    5,10,26
    6,11,29
    7,7,3
    8,4,7
    9,7,24
    10,10,18
    11,7,30
    12,10,6
    13,10,29
    14,8,4
    15,12,29
    16,11,12
    17,9,25
    18,4,3
    19,10,25
    20,3,13
    21,12,20
    22,6,18
    24,7,11
    25,9,11
    26,8,8
    27,11,25
    28,3,25
    29,8,29
    30,7,2
    31,11,7
    32,10,30
    33,10,10
    34,8,14
    35,10,31
    36,12,26
    37,8,14
    35,10,31
    36,12,26
    37,8,3
    38,10,21
    39,3,30
    40,6,23
    41,11,27
    42,8,21
    43,10,10
    44,6,7
    45,6,12
    46,7,20
    47,1,8
    48,4,18
    49,5,3
    50,12,19
    51,2,7
    52,3,4
    53,12,7
    54,3,29
    55,1,14
    56,6,13
    57,7,8
    58,4,19
    59,8,16
    60,2,18
    61,8,28
    62,4,9
    63,7,15
    64,6,9
    65,11,14
    66,1,6
    67,5,8
    68,9,1
    69,5,1
    70,12,24
    71,11,9
    72,2,24
    73,9,4
    74,3,14
    75,9,13
    76,8,25
    77,11,18
    78,1,21
    79,10,23
    80,12,4
    81,7,12
    82,3,8
    83,2,20
    84,9,26
    85,8,31
    86,12,11
    87,9,30
    88,1,24
    89,11,13
    90,3,9
    91,1,12
    92,6,21
    93,5,10
    94,10,24
    95,12,21
    96,2,15
    97,11,10
    98,7,4
    99,1,30
    100,7,6
    101,8,18
    102,1,31
    103,9,8
    104,12,13
    105,6,14
    106,3,10
    107,5,20
    108,2,4
    109,8,15
    110,4,2
    111,9,22
    112,3,18
    113,2,16
    114,10,9
    115,9,2
    116,12,15
    117,3,7
    118,10,13
    119,4,13
    120,5,9
    121,10,8
    122,6,30
    123,8,6
    124,4,27
    125,5,11
    126,10,4
    127,3,3
    128,1,23
    129,4,16
    130,7,7
    131,5,25
    132,5,2
    133,1,7
    134,1,18
    135,3,5
    136,10,15
    137,10,3
    138,8,19
    139,4,24
    140,7,5
    141,3,12
    142,9,21
    143,2,19
    144,11,26
    145,9,28
    146,7,16
    147,2,23
    148,7,1
    149,8,2
    150,12,12
    151,12,3
    152,9,18
    153,3,15
    154,10,20
    155,1,13
    156,11,8
    157,8,7
    158,7,18
    159,7,9
    160,1,26
    161,8,17
    162,2,1
    163,5,23
    164,10,16
    165,3,31
    166,3,6
    167,1,10
    168,6,28
    169,5,16
    170,7,25
    171,1,2
    172,1,20
    173,2,11
    174,2,5
    175,12,2
    176,4,23
    177,1,17
    178,11,11
    179,7,17
    180,5,5
    181,11,5
    182,6,26
    183,2,25
    184,12,5
    185,12,18
    186,11,19
    187,2,6
    188,8,27
    189,11,21
    190,9,17
    191,5,30
    192,9,27
    193,2,26
    194,12,10
    195,9,23
    196,5,6
    197,4,1
    198,1,3
    199,4,17
    200,8,9
    201,11,23
    202,12,28
    203,11,28
    204,5,7
    205,12,16
    206,9,20
    207,3,19
    208,1,11
    209,3,2
    210,3,28
    211,10,12
    212,11,22
    213,7,14
    214,6,24
    215,10,5
    216,3,24
    217,7,31
    218,4,28
    219,7,26
    220,9,10
    221,2,10
    222,9,6
    223,10,1
    224,1,16
    225,4,6
    226,10,22
    227,2,2
    228,8,13
    229,8,5
    230,11,20
    231,2,12
    232,12,27
    233,12,6
    234,10,11
    235,7,13
    236,7,19
    237,5,18
    238,5,19
    239,4,10
    240,4,20
    241,5,24
    242,11,1
    243,8,11
    244,2,21
    245,11,2
    246,9,5
    247,2,3
    248,12,14
    249,5,21
    250,9,9
    251,3,17
    252,6,10
    253,4,11
    254,4,25
    255,6,27
    256,11,4
    257,7,29
    258,4,30
    259,7,23
    260,2,22
    261,8,1
    262,1,25
    263,12,9
    264,7,22
    265,11,16
    266,8,12
    267,7,22
    268,3,26
    269,2,14
    270,4,22
    271,7,10
    272,4,4
    273,4,28
    274,5,26
    275,11,17
    276,4,12
    277,10,2
    278,3,21
    279,4,15
    280,3,16
    281,2,13
    282,8,30
    283,5,31
    284,2,28
    285,12,22
    286,5,29
    287,2,9
    288,12,17
    289,6,17
    290,5,15
    291,9,29
    292,2,17
    293,3,20
    294,6,29
    295,12,30
    296,12,1
    297,4,21
    298,9,24
    299,6,4
    300,1,22
    301,6,1
    302,6,6
    303,9,15
    304,7,27
    305,6,20
    306,5,14
    307,6,15
    308,5,5
    309,8,26
    310,6,19
    311,1,27
    312,1,28
    313,5,27
    314,10,19
    315,5,12
    316,6,25
    317,1,1
    318,5,13
    319,11,3
    320,3,22
    321,2,8
    322,8,20
    323,10,29
    324,8,21
    325,1,9
    326,5,22
    327,6,5
    328,5,7
    329,1,19
    330,6,22
    331,1,4
    332,8,23
    333,1,5
    334,9,3
    335,6,2
    336,12,23
    337,1,15
    338,7,28
    339,11,15
    340,5,4
    341,10,17
    342,10,7
    343,11,30
    344,9,16
    345,4,14
    346,8,24
    347,3,11
    348,9,12
    349,11,6
    350,1,29
    351,6,3
    352,9,19
    353,10,14
    354,4,8
    355,4,26
    356,12,25
    357,12,31
    358,3,27
    359,2,27
    360,11,24
    361,6,11
    362,3,23
    363,3,1
    364,6,16
    365,4,29
    `;
}

document.getElementById('calendar').innerHTML = calendar();
const axios = require('axios').default;

// DATA: 01/08/2020 15:30:00 - 01/08/2020 15:30:08

var requests1 = [
    // LETRA B
    [
        // IPV4
        {
            url: 'https://atlas.ripe.net/api/v2/measurements/10310/results/?start=1596295800&stop=1596295808&format=json',
            result: []
        },
        // IPV6
        {
            url: 'https://atlas.ripe.net/api/v2/measurements/11310/results/?start=1596295800&stop=1596295808&format=json',
            result: []
        },
    ],
    // LETRA C
    [
        // IPV4
        {
            url: 'https://atlas.ripe.net/api/v2/measurements/10311/results/?start=1596295800&stop=1596295808&format=json',
            result: []
        },
        // IPV6
        {
            url: 'https://atlas.ripe.net/api/v2/measurements/11311/results/?start=1596295800&stop=1596295808&format=json',
            result: []
        },
    ]
];

// DATA: 25/07/2014 15:30:00 - 25/07/2014 15:30:08

var requests2 = [
    // LETRA B
    [
        // IPV4
        {
            url: 'https://atlas.ripe.net/api/v2/measurements/10310/results/?start=1564068600&stop=1564068608&format=json',
            result: []
        },
        // IPV6
        {
            url: 'https://atlas.ripe.net/api/v2/measurements/11310/results/?start=1564068600&stop=1564068608&format=json',
            result: []
        },
    ],
    // LETRA C
    [
        // IPV4
        {
            url: 'https://atlas.ripe.net/api/v2/measurements/10311/results/?start=1564068600&stop=1564068608&format=json',
            result: []
        },
        // IPV6
        {
            url: '​​https://atlas.ripe.net/api/v2/measurements/11311/results/?start=1564068600&stop=1564068608&format=json',
            result: []
        },
    ]
];

async function getData() {
    console.log('01/08/2020 15:30:00 - 01/08/2020 15:30:08')

    await axios.get(requests1[0][0]['url'])
    .then(function (response) {
        requests1[0][0]['result'] = response.data;
        console.log('B - IPV4 = ' + requests1[0][0]['result'].length);
    });

    await axios.get(requests1[0][1]['url'])
    .then(function (response) {
        requests1[0][1]['result'] = response.data;
        console.log('B - IPV6 = ' + requests1[0][1]['result'].length);
    });
    
    await axios.get(requests1[1][0]['url'])
    .then(function (response) {
        requests1[1][0]['result'] = response.data;
        console.log('C - IPV4 = ' + requests1[1][0]['result'].length);
    });
    
    await axios.get(requests1[1][1]['url'])
    .then(function (response) {
        requests1[1][1]['result'] = response.data;
        console.log('C - IPV6 = ' + requests1[1][1]['result'].length);
    });

    console.log('25/07/2014 15:30:00 - 25/07/2014 15:30:08')

    await axios.get(requests2[0][0]['url'])
    .then(function (response) {
        requests2[0][0]['result'] = response.data;
        console.log('B - IPV4 = ' + requests2[0][0]['result'].length);
    });

    await axios.get(requests2[0][1]['url'])
    .then(function (response) {
        requests2[0][1]['result'] = response.data;
        console.log('B - IPV6 = ' + requests2[0][1]['result'].length);
    });
    
    await axios.get(requests2[1][0]['url'])
    .then(function (response) {
        requests2[1][0]['result'] = response.data;
        console.log('C - IPV4 = ' + requests2[1][0]['result'].length);
    });
    
    await axios.get('https://atlas.ripe.net/api/v2/measurements/11311/results/?start=1564068600&stop=1564068608&format=json')
    .then(function (response) {
        requests2[1][1]['result'] = response.data;
        console.log('C - IPV6 = ' + requests2[1][1]['result'].length);
    });

    return true;
}

getData()
    .then((x) => {
            x ? getNames() : ''
        }
    );

function getNames(){
    console.log('PRIMEIRO PACK');
    for(let g = 0; g < 2; g++)
    {
        for(let j = 0; j < 2; j++)
        {
            console.log(requests1[g][j]);
            var result = requests1[g][j]['result'].map(x => x['result']);
            var answers = [];
            for(let i = 1; i < result.length; i++)
            {
                if(!result[i] == false)
                {
                    if(!result[i]['answers'] == false)
                    {
                        let rdata = result[i]['answers'][0]['RDATA'][0];
                        if(rdata.length == 6)
                        {
                            let location = rdata.slice(3, 6);
                            answers.push(location);
                        }
                        else if(rdata.length == 24)
                        {
                            let location = rdata.slice(0, 3);
                            answers.push(location);
                        }
                    }
                }
            }
            compare(answers);
        }
    }
    console.log('SEGUNDO PACK');
    for(let g = 0; g < 2; g++)
    {
        for(let j = 0; j < 2; j++)
        {
            var result = requests2[g][j]['result'].map(x => x['result']);
            var answers = [];
            for(let i = 1; i < result.length; i++)
            {
                if(!result[i] == false)
                {
                    if(!result[i]['answers'] == false)
                    {
                        let rdata = result[i]['answers'][0]['RDATA'][0];
                        if(rdata.length == 6)
                        {
                            let location = rdata.slice(3, 6);
                            answers.push(location);
                        }
                        else if(rdata.length == 24)
                        {
                            let location = rdata.slice(0, 3);
                            answers.push(location);
                        }
                    }
                }
            }
            compare(answers);
        }
    }
}

function compare(location){
    var siglas = {
        ams: 0,
        lax: 0,
        mia: 0,
        iad: 0,
        sin: 0,
        par: 0,
        fra: 0,
        ord: 0,
        bts: 0,
        jfk: 0,
        mad: 0,
        ari: 0,
    };

    for(let i = 0; i < location.length; i++)
    {
        siglas[location[i]]++;
    }

    console.log(siglas);
}
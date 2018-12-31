d3.csv(
    'https://rawgit.com/RhoInc/viz-library/master/data/safetyData/ADBDS.csv',
    function(d,i) {
        return d;
    },
    function(error,data) {
        if (error)
            console.log(error);

        var settings = {
            //filters: ['ARM', 'SEX', 'RACE', 'SITEID'],
            groups: ['ARM', 'SEX', 'RACE', 'SITEID'],
            //violins: true,
            y: {type: 'log'},
            //start_value: 'Aminotransferase, alanine (ALT)',
            start_value: 'Temperature',
        };
        var instance = safetyResultsOverTime(
            '#container',
            settings
        );
        instance.init(data);
    }
);

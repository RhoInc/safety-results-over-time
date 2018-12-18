d3.csv(
    'https://rawgit.com/RhoInc/viz-library/master/data/safetyData/ADBDS.csv',
    function(d) {
        return d;
    },
    function(error,data) {
        if (error)
            console.log(error);

        var settings = {
            filters: ['ARM', 'SEX', 'RACE', 'SITEID'],
            groups: ['ARM', 'SEX', 'RACE', 'SITEID'],
        };
        var instance = safetyResultsOverTime(
            '#container',
            settings
        );
        instance.init(data);
    }
);

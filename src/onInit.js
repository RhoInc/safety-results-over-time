import { set } from 'd3';
import { dataOps } from 'webcharts';

export default function onInit() {
    const config = this.config;
    const allMeasures = set(this.raw_data.map(m => m[config.measure_col])).values();

    //'All'variable for non-grouped comparisons
    this.raw_data
        .forEach(d => {
            d.NONE = 'All Subjects';
        });
    
    //Drop missing values
    this.raw_data = this.raw_data.filter(f => {
        return config.missingValues.indexOf(f[config.value_col]) === -1;
    })

    //warning for non-numeric endpoints
    var catMeasures = allMeasures
        .filter(f => {
            var measureVals = this.raw_data
                .filter(d => d[config.measure_col] === f);

            return dataOps.getValType(measureVals, config.value_col) !== 'continuous';
        });
    if(catMeasures.length){
        console.warn(catMeasures.length + ' non-numeric endpoints have been removed: '+catMeasures.join(', '))    
    }
    
    //delete non-numeric endpoints
    var numMeasures = allMeasures
        .filter(f => {
            var measureVals = this.raw_data
                .filter(d => d[config.measure_col] === f );

            return dataOps.getValType(measureVals, config.value_col) === 'continuous';
        });

    this.raw_data = this.raw_data.filter(f => numMeasures.indexOf(f[config.measure_col]) > -1 );

    //Choose the start value for the Test filter
    this.controls.config.inputs
        .filter(input => input.label === 'Measure')[0]
        .start = this.config.start_value || numMeasures[0]; 
};

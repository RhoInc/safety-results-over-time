export default function customizeGroupByControl() {
    const context = this;

    const groupControl = this.controls.wrap.selectAll('.control-group.dropdown.group-by');
    if (groupControl.datum().values.length === 1) groupControl.style('display', 'none');
    else
        groupControl
            .selectAll('select')
            .on('change', function(d) {
                const label = d3
                    .select(this)
                    .selectAll('option:checked')
                    .text();
                const value_col = context.config.groups.find(group => group.label === label)
                    .value_col;
                context.config.marks[0].per[0] = value_col;
                context.config.color_by = value_col;
                context.config.legend.label = label;
                context.draw();
            })
            .selectAll('option')
            .property('selected', d => d === this.config.legend.label);
}

export default function syncSettings(settings) {
    settings.x.column = settings.time_settings.value_col;
    settings.x.label = settings.time_settings.label;
    settings.x.behavior = settings.visits_without_data ? 'raw' : 'flex';
    settings.y.column = settings.value_col;
    if (!(settings.groups instanceof Array && settings.groups.length))
        settings.groups = [{ value_col: 'srot_none', label: 'None' }];
    else
        settings.groups = settings.groups.map(group => {
            return {
                value_col: group.value_col || group,
                label: group.label || group.value_col || group
            };
        });
    settings.color_by = settings.groups[0].value_col
        ? settings.groups[0].value_col
        : settings.groups[0];
    settings.marks[0].per = [settings.color_by];
    settings.marks[1].per = [settings.id_col, settings.time_settings.value_col, settings.value_col];
    settings.marks[1].tooltip = `[${settings.id_col}] at [${settings.x.column}]: $y`;
    settings.margin = settings.margin || { bottom: settings.time_settings.vertical_space };

    //Convert unscheduled_visit_pattern from string to regular expression.
    if (
        typeof settings.unscheduled_visit_pattern === 'string' &&
        settings.unscheduled_visit_pattern !== ''
    ) {
        const flags = settings.unscheduled_visit_pattern.replace(/.*?\/([gimy]*)$/, '$1'),
            pattern = settings.unscheduled_visit_pattern.replace(
                new RegExp('^/(.*?)/' + flags + '$'),
                '$1'
            );
        settings.unscheduled_visit_regex = new RegExp(pattern, flags);
    }

    return settings;
}
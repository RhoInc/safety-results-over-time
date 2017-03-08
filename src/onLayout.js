export default function onLayout(){
  //Add population count container.
    this.controls.wrap
        .append('div')
        .attr('id', 'populationCount')
        .style('font-style', 'italic');

  //Add logged y-axis footnote.
    d3.select(this.wrap.node().parentNode)
        .append('em')
        .attr('id', 'log-note')
        .text('Values of zero have been removed to prevent issues with the logged y-axis.')
        .style('display', 'none');
}

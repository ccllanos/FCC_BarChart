const width = 800;
const height = 400;
const margin = { top: 20, right: 20, bottom: 50, left: 70 };

const svg = d3.select('svg')
  .attr('width', width)
  .attr('height', height);

const xScale = d3.scaleBand()
  .domain(data.map(d => d.date))
  .range([margin.left, width - margin.right])
  .padding(0.1);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.gdp)])
  .nice()
  .range([height - margin.bottom, margin.top]);

const xAxis = d3.axisBottom(xScale).tickClass('tick');
const yAxis = d3.axisLeft(yScale).tickClass('tick');

svg.append('g')
  .attr('id', 'x-axis')
  .attr('transform', `translate(0,${height - margin.bottom})`)
  .call(xAxis);

svg.append('g')
  .attr('id', 'y-axis')
  .attr('transform', `translate(${margin.left},0)`)
  .call(yAxis);

svg.selectAll('.bar')
  .data(data)
  .enter().append('rect')
  .attr('class', 'bar')
  .attr('data-date', d => d.date)
  .attr('data-gdp', d => d.gdp)
  .attr('x', d => xScale(d.date))
  .attr('y', d => yScale(d.gdp))
  .attr('width', xScale.bandwidth())
  .attr('height', d => height - margin.bottom - yScale(d.gdp))
  .on('mouseover', showTooltip)
  .on('mouseout', hideTooltip);

function showTooltip(d) {
  const tooltip = document.getElementById('tooltip');
  tooltip.innerHTML = `Date: ${d.date}<br>GDP: ${d.gdp}`;
  tooltip.style.display = 'block';
  tooltip.setAttribute('data-date', d.date);
}

function hideTooltip() {
  const tooltip = document.getElementById('tooltip');
  tooltip.style.display = 'none';
}
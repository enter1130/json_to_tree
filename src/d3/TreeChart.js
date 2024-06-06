import * as d3 from "d3";
import React, { useEffect, useRef } from "react";

const TreeChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // 清除之前的内容

    const width = 800;
    const height = 600;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const root = d3.hierarchy(data);
    const treeLayout = d3.tree().size([innerHeight, innerWidth]).nodeSize([120, 200]);
    treeLayout(root);

    const linkGenerator = d3.linkHorizontal()
      .x(d => d.y)
      .y(d => d.x);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const links = g.selectAll('path')
      .data(root.links())
      .enter()
      .append('path')
      .attr('d', linkGenerator)
      .attr('fill', 'none')
      .attr('stroke', '#ccc');

    const nodes = g.selectAll('g')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.y},${d.x})`);

    nodes.append('circle')
      .attr('r', 6)
      .attr('fill', d => d.children ? 'red' : 'green');

    nodes.append('text')
      .attr('dy', '.35em')
      .attr('x', d => d.children ? -10 : 10)
      .style('text-anchor', d => d.children ? 'end' : 'start')
      .text(d => d.data.name);

    const zoom = d3.zoom()
      .scaleExtent([0.5, 2])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    const simulation = d3.forceSimulation(root.descendants())
      .force("link", d3.forceLink(root.links()).distance(100).strength(1))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(innerWidth / 2, innerHeight / 2))
      .on("tick", ticked);

    function ticked() {
      nodes.attr("transform", d => `translate(${d.y},${d.x})`);
      links.attr("d", linkGenerator);
    }
  }, [data]);

  return (
    <svg ref={svgRef} width="100%" height="600" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet"></svg>
  );
};

export default TreeChart;

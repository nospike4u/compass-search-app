import { useEffect, useRef, useState } from 'react';
import { useReadCypher } from 'use-neo4j';
import { DataSet, Network } from 'vis-network/standalone';
import 'vis-network/styles/vis-network.css';
// import './styles.css';

function TheMagic() {
  const { cypher, error, loading, records } = useReadCypher(
    `MATCH (n:Person)-[r]->(m:Team) RETURN n, r, m LIMIT 25`
  );
  // 'MATCH (n)-[r]->(m) RETURN n, r, m'
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const networkRef = useRef(null);

  useEffect(() => {
    if (records) {
      const nodes = [];
      const edges = [];
      const nodeSet = new Set();

      records.forEach((record) => {
        const n = record.get('n');
        const m = record.get('m');
        const r = record.get('r');

        if (n && !nodeSet.has(n.identity.toString())) {
          nodes.push({
            id: n.identity.toString(),
            label: n.properties.name || n.identity.toString(),
          });
          nodeSet.add(n.identity.toString());
        }

        if (m && !nodeSet.has(m.identity.toString())) {
          nodes.push({
            id: m.identity.toString(),
            label: m.properties.name || m.identity.toString(),
          });
          nodeSet.add(m.identity.toString());
        }

        if (r) {
          edges.push({
            from: n.identity.toString(),
            to: m.identity.toString(),
            label: r.type,
          });
        }
      });

      setGraphData({ nodes, edges });
    }
  }, [records]);

  useEffect(() => {
    if (networkRef.current) {
      const nodesDataSet = new DataSet(graphData.nodes);
      const edgesDataSet = new DataSet(graphData.edges);

      const data = { nodes: nodesDataSet, edges: edgesDataSet };
      const options = {
        nodes: { shape: 'dot', size: 16 },
        edges: { arrows: 'to' },
        layout: { improvedLayout: true },
        physics: { stabilization: false },
      };

      new Network(networkRef.current, data, options);
    }
  }, [graphData]);

  let result = <div className="ui active dimmer">Loading...</div>;

  if (error) {
    result = <div className="ui negative message">{error.message}</div>;
  } else if (!loading) {
    result = <div ref={networkRef} style={{ height: '600px' }} />;
  }

  return (
    <div className="App">
      <pre>{cypher}</pre>
      {result}
    </div>
  );
}

export default TheMagic;

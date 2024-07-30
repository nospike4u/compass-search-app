import React, { useEffect, useRef } from "react";
import * as popoto from "popoto"; // Import the whole Popoto-Module
import neo4j from "neo4j-driver-lite";
import * as d3 from "d3";
import "popoto/dist/popoto.min.css";
import "./Neo4jGraph.css";

const Neo4jGraph = () => {
  const graphContainerRef = useRef(null);
  const cypherContainerRef = useRef(null);
  const resultsContainerRef = useRef(null);
  const resultCountRef = useRef(null);

  useEffect(() => {
    // Connection with Neo4j database
    var driver = neo4j.driver(
      "neo4j+s://9f5fe3c9.databases.neo4j.io",
      neo4j.auth.basic("neo4j", "mzN82XArYXdE96ePdStUVFArXbZJO5amtA_D3N7WRVQ")
    );
    popoto.runner.DRIVER = driver;

    // Popoto provider configuration
    popoto.provider.node.Provider = {
      // Movie: {
      //   returnAttributes: ["title", "released", "tagline"],
      //   constraintAttribute: "title",
      // },
      Person: {
        returnAttributes: ["name", "team"],
        constraintAttribute: "name",
        displayResults: function (pResultElmt) {
          pResultElmt.append("h3").text(function (result) {
            return result.attributes.name;
          });

          pResultElmt
            .filter(function (result) {
              return result.attributes.born;
            })
            .append("span")
            .text(function (result) {
              return (
                "Age: " +
                (new Date().getFullYear() - result.attributes.born.toInt())
              );
            });
        },
      },
    };

    popoto.result.RESULTS_PAGE_SIZE = 20;

    popoto.result.onTotalResultCount(function (count) {
      d3.select(resultCountRef.current).text(function (d) {
        return `(${count})`;
      });
    });

    popoto.graph.on(
      popoto.graph.Events.GRAPH_NODE_RELATION_ADD,
      function (relations) {
        const newRelation = relations[0];
        popoto.graph.node.collapseAllNode();

        const linksToRemove = popoto.dataModel.links.filter(function (link) {
          return link !== newRelation && link.source === newRelation.source;
        });

        linksToRemove.forEach(function (link) {
          const willChangeResults = popoto.graph.node.removeNode(link.target);
          popoto.result.hasChanged =
            popoto.result.hasChanged || willChangeResults;
        });

        popoto.update();
      }
    );

    // Initialise Popoto diagram
    driver
      .getServerInfo()
      .then(function () {
        popoto.start("Person");
      })
      .catch(function (error) {
        console.error("Neo4j Connection Error:", error);
        alert("Error connecting to Neo4j: " + error.message);
      });

    return () => {
      // Cleanup Neo4j-Connection
      driver.close();
    };
  }, []); // Empty array to trigger the effect only once

  return (
    <section className="ppt-section-main" style={{ height: "300px" }}>
      {/* <div className="ppt-section-header">
        <span className="ppt-header-span">Neo4j movie graph -</span> Add
        relation event customization
      </div> */}
      <div ref={graphContainerRef} id="popoto-graph" className="ppt-div-graph">
        {/* Graph is generated here */}
      </div>
      <div
        ref={cypherContainerRef}
        id="popoto-cypher"
        className="ppt-container-query">
        {/* Query viewer is generated here */}
      </div>
      <div className="ppt-section-header">
        RESULTS{" "}
        <span ref={resultCountRef} id="rescount" className="ppt-count"></span>
      </div>
      <div
        ref={resultsContainerRef}
        id="popoto-results"
        className="ppt-container-results">
        {/* Results are generated here */}
      </div>
    </section>
  );
};

export default Neo4jGraph;

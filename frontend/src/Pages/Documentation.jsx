import React from "react";
import docsearch from "./../assets/doc_search.png";
import docgraph from "./../assets/doc_graph.png";
import doccontext from "./../assets/doc_context.png";
import docnode from "./../assets/doc_node.png";

const Documentation = () => {
  return (
    <div>
      <div className="container mx-auto py-12 px-24 md:px-24">
        <h1 className="text-xl font-bold pb-2 text-slate-800">Documentation</h1>
        <p className="pb-2 text-slate-600">
          This documentation provides detailed guidance on how to use the
          application, including instructions on utilizing the search
          functionality and navigating the graph.
        </p>
        <div className="divider"></div>
        <div className="pt-14 pb-16">
          <div className="flex items-start space-x-8">
            <img className="w-1/4 h-full" src={docsearch} alt="searchbar" />
            <div className="">
              <h2 className="text-xl font-bold pb-2 text-slate-800">
                Search Bar
              </h2>
              <p className="text-slate-800">
                Use the search bar to quickly find people, departments, skills,
                and more within the graph. As you type, you'll see autocomplete
                suggestions that help you discover relevant nodes effortlessly.
                This feature makes navigating complex graph structures intuitive
                and efficient, so you can easily find the information you need.
              </p>
            </div>
          </div>
        </div>
        <div className="pb-12">
          <div className="flex items-start space-x-8">
            <img className="w-1/4 h-full" src={docgraph} alt="node graph" />
            <div className="">
              <h2 className="text-xl font-bold pb-2 text-slate-800">
                Interactive Graph
              </h2>
              <p className="text-slate-800">
                This graph is an advanced visualization tool that displays data
                as a network of interconnected nodes. It allows for in-depth
                exploration of entities and their relationships, providing
                detailed insights into the data structure. Users can navigate
                the graph to uncover connections and interactions, making it an
                essential tool for understanding complex datasets and deriving
                meaningful insights.
              </p>
            </div>
          </div>
        </div>
        <div className="pb-12">
          <div className="flex items-start space-x-8">
            <img
              className="w-1/4 px-12 h-full"
              src={docnode}
              alt="node graph"
            />
            <div className="">
              <h2 className="text-xl font-bold pb-2 text-slate-800">
                Node and Connection Exploration
              </h2>
              <p className="text-slate-800">
                Navigate the graph by clicking on nodes to open a context menu
                with detailed information. To explore relationships, click on
                the outer rings of a node to reveal its connections to other
                nodes. This tool offers a structured and exploratory experience,
                providing a clear view of complex networks and their
                interconnections.
              </p>
            </div>
          </div>
        </div>
        <div className="pb-8">
          <div className="flex items-censtartter space-x-8">
            <img
              className="px-14 w-1/4 h-full"
              src={doccontext}
              alt="searchbar"
            />
            <div className="">
              <h2 className="text-xl font-bold pb-2 text-slate-800">
                Context Menu
              </h2>
              <p className="text-slate-800">
                Clicking on a node opens a context menu that reveals detailed
                information about the node, such as name, department, location,
                and position. The menu also includes buttons for direct contact
                via email, Teams, or Slack, making it easy to communicate and
                collaborate instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;

// import { useState, useEffect } from 'react';
// import * as popoto from 'popoto';
// import axios from 'axios';

// function X() {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const serverData = async () => {
//         try {
//             const response = await axios.get('http://localhost:8000/api/v1/data');
//             setData(response.data);
//             console.log(response.data);
//         } catch (err) {
//             setError(err.message);
//             console.error("Error fetching server data:", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const runPopoto = () => {
//         if (!data || !data.driver) {
//             console.error("Driver data not available");
//             return;
//         }

//         popoto.runner.DRIVER = data.driver;

//         popoto.provider.node.Provider = {
//             "Person": {
//                 "returnAttributes": ["name", "email"],
//                 "constraintAttribute": "name"
//             }
//         };

//         popoto.result.onTotalResultCount((count) => {
//             document.getElementById("result-total-count").innerHTML = "(" + count + ")";
//         });

//         const schema = {
//             label: "Person"
//         };

//         data.driver.verifyConnectivity()
//             .then(() => {
//                 popoto.start(schema);
//             })
//             .catch((error) => {
//                 document.getElementById("modal").style.display = "block";
//                 document.getElementById("error-content").innerText = error;
//                 console.error(error);
//             });
//     };

//     useEffect(() => {
//         serverData();
//     }, []);

//     useEffect(() => {
//         if (!loading && data) {
//             runPopoto();
//         }
//     }, [data, loading]);

//     return (
//         <>
//             <section className="ppt-section-main">
//                 <div className="ppt-header-img">
//                     <img className="app-icon" src="/assets-ds/Logo-4.png" alt="" />
//                 </div>
//                 <div className="ppt-section-header">
//                     <div className="ppt-header-input">
//                         <input type="search" id="search" className="ppt-search" placeholder="Search for a person" />
//                     </div>
//                 </div>
//                 <div className="ppt-container-graph">
//                     <nav id="popoto-taxonomy" className="ppt-taxo-nav"></nav>
//                     <div id="popoto-graph" className="ppt-div-graph"></div>
//                 </div>
//                 <div id="popoto-query" className="ppt-container-query"></div>
//                 <div id="popoto-cypher" className="ppt-container-cypher"></div>
//                 <div className="ppt-section-header">
//                     RESULTS <span id="result-total-count" className="ppt-count"></span>
//                 </div>
//                 <div id="popoto-results" className="ppt-container-results"></div>
//             </section>
//             {error && <div>Error: {error}</div>}
//             <div id="modal" style={{ display: 'none' }}>
//                 <div id="modal-content">
//                     <p id="error-title">An error occurred while trying to start Popoto. Please check your configuration and/or the console log:</p>
//                     <p><code id="error-content"></code></p>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default X;


import neo4j from 'neo4j-driver-lite'
import {useState,useEffect} from 'react'
import * as popoto from 'popoto';
import axios from 'axios'

function X(){
    const [data, setData] = useState([])

    const serverData =async () => { 
        const {data}=await axios.get(`http://localhost:8000/api/v1/data`)
        setData(data)
console.log(data)

     }

    
const runPopoto = () => { 
        var driver = neo4j.driver('neo4j+s://9f5fe3c9.databases.neo4j.io', neo4j.auth.basic('neo4j', 'mzN82XArYXdE96ePdStUVFArXbZJO5amtA_D3N7WRVQ'));
    
        popoto.runner.DRIVER = driver

        /**
         * Define the Label provider you need for your application.
         * This configuration is mandatory and should contain at least all the labels you could find in your graph model.
         *
         * In this version only nodes with a label are supported.
         *
         * By default If no attributes are specified Neo4j internal ID will be used.
         * These label provider configuration can be used to customize the node display in the graph.
         * See www.popotojs.com or example for more details on available configuration options.
         */
        popoto.provider.node.Provider = {
            "LocationName": {
                // "returnAttributes": ["name", "email"],
                // "constraintAttribute": "name"
            },
        // popoto.provider.node.Provider = {
        //     "Person": {
        //         "returnAttributes": ["name", "email"],
        //         "constraintAttribute": "name"
        //     },
            // "Movie": {
            //     "returnAttributes": ["title", "released", "tagline"],
            //     "constraintAttribute": "title"
            // }
        };
    
        /**
         * Here a listener is used to retrieve the total results count and update the page accordingly.
         * This listener will be called on every graph modification.
         */
        popoto.result.onTotalResultCount(function (count) {
            document.getElementById("result-total-count").innerHTML = "(" + count + ")";
        });
    
        const schema = {
            label: "LocationName"
        };
    
        driver.verifyConnectivity().then(function () {
            popoto.start(schema);
        }).catch(function (error) {
            document.getElementById("modal").style.display = "block";
            document.getElementById("error-content").innerText = error;
            console.error(error)
        })
    
         }
        
        
    //     var modalDiv = document.createElement("div");
    // modalDiv.setAttribute("id", "modal");
    
    // var modalContentDiv = document.createElement("div");
    // modalContentDiv.setAttribute("id", "modal-content");
    
    // var errorTitleP = document.createElement("p");
    // errorTitleP.setAttribute("id", "error-title");
    // errorTitleP.innerText = "An error occurred while trying to start Popoto please check your configuration and/or the console log:"
    
    // var errorContentP = document.createElement("p");
    // var errorContentCode = document.createElement("code");
    // errorContentCode.setAttribute("id", "error-content");
    
    // errorContentP.appendChild(errorContentCode);
    // modalContentDiv.appendChild(errorTitleP);
    // modalContentDiv.appendChild(errorContentP);
    
    // modalDiv.appendChild(modalContentDiv);
    // document.body.append(modalDiv);

    
    useEffect(() => {
      
    serverData()
    }, [])
    
    useEffect(() => {
      
        runPopoto()
        
    }, [data])
    
    
  return (
    
<>
    <section className="ppt-section-main">
    <div className="ppt-header-img">
        <img className="app-icon" src="/assets-ds/Logo-4.png" alt="" />
    </div>
    <div className="ppt-section-header">
        <div className="ppt-header-input">
            <input type="search" id="search" className="ppt-search" placeholder="Search for a person" />

        </div>
        {/* <!-- <span className="ppt-header-span">Compass</span> Search -->    */}
    </div>

    <div className="ppt-container-graph">
        <nav id="popoto-taxonomy" className="ppt-taxo-nav">
            {/* <!-- Label/taxonomy filter will be generated here --> */}
        </nav>
        <div id="popoto-graph" className="ppt-div-graph">
            {/* <!-- Graph will be generated here--> */}
        </div>
    </div>

    <div id="popoto-query" className="ppt-container-query">
        {/* <!-- Query viewer will be generated here --> */}
    </div>

    <div id="popoto-cypher" className="ppt-container-cypher">
        {/* <!-- Cypher query viewer will be generated here --> */}
    </div>

    <div className="ppt-section-header">
        {/* <!-- The total results count is updated with a listener defined below --> */}
        RESULTS <span id="result-total-count" className="ppt-count"></span>
    </div>

    <div id="popoto-results" className="ppt-container-results">
        {/* <!-- Results will be generated here --> */}
    </div>
    </section>

</>
    
  )
}

export default X

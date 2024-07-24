import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import * as serviceWorker from './serviceWorker';
import { Neo4jProvider, createDriver } from 'use-neo4j';

// Initialize the Neo4j driver
const driver = createDriver(
  'neo4j+s',
  '9f5fe3c9.databases.neo4j.io',
  7687,
  'neo4j',
  'mzN82XArYXdE96ePdStUVFArXbZJO5amtA_D3N7WRVQ'
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
<Neo4jProvider driver={driver}>
      <App />
    </Neo4jProvider>
  </BrowserRouter>
);

serviceWorker.unregister();

const {session} = require('../db/neo4jDB.js');

// Example route to get data from Neo4j
const getAllData = async (req, res) => {
    try {
        const result = await session.run('MATCH (n) RETURN n LIMIT 10');
        const records = result.records.map(record => record.get('n').properties);
        res.json(records);
    } catch (error) {
        console.error('Error retrieving data from Neo4j', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports= {getAllData}


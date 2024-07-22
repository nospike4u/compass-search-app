const { session } = require("../db/neo4jDB.js");

// Example route to get data from Neo4j
const getAllData = async (req, res) => {
  try {
    const result = await session.run("MATCH (n) RETURN n");
    const records = result.records.map((record) => record.get("n").properties);
    res.json(records);
  } catch (error) {
    console.error("Error retrieving data from Neo4j", error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllSkills = async (req, res) => {
  try {
    const result = await session.run("MATCH (s:Skills) RETURN s");
    const records = result.records.map((record) => record.get("n").properties);
    res.json(records);
  } catch (error) {
    console.error("Error retrieving data from Neo4j", error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllHardSkills = async (req, res) => {
  try {
    const result = await session.run("MATCH (s:HardSkills) RETURN s");
    const records = result.records.map((record) => record.get("n").properties);
    res.json(records);
  } catch (error) {
    console.error("Error retrieving data from Neo4j", error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllSoftSkills = async (req, res) => {
  try {
    const result = await session.run("MATCH (s:SoftSkills) RETURN s");
    const records = result.records.map((record) => record.get("n").properties);
    res.json(records);
  } catch (error) {
    console.error("Error retrieving data from Neo4j", error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllDepartments = async (req, res) => {
  try {
    const result = await session.run(`MATCH (n:TopDepartment)
MATCH (d:Department) RETURN n, d`);
    const records = result.records.map((record) => record.get("n").properties);
    res.json(records);
  } catch (error) {
    console.error("Error retrieving data from Neo4j", error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllTeams = async (req, res) => {
  try {
    const result = await session.run("MATCH (t:Team) RETURN t");
    const records = result.records.map((record) => record.get("n").properties);
    res.json(records);
  } catch (error) {
    console.error("Error retrieving data from Neo4j", error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllPositions = async (req, res) => {
  try {
    const result = await session.run("MATCH (p:Positions) RETURN p");
    const records = result.records.map((record) => record.get("n").properties);
    res.json(records);
  } catch (error) {
    console.error("Error retrieving data from Neo4j", error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllLocations = async (req, res) => {
    try {
      const result = await session.run("MATCH (l:Locations) RETURN l");
      const records = result.records.map((record) => record.get("n").properties);
      res.json(records);
    } catch (error) {
      console.error("Error retrieving data from Neo4j", error);
      res.status(500).send("Internal Server Error");
    }
  };

  const getAllProjects = async (req, res) => {
    try {
      const result = await session.run("MATCH (p:Projects) RETURN p");
      const records = result.records.map((record) => record.get("n").properties);
      res.json(records);
    } catch (error) {
      console.error("Error retrieving data from Neo4j", error);
      res.status(500).send("Internal Server Error");
    }
  };

module.exports = {
  getAllData,
  getAllSkills,
  getAllHardSkills,
  getAllSoftSkills,
  getAllDepartments,
  getAllTeams,
  getAllPositions,
  getAllLocations,
  getAllProjects,
};

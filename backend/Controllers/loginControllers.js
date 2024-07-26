const { sql } = require("../db/postgresDB.js");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/auth.js");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await sql`select * from person where email = ${email} AND password = ${password}`;
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.json({ token });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
  
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await sql`insert into person (name, email, password) 
           values (${name}, ${email}, ${password}) 
          returning *`;
    const createdUser = await user.save();

    const token = generateToken(createdUser);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const logout = (req, res) => {
  // In a JWT-based auth system, you typically handle logout on the client side by removing the token
  res.status(200).json({ message: "Logout successful" });
};

module.exports = {
  login,
  register,
  logout,
};

//  const getAll = async (req, res) => {
//   try {
//     const person = await sql `select * from person`;
//     res.status(200).json(person);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

//  const createPerson = async (req, res) => {
//   const { id, name, phone_number, email, description, image_url } = req.body;
//   if (!id || !name || !phone_number || !email || !description || !image_url) {
//     return res
//       .status(400)
//       .json({ error: `Please provide all required fields` });
//   }

//   try {
//     const result =
//       await sql `insert into person (id, name, phone_number, email, description, image_url)
//       values (${id}, ${name}, ${phone_number}, ${email}, ${description}, ${image_url})
//       returning *`;
//     res.status(201).json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

//  const getOnePerson = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const person = await sql `select * from person where id = ${id}`;

//     if (person.length === 0) {
//       return res.status(404).json({ error: `Person with id ${id} not found` });
//     }
//     res.status(200).json(person);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

//  const updatePerson = async (req, res) => {
//   const { id } = req.params;
//   const { name, phone_number, email, description, image_url } = req.body;

//   if (!id || !name || !phone_number || !email || !description || !image_url) {
//     return res
//       .status(400)
//       .json({ error: `Please provide all required fields` });
//   }

//   try {
//     const result = await sql `update person
//           set name = ${id}, ${name}, phone_number = ${phone_number}, email = ${email}, description = ${description}, image_url = ${image_url}
//           where id = ${id} returning *`;

//     console.log(result);

//     if (result.count === 0) {
//       return res.status(404).json({ error: `Person with id ${id} not found` });
//     }

//     res.status(200).json({ message: `Person with id ${id} has been updated` });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

//  const deletePerson = async (req, res) => {
//   const { id } = req.params;
//   if (!id) {
//     return res.status(400).json({ error: `User ID is required` });
//   }

//   try {
//     const result = await sql `delete from person where id = ${id} returning *`;
//     if (result.count === 0) {
//       return res.status(404).json({ error: `Person with id ${id} not found` });
//     }
//     res.status(200).json({ message: `Person with id ${id} has been deleted` });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = {
//   getAll,
//   createPerson,
//   getOnePerson,
//   updatePerson,
//   deletePerson,
// };

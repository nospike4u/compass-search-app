import User from '../Models/userModel.js';

/**
 * Get all users or search by name
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Responds with JSON array of users or an error message
 */
export const getAllUsers = async (req, res) => {
  try {
    const { name, type } = req.query;

    let users;
    if (name) {
      users = await User.find({ name }).select('-password -isAdmin');
    } else {
      users = await User.find().select('-password -isAdmin');
    }

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

/**
 * Create a single user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Responds with the created user or an error message
 */
export const createSingleUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const createdUser = await user.save();
    res.json(createdUser);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

/**
 * Get a single user by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Responds with the user object or an error message
 */
export const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      '-password -isAdmin'
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
};

/**
 * Update a single user by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Responds with the updated user object or an error message
 */
export const updateSingleUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select('-password -isAdmin');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
};

/**
 * Delete a single user by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Responds with a success message or an error message
 */
export const deleteSingleUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
};







// import { sql} from "../db/postgresDB.js"; 

// /**
//  * Get all users or search by name
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  * @returns {Promise<void>} - Responds with JSON array of users or an error message
//  */
// export const getAllUsers = async (req, res) => {
//   try {
//     const { name } = req.query;

//     let users;
//     if (name) {
//       users = await sql `select * from person where name = ${name}`;
//     } 
//     else {
//       users = await sql `select * from person`;
//     }

//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error", error });
//   }
// };

// /**
//  * Create a single user
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  * @returns {Promise<void>} - Responds with the created user or an error message
//  */
// export const createSingleUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await sql `insert into person (email, password) 
//     values (${email}, ${password}) 
//    returning *`;
// const createdUser = await user.save();

// const token = generateToken(createdUser);
// res.status(201).json({ token });
// } catch (error) {
// res.status(500).json({ message: "Internal Server Error", error });
// }
// };


// export const getSingleUser = async (req, res) => {
//   try {
//     const { id } = req.query;

//     let users;
//     if (id) {
//       users = await sql `select * from person where name = ${id}`;
//     } 
//     res.json(users);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "Internal Server Error", error: error.message });
//   }
// };


// export const updateSingleUser = async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     }).select("-password -isAdmin");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(user);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "Internal Server Error", error: error.message });
//   }
// };

// /**
//  * Delete a single user by ID
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  * @returns {Promise<void>} - Responds with a success message or an error message
//  */
// export const deleteSingleUser = async (req, res) => {
//   try {
//     let { id } = req.params;
//      const user = await sql `select * from person where id = ${id}`;
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json({ message: "User deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "Internal Server Error", error: error.message });
//   }
// };


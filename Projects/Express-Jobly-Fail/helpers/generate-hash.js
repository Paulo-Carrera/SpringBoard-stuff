const bcrypt = require('bcrypt');

// Function to hash a password
const hashPassword = async (plainPassword) => {
  const hashedPassword = await bcrypt.hash(plainPassword, 4);
  console.log("New Hashed Password:", hashedPassword);
};

// Call the function with the plain password you want
hashPassword('password');

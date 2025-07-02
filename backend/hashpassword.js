const bcrypt = require('bcryptjs');

const password = 'doctor123'; // change as needed

bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    console.log(`Hashed password for "${password}": ${hash}`);
    process.exit(0);
});

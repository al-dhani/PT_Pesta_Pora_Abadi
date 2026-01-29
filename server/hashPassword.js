import bcrypt from "bcryptjs";

const hash = await bcrypt.hash("sadmin123", 10);
console.log(hash);

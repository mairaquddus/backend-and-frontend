const { default: mongoose } = require("mongoose");

async function ConnectionDb() {
  try {
    await mongoose
      .connect("mongodb+srv://admin:admin@cluster0.yupxsua.mongodb.net/express")
      .then(() => console.log("Connection successfully"))
      .catch(() => console.log("Connection failed"));
  } catch (error) {
    console.log("Connection failed", error);
  }
}
module.exports = ConnectionDb;

import mongoose from "mongoose";

mongoose.connect('mongodb+srv://onlink:admin@cluster0.yauk4rs.mongodb.net/alura-node');

let db = mongoose.connection;

export default db;
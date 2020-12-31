import { Schema, model } from "mongoose";
const schema = new Schema({ test: { type: String } });

const Model = model("Model", schema);

export default Model;

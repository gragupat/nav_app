import { Schema } from 'mongoose';

const navSchema = new Schema({
    name: { type: String, required: true },
    shortLink: { type: String, required: true, lowercase: true, trim: true },
    fullUrl: { type: String, required: true }
});

export default navSchema

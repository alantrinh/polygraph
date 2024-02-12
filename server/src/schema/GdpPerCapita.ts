import mongoose from "mongoose";

const gdpPerCapitaSchema = new mongoose.Schema({
    country: String,
    year: Number,
    amount: Number
});

export default mongoose.model('GdpPerCapita', gdpPerCapitaSchema);

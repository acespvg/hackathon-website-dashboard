const mongoose = require('mongoose');

const genesisSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Phone: { type: String, required: true },
    Year: { type: String, required: true , enum: ['FE', 'SE', 'TE', 'BE']},
    Branch: { type: String, required: true, enum: ['Computer Engineering', 'Electronics and Telecommunication', 'Mechanical engineering', 'Information Technology'] },
    Sessions: { type: String, required: true }
}, { collection: 'Genesis-2425' });

const Genesis = mongoose.model('Genesis', genesisSchema);
module.exports = Genesis;

const mongoose = require('mongoose');

const techTriviaSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Phone: { type: String, required: true },
    Year: { type: String, required: true , enum: ['FE', 'SE', 'TE', 'BE']},
    Branch: { type: String, required: true, enum: ['Computer Engineering', 'Electronics and Telecommunication', 'Mechanical engineering', 'Information Technology'] }
}, { collection: 'TechTrivia-2425' });

const TechTrivia = mongoose.model('TechTrivia', techTriviaSchema);
module.exports = TechTrivia;

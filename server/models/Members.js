const mongoose = require('mongoose');

const membersSchema = new mongoose.Schema({
    MemberName: { type: String, required: true },
    MemberEmail: { type: String, required: true },
    MemberPhone: { type: String, required: true },
    MemberClass: { type: String, required: true , enum: ['SE', 'TE', 'BE']},
    MemberPaymentType: { type: String, required: true, enum: ['Cash', 'UPI'] },
    MemberDateOfPayment: { type: Date, required: true }
}, { collection: 'Members-2425' });

const Mermber2425 = mongoose.model('Member', membersSchema);
module.exports = Mermber2425;

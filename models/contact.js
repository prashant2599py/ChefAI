const { Schema, model }  = require('mongoose'); 

const contactSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email:{
        type: String,  
        required: false,  
    }, 
    phone: {
        type: Number,
        required: false,
    }, 
    message: {
        type: String,
        required: false,
    },
});

const Contact = model('Contact', contactSchema);

module.exports = Contact;
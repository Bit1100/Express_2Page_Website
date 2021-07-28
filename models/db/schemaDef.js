// Importing the modules
const mongoose = require('mongoose');
const validator = require('validator');

// Defining the User API Schema
const user = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
    },
    age: {
        type: Number,
        min: 18,
        validate(v) {
            if (!(v <= 65)) {
                return "Age Must Be Less than or Equal to 65"
            }
        },
        // validate: {
        //     validator: function (v) {
        //         return v <= 65
        //     },
        //     message: "Age Must Be Less than or Equal to 65"
        // },
        required: true,
        index: true
    },
    // email: {
    //     type: String,
    //     required: true,
    //     lowercase: true,
    //     validate(v) {
    //         if (!validator.isEmail(v)) {
    //             throw new Error("E-mail is invalid");
    //         }
    //     }
    // },
    gender: {
        type: String,
        lowercase: true,
        enum: ["male", "female", "transgender"]
    },
    active: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

// Defining the Service Resources API Schema
const resource = new mongoose.Schema({
    front: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v.value;
            },
            message: "Front Resource Cannot be Empty!!!"
        },
    },
    back: {
        type: String,
        validate(v) {
            if (!v) {
                return "Back Resource Cannot be Empty!!!";
            }
        },
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

// Defining the Home Services API Schema
const service = new mongoose.Schema({
    head1: {
        type: String,
        required: true,
    },
    head2: {
        type: String,
        required: true,
    },
    para: {
        type: String,
        validate(v) {
            if (!v) {
                return "Para Cannot be empty"
            }
        },
        required: true,
    },
    link: {
        type: String,
        validate(v) {
            if (!v) {
                return "Link Cannot be empty"
            }
        },
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

// Creating a Model based on Schema
const User = new mongoose.model(process.env.USER_SCHEMA, user);
const Service = new mongoose.model(process.env.SERVICE_SCHEMA, service);
const Resource = new mongoose.model(process.env.RESOURCE_SCHEMA, resource);

module.exports = { User, Service, Resource };

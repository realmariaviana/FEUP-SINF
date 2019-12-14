'user strict'

const mongoose = require('mongoose');

const { Schema } = mongoose;

// https://docs.mongodb.com/stitch/mongodb/document-schemas/

const exampleSchema = new Schema( {
    gerenal_field : {
        type: "<JSON Type>" | ["<JSON Type>", "2"],
        bsonType: "<BSON Type>" | ["<BSON Type>", "2"],
        enum: ["value1", "value2"],
        description: "descriptive text",
        title: "Short Description"
      },
    array_field : {
        bsonType: "array",
        items: "<Schema Document>" | ["<Schema Document>", "..."],
        additionalItems: "<boolean>" | "<Schema Document>",
        maxItems: "<integer>",
        minItems: "<integer>",
        uniqueItems: "<boolean>"
      },
    string_field : {
        bsonType: "string",
        maxLength: "<integer>",
        minLength: "<integer>",
        pattern: "<Regular Expression>"
      }

      /** BSON types
       * object
       * array
       * number
       * boolean
       * string
       * null
       */
}, 
{
    timestamps: true,
})


const example = mongoose.model('example', exampleSchema)

module.exports = example


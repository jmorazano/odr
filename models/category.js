const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    levels: [
      new Schema(
        {
          levelIndex: { type: Number },
          questions: [
            new Schema(
              {
                text: { type: String },
                shortName: { type: String },
                orderIndex: { type: Number },
                nextLevel: { type: Number },
              },
              { strict: false }
            ),
          ],
        },
        { strict: false }
      ),
    ],
    author: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { strict: false }
);

// export Page model
module.exports = mongoose.model('Category', categorySchema);

import mongoose, { Schema, Document, Types } from 'mongoose';

// Dream document interface
export interface IDreamDocument extends Document {
  user: Types.ObjectId;
  title: string;
  content: string;
  date: Date;
  mood: 'happy' | 'sad' | 'scared' | 'confused' | 'excited' | 'neutral';
  tags: string[];
  isLucid: boolean;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const dreamSchema = new Schema<IDreamDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true, // Index for faster queries
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      maxlength: [5000, 'Content cannot exceed 5000 characters'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    mood: {
      type: String,
      enum: ['happy', 'sad', 'scared', 'confused', 'excited', 'neutral'],
      default: 'neutral',
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: (tags: string[]) => tags.length <= 10,
        message: 'Cannot have more than 10 tags',
      },
    },
    isLucid: {
      type: Boolean,
      default: false,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for searching dreams
dreamSchema.index({ title: 'text', content: 'text', tags: 'text' });

const Dream = mongoose.model<IDreamDocument>('Dream', dreamSchema);

export default Dream;

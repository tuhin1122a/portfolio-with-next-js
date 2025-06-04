
import mongoose, { Schema, models } from "mongoose"

export interface IProject extends mongoose.Document {
  title: string
  description: string
  longDescription: string
  image: string
  tags: string[]
  demoUrl: string
  githubUrl: string
  features: string[]
  screenshots: string[]
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    longDescription: {
      type: String,
      required: [true, "Long description is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    tags: {
      type: [String],
      default: [],
    },
    demoUrl: {
      type: String,
      required: [true, "Demo URL is required"],
    },
    githubUrl: {
      type: String,
      required: [true, "GitHub URL is required"],
    },
    features: {
      type: [String],
      default: [],
    },
    screenshots: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

export const Project = models.Project || mongoose.model<IProject>("Project", projectSchema)


// import mongoose, { Schema, models } from "mongoose"

// export interface IProject extends mongoose.Document {
//   _id: mongoose.Types.ObjectId
//   title: string
//   slug: string
//   description: string
//   longDescription: string
//   image: string
//   tags: string[]
//   demoUrl: string
//   githubUrl: string
//   features: string[]
//   screenshots: string[]
//   featured: boolean
//   createdAt: Date
//   updatedAt: Date
// }

// const projectSchema = new Schema<IProject>(
//   {
//     title: {
//       type: String,
//       required: [true, "Title is required"],
//     },
//     slug: {
//       type: String,
//       required: [true, "Slug is required"],
//       unique: true,
//     },
//     description: {
//       type: String,
//       required: [true, "Description is required"],
//     },
//     longDescription: {
//       type: String,
//       required: [true, "Long description is required"],
//     },
//     image: {
//       type: String,
//       required: [true, "Image is required"],
//     },
//     tags: {
//       type: [String],
//       default: [],
//     },
//     demoUrl: {
//       type: String,
//       required: [true, "Demo URL is required"],
//     },
//     githubUrl: {
//       type: String,
//       required: [true, "GitHub URL is required"],
//     },
//     features: {
//       type: [String],
//       default: [],
//     },
//     screenshots: {
//       type: [String],
//       default: [],
//     },
//     featured: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true },
// )

// // Create slug from title before saving
// projectSchema.pre('save', function(next) {
//   if (this.title && (!this.slug || this.isModified('title'))) {
//     this.slug = this.title.toLowerCase()
//       .replace(/[^a-z0-9]+/g, '-')
//       .replace(/(^-|-$)/g, '')
//   }
//   next()
// })

// export const Project = models.Project || mongoose.model<IProject>("Project", projectSchema)


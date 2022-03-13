const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// connect with database
const connect = () => {
  return mongoose.connect(
    "mongodb://127.0.0.1:27017"
  );
};

// Section ( 1 Book can belong to only one section at a time but 1 section can have multiple books ).
// Books ( Book can be written by 1 or more author and also contains name, body ).
// Author ( an author can write one or more books and he also has first_name and last_name).

// Create book Schema
const bookSchema = new mongoose.Schema(
  {
    book_name: { type: String, required: true, unique: true },
    author_name: { type: String, required: true },
    body: { type: String, required: true },
    price: { type: Number },
    category: { type: String },
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "section",
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Creating model
const Book = mongoose.model("book", bookSchema);

// Creating Section schema
const sectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Creating section model
const Section = mongoose.model("section", sectionSchema);

// creating author model;
const authorSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  book: [],
  //   bookId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "book",
  //     required: true,
  //   },
});
// Creating
const Author = mongoose.model("author", authorSchema);

// Section CRUD Operations;
app.get("/section", async (req, res) => {
  try {
    const sections = await Section.find({}).lean().exec();

    return res.status(200).send({ section: sections }); // []
  } catch (err) {
    return res.status(500).send({ message: err });
  }
});

app.post("/section", async (req, res) => {
  try {
    const sections = await Section.create(req.body);

    return res.status(200).send({ section: sections }); // []
  } catch (err) {
    return res.status(500).send({ message: err });
  }
});

app.get("/section/:id", async (req, res) => {
  try {
    const section = await Section.findById(req.params.id).lean().exec();
    // db.users.findOne({_id: Object('622893471b0065f917d24a38')})

    return res.status(200).send(section);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// Author CRUD Operations
app.get("/author", async (req, res) => {
  try {
    const authors = await Author.find({}).lean().exec();

    return res.status(200).send({ author: authors }); // []
  } catch (err) {
    return res.status(500).send({ message: err });
  }
});

app.post("/author", async (req, res) => {
  try {
    const authors = await Author.create(req.body);

    return res.status(200).send({ author: authors }); // []
  } catch (err) {
    return res.status(500).send({ message: err });
  }
});

app.get("/author/:id", async (req, res) => {
  try {
    const authors = await Author.findById(req.params.id).lean().exec();

    return res.status(200).send({ author: authors.book }); // []
  } catch (err) {
    return res.status(500).send({ message: err });
  }
});

app.patch("/author/:id", async (req, res) => {
  try {
    let author = await Author.findByIdAndUpdate(
      req.params.id,
      { $push: { book: req.body } },
      {
        new: true,
        useFindAndModify: false,
      }
    )
      .lean()
      .exec();
    return res.status(200).send(author);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// Book CRUD Operation

app.get("/book", async (req, res) => {
  try {
    const books = await Book.find({}).lean().exec();

    return res.status(200).send({ books: books }); // []
  } catch (err) {
    return res.status(500).send({ message: err });
  }
});

app.post("/book", async (req, res) => {
  try {
    const books = await Book.create(req.body);

    return res.status(201).send(books);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.get("/book/:id", async (req, res) => {
  try {
    const books = await Book.findById(req.params.id).lean().exec();
    // db.users.findOne({_id: Object('622893471b0065f917d24a38')})

    return res.status(200).send(books);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//listening on port
app.listen(4000, async () => {
  try {
    await connect();
    console.log("Listening on port 4000");
  } catch (error) {
    console.log(error);
  }
});

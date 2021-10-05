require("dotenv").config();
const express  = require("express");
const database = require("./database/index");
const mongoose = require("mongoose");

// models

const BookModels = require("./database/book");
const AuthorModels = require("./database/author");
const PublicationModel = require("./database/publication");

// initialization
const BOOKY = express();
BOOKY.use(express.json());

mongoose.connect(process.env.MONGO_DATABASE_URL,{

    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
    // useCreateIndex: true,
}).then(()=> console.log("Connection successfully established!!!!"));

// mongoose.connect("mongodb://localhost:27017/FIRSTDB", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   }).then(()=> console.log("Connection successfully established!!!!"));

/*
Route              /
Description       Get all books
Access            public
Parameter         none
methods           GET
*/
BOOKY.get("/", (req,res) => {
    return res.json({authors: database.author}); 
});


/*
Route              /
Description       Get specific books based on isbn
Access            public
Parameter         isbn
methods           GET
*/
BOOKY.get("/is/:isbn",(req,res) => {
    const getspecificBook = database.books.filter(
        (i) => i.ISBN===req.params.isbn);

        if(getspecificBook.length===0){
            return res.json({
                error: `No book found for the ISBN of ${req.params.isbn}`,
            });
        }

        return res.json({book: getspecificBook});
});

/*
Route              /c
Description       Get all books based on category
Access            public
Parameter         category
methods           GET
*/
BOOKY.get("/c/:category",(req,res) => {
    const getspecificBook = database.books.filter(
        (i) => i.category.includes(req.params.category)
        
    );

    if (getspecificBook.length===0){
        return res.json({
            error: `No book found for the category of ${req.params.category}`,
        });
    }

    return res.json({book: getspecificBook});
});

/*
Route              /l
Description       Get all books based on languages
Access            public
Parameter         language
methods           GET
*/
BOOKY.get("/l/:language",(req,res) =>{
    const getSpecificBook  = database.books.filter(
        // (i)=> i.languages.includes(req.params.language)
         (i) => i.language===req.params.language
    );

    if(getSpecificBook.length===0){
        return res.json( { error: `No book found for the language of ${req.params.category}`} );
    }

    return res.json({book:getSpecificBook});
});


/*
Route              /author
Description       Get all books based on authors
Access            public
Parameter         none
methods           GET
*/
BOOKY.get("/author", (req,res)=>{
    return res.json({authors: database.author});
});


/*
Route              /name
Description       Get all books based on authors name
Access            public
Parameter         none
methods           GET
*/

BOOKY.get("/name/:author_name", (req,res)=>{
    const getspecificBook = database.author.filter(
        (i) => i.name === req.params.author_name
    );
    if(getspecificBook.length==0){
        return res.json({error:`NO books found of this author ${req.params.author_name}`});
    }

    return res.json({author:getspecificBook});
})


/*
Route              /author_id
Description       Get all books based on authors id
Access            public
Parameter         none
methods           GET
*/

BOOKY.get("/author_id/:id", (req,res)=>{
    const getspecificBook = database.author.filter(
        (i) => i.id == req.params.id
    );
    if(getspecificBook.length==0){
        return res.json({error:`NO books found of this author ${req.params.id}`});
    }

    return res.json({author:getspecificBook});
})

/*
Route              /author/books
Description       Get all books based on authors isbn no.
Access            public
Parameter         isbn
methods           GET
*/


BOOKY.get("/author/book/:isbn",(req,res) => {
        const getspecificAuthor = database.author.filter(
            (author) => author.books.includes(req.params.isbn));
            if(getspecificAuthor.length==0){
                return res.json({
                     error: `No author found for the book of ${req.params.isbn}`,
                });
            }
            return res.json({authors:getspecificAuthor});
});

/*
Route             /pub
Description       Get all books based on publications
Access            public
Parameter         none
methods           GET
*/

BOOKY.get("/pub",(req,res)=>{
    return res.json({pub: database.publications});
});

/*
Route             /pub/:name
Description       Get all books based on publications based on names
Access            public
Parameter         name
methods           GET
*/

BOOKY.get("/pub/:name",(req,res)=>{

    const getspecificpublicationBooks = database.publications.filter(
        (i) => i.name === req.params.name
    );

    if(getspecificpublicationBooks.length==0){
        return res.json({error: `No book found of publication ${req.params.name}`});
    }

    return res.json(getspecificpublicationBooks);

});

/*
Route             /pub/books/:isbn
Description       Get all books based on publications based on books isbn
Access            public
Parameter         isbn
methods           GET
*/

BOOKY.get("/pub/books/:isbn",(req,res)=>{

    const getspecificpublicationBooks = database.publications.filter(
        (i) => i.books.includes(req.params.isbn)
    );

    if(getspecificpublicationBooks.length==0){
        return res.json({error: `No book found of publication ${req.params.isbn}`});
    }

    return res.json(getspecificpublicationBooks);

});

/*
Route             /book/new
Description       add new book
Access            public
Parameter         none
methods           post
*/

BOOKY.post("/book/new",(req,res) => {
    const { newbooks } = req.body;

    database.books.push(newbooks);
    return res.json({books: database.books});
});

/*
Route             /author/new
Description       add new author
Access            public
Parameter         none
methods           post
*/

BOOKY.post("/author/new",(req,res) => {
    const { newauthor } = req.body;

    database.author.push(newauthor);
    return res.json({author: database.author});
});

/*
Route             /pub/new
Description       add new publication
Access            public
Parameter         none
methods           post
*/

BOOKY.post("/pub/new", (req,res)=>{
     const {newpublications} = req.body;

     database.publications.push(newpublications);
    return res.json({publication: database.publications});
});

/*
Route             /book/update/title
Description       update book title
Access            public
Parameter         none
methods           put
*/

BOOKY.put("/book/update/title/:isbn",(req,res)=>{

    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.title = req.body.NEWBOOKTITLE;
            return;
        }
    });
    return res.json({books: database.books});
});

/*
Route             /book/update/author
Description       update/add new author for a book
Access            public
Parameter         none
methods           put
*/

BOOKY.put("/book/update/author/:isbn/:authorid", (req,res)=>{
    
    database.books.forEach((book) => {
        if(book.ISBN=== req.params.isbn){
            return book.author.push(parseInt(req.params.authorid));
        }
    });

    database.author.forEach((author)=>{
        if(author.id==parseInt(req.params.authorid)){
            return author.books.push(req.params.isbn);
        }
    });

    return res.json({books: database.books, author: database.author});
});

/*
Route             /update/author/name/:id
Description       update a author name using id
Access            public
Parameter         none
methods           put
*/

BOOKY.put("/update/author/name/:id", (req, res) => {
    
    database.author.forEach((author)=> {
        if(author.id===parseInt(req.params.id)){
            author.name = req.body.NEWAUTHORNAME;
            return;
        }
    });
    return res.json({author: database.author});
});

/*
Route             /update/pub/name/:id
Description       update a publisher name using id
Access            public
Parameter         none
methods           put
*/

BOOKY.put("/update/pub/name/:id", (req, res) => {
    
    database.publications.forEach((pub)=> {
        if(pub.id===parseInt(req.params.id)){
            pub.name = req.body.NEWPUBNAME;
            return;
        }
    });

    return res.json({author: database.publications});
});

/*
Route             /update/pub/name/:id/:isbn
Description       update/add a publisher name using id
Access            public
Parameter         none
methods           put
*/

BOOKY.put("/update/pub/name/:id/:isbn", (req,res)=>{

    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
           return book.publications.push(parseInt(req.params.id));
        }
    });

    database.publications.forEach((pub)=>{
        if(pub.id===parseInt(req.params.id)){
            return pub.books.push(req.params.isbn);
        }
    });

    return res.json({
        books: database.books,
        pub: database.publications,
        message : "Successfully updated publications",    
    });
});

/*
Route             /delete/book/:isbn
Description       delete a book
Access            public
Parameter         ISBN
methods           DELETE
*/

BOOKY.delete("/delete/book/:isbn",(req,res)=>{
    const NEWDATABSE = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
    );
        database.books = NEWDATABSE;
        return res.json({books: database.books});
});

/*
Route             /delete/book/author
Description       delete an author from book database and then updating author book isbn array
Access            public
Parameter         ISBN
methods           DELETE
*/
BOOKY.delete("/delete/book/author/:isbn/:authorid", (req,res)=>{

    database.books.forEach((book)=> {
        if(book.ISBN===req.params.isbn){
            const newauthorlist = book.author.filter(
                (newauthor) => newauthor !== parseInt(req.params.authorid)
            );
            book.author = newauthorlist;
            return;
        }
    });

    database.author.forEach((author)=> {
        if(author.id===parseInt(req.params.authorid)){
            const newBookslist = author.books.filter(
                (book) => book !== req.params.isbn
            );
            author.books = newBookslist ;
            return;
        }
    });

     return res.json({
        message:"author has been deleted !!!",
        book: database.books,
        author: database.author,
        });
 });

 /*
Route             /del/author/:id
Description       delete an author
Access            public
Parameter         id
methods           DELETE
*/

BOOKY.delete("/del/author/:id",(req,res) => {
    const newdatabase = database.author.filter(
        (author)=> author.id !== parseInt(req.params.id)
        );
        database.author = newdatabase;
        return res.json({author: database.author});
});

 /*
Route             /del/pub/:id
Description       delete an author
Access            public
Parameter         id
methods           DELETE
*/

BOOKY.delete("/del/pub/:id",(req,res) => {
    const newdatabase = database.publications.filter(
        (pub)=> pub.id !== parseInt(req.params.id)
        );
        database.publications = newdatabase;
        return res.json({pub: database.publications});
});

/*
Route             /delete/book/pub/:isbn/:id
Description       delete a pub from book database and then updating pub book isbn array
Access            public
Parameter         ISBN/pubid
methods           DELETE
*/

BOOKY.delete("/delete/book/pub/:isbn/:id",(req,res)=>{

        database.books.forEach((book)=> {
            if(book.ISBN===req.params.isbn){
               const newpubdata = book.publications.filter(
                   (i) => i !== parseInt(req.params.id));
                   book.publications = newpubdata;
            }
            return;
        });

        database.publications.forEach((pub) => {
            if(pub.id === parseInt(req.params.id)){
                const pubarray  = pub.books.filter((i)=> i!== req.params.isbn);
                pub.books = pubarray;
            }
            return;
        });

        return res.json({
            message : "Book & pub data has been updated",
            books: database.books,
            pub: database.publications
        });
});

BOOKY.listen(4000, () => console.log("hey!!server is running"));


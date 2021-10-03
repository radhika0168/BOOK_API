const books = [
    {
        ISBN : "12345Book",
        title : "getting started with mern",
        pub_DAte: "2021-07-07",
        language : "en",
        numPage : 250,
        author: [1,2],
        publications:[1],
        category: ["tech", "programming", "education", "trailer"],
    },
    {
        ISBN : "125MERN",
        title : "getting started with full stack",
        pub_DAte: "2021-03-10",
        language : "En",
        numPage : 500,
        author: [1],
        publications:[1],
        category: ["tech", "programming", "education", "trailer","coding"],
    },
];
const author = [
    {
        id:1,
        name:"radhika",
        books:["12345Book","123BOOks2"],
    },
    {
        id:2,
        name:"Elon musk",
        books:["12345Book"],
    }
];


const publications = [
    {
        id:1,
        name:"gargs",
        books:["12345Book","125MERN"]

    },
    {
        id:2,
        name:"baniya",
        books:["shiva"]

    }

];

//only after using export module we can export module

// export default {books, author, publications};
module.exports = {books,author,publications};
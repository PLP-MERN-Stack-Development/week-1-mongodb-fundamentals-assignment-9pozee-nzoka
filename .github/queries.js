// queries through mongoDB compass
// updating price by a specific title
[
  {
    "$match": {
      "title": "Dystopian"
    }
  },
  {
    "$set": {
      "price": 15.00
    }
  }
]

//deleting a specific book by title
[{ $match: { title: "Dystopian" } }, { $unset: "_id" }]

//finding books by genre
[
    { "genre": "Fantasy" }
]


//TASK3
//Use projection to return only the title, author, and price fields in your queries
[
  {
    $project: {
      title: 1,
      author: 1,
      price: 1
    }
  }
]

//Write a query to find books that are both in stock and published after 2010
[
  { "$match": { "in_stock": true, "published_year": { "$gt": 2010 } } }
]
//Implement sorting to display books by price (both ascending and descending)

  
[
  { $sort: { price: 1 } },
  { $sort: { price: -1 } }
]
//Use the `limit` and `skip` methods to implement pagination (5 books per page)
[{ "$skip": 0 }, { "$limit": 5 }]

//TASK 4
//Create an aggregation pipeline to calculate the average price of books by genre
[
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]
//Create an aggregation pipeline to find the author with the most books in the collection
[
  {
    $group: {
      _id: "$author",
      bookCount: { $sum: 1 }
    }
  },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
]

//Implement a pipeline that groups books by publication decade and counts them
[
  {
    $project: {
      decade: { $subtract: ["$year", { $mod: ["$year", 10] }] }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 }
  }
]

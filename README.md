# Bookstore Project — README (Using MongoDB Compass)

# This project demonstrates how tasks were carried out **using MongoDB Compass GUI**, covering **advanced queries**, **aggregation pipelines**, and **indexing**.

---

### Task 3: Advanced Queries (Compass)

/***Find books in stock and published after 2010:**/

* Open your `books` collection in Compass.
* Click **Filter** and enter:
  `{ in_stock: true, published_year: { $gt: 2010 } }`

**Use projection:**

* In the **Project** section, enter:
  `{ title: 1, author: 1, price: 1 }`

 **Sort by price:**

* In the **Sort** section, enter:
  `{ price: 1 }` for ascending, `{ price: -1 }` for descending.

 **Use limit and skip:**

* Set **Limit** to `5` to show 5 books per page.
* Use **Skip** to move to the next page (e.g., skip `5` for page 2).

---

### Task 4: Aggregation Pipeline (Compass)

**Average price by genre:**

* Go to the **Aggregations** tab.
* Add a `$group` stage:

  ```json
  {
    _id: "$genre",
    averagePrice: { $avg: "$price" }
  }
  ```

**Find the author with the most books:**

* Add `$group`:

  ```json
  {
    _id: "$author",
    bookCount: { $sum: 1 }
  }
  ```
* Add `$sort`: `{ bookCount: -1 }`
* Add `$limit`: `1`

 **Group books by publication decade:**

* Add `$project` stage:

  ```json
  {
    decade: {
      $subtract: ["$published_year", { $mod: ["$published_year", 10] }]
    }
  }
  ```
* Add `$group`:

  ```json
  {
    _id: "$decade",
    count: { $sum: 1 }
  }
  ```
* Add `$sort`: `{ _id: 1 }`

---

### Task 5: Indexing (Compass)

**Create index on `title`:**

* Go to **Indexes** tab in your `books` collection.
* Click **Create Index**.
* Set `title` as the field and choose `Ascending`.

**Create compound index on `author` and `published_year`:**

* In the same tab, click **Create Index**.
* Add fields:

  * `author` — Ascending
  * `published_year` — Ascending

**Use `.explain()` to verify index usage:**

* Run a **Filter** like `{ author: "Jane Doe", published_year: 2020 }`.
* Click **Explain Plan**.
* Compass will show whether an `IXSCAN` or `COLLSCAN` is used.

Look for `IXSCAN` — this confirms your index is working!

---

## Notes

* All tasks were done u

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => {
    if (!book.borrows[0].returned) {
      // checking 0th element because that is the only one that has shown false
      acc++;
    }
    return acc;
  }, 0);
}

function mostPopularGenre(books) {
  let arr = books.sort((bookA, bookB) =>
    bookA.borrows.length > bookB.borrows.length ? -1 : 1
  );
  return arr;
}

function sortByCount(array){
  array.sort((a, b) => b.count - a.count);
}

function getMostCommonGenres(books) {
  ranks = books.reduce((results, book) => {
    if (!results.find((result) => result.name === book.genre)) {
      results.push({ name: book.genre, count: 1 });
    } else {
      results.find((result) => result.name === book.genre).count++;
    }
    return results;
  }, []);  
  sortByCount(ranks);
  return ranks.slice(0, 5); 
}

function sortMostPopularToLeast(books) {
  let arr = books.sort((bookA, bookB) =>
    bookA.borrows.length > bookB.borrows.length ? -1 : 1
  );
  return arr;
}

function getMostPopularBooks(books) {
  let popularOrganized = sortMostPopularToLeast(books);
  let top5books = [];

  for (let i = 0; i < 5; i++) {
    top5books.push(
      (popularOrganized[i] = {
        name: popularOrganized[i].title,
        count: popularOrganized[i].borrows.length,
      })
    );
  }
  return top5books;
}

function getMostPopularAuthors(books, authors) {
  let result = [];
  authors.forEach((author) => {
    let theAuthor = {
      name: `${author.name.first} ${author.name.last}`,
      count: 0,
    };
    books.forEach((book) => {
      if (book.authorId === author.id) {
        theAuthor.count += book.borrows.length;
      }
    });
    result.push(theAuthor);
  });
  return result.sort((bookA, bookB) => bookB.count - bookA.count).slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
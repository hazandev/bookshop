'use strict'
var gBooks;
var uid = 0; //@CR makeid
var gSortDec = '';
const KEY = 'books';

function createBooks() {
    gBooks = loadFromStorage(KEY);
    if (!gBooks) {
        gBooks = [];
        gBooks.push(_createBook("Harry potter and philosopher's Stone"));
        gBooks.push(_createBook("Harry potter and chamber of Secrets"));
        gBooks.push(_createBook("Harry potter and prisoner of Azkaban"));
        gBooks.push(_createBook("Harry potter and Goblet of Fire"));
        gBooks.push(_createBook("Harry potter and Order of the Phoenix"));
        gBooks.push(_createBook("Harry potter and Half-Blood Prince"));
        gBooks.push(_createBook("Harry potter and Deathly Hallows"));
        saveToStorage(KEY, gBooks);
        return gBooks
    };
    return gBooks;
    //@CR get from storage... unless there is nothing and then create default books.

}

function _createBook(title) {
    uid++;
    return {
        uid: uid,
        title: title,
        desc: `The ${title} is ${makeLorem(40)}`,
        price: `${getRandomIntInclusive(30, 60)}`,
        img: `../../img/harryPotter${uid}.jpg`
    }
}

function removeBook(bookId) {
    var idx = gBooks.findIndex(function (book) { book.id === bookId })
    gBooks.splice(idx, 1);
    saveToStorage(KEY, gBooks);
}

function addBook(title = "aaa") {
    gBooks.push(_createBook(title));
    saveToStorage(KEY, gBooks);
}

function getBooks() {
    return loadFromStorage(KEY);
}
function updateBook(bookId, updatePrice) {
    //@CR var idx = ... 
    gBooks[gBooks.findIndex(book => book.uid === bookId)].price = updatePrice;
    saveToStorage(KEY, gBooks);
}

function toggleSort() {
    gSortDec = !gSortDec;
}

function getSort() {
    return gSortDec;
}

function sortBooks(){
    let books = loadFromStorage(KEY);
    if(gSortDec){
        books = books.sort(function(x, y){
            return x.price - y.price;
        })
    }else{
        books = books.sort(function(x, y){
            return  y.price - x.price;
        })
    }
    saveToStorage(KEY,books);
}
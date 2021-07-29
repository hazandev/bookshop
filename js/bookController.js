'use strict'

$(init);
const $elModal = $('.modal').hide();

function init() {
    createBooks();
    renderBooks();
}
function renderBooks() {
    let strBooks = ``;
    var books = getBooks();
    strBooks = books.map((book, index) => {
        return `<tr>
        <td>${index+1}</td>
        <td >${book.title}</td>
        <td class="price-data-${book.uid}">${book.price} $</td>
        <td><img src="./img/harryPotter${book.uid}.jpg" width="60px" height="70px" alt=""></td>
        <td class="option">
            <button class="read-btn btn" title="Read Book" onClick = "readBookRender(${book.uid})"><i class="fas fa-2x fa-glasses"></i></button>
            <button class="update-btn btn" title="Update Book" onClick = "onUpdateBook(${book.uid})"><i class="fas fa-2x fa-file-invoice"></i></button>
            <button class="Delete-btn btn"title="Delete Book" onClick = "onRemoveBook(${book.uid})"><i class="fas fa-2x fa-trash-alt"></i></button>
        </td>
    </tr>`
    }).join('');
    let strTable = `<table><tr>
            <th style="border-bottom: 2px solid #d35400;color: #d35400;">
            <div class="input-add-book">
            <input type="text" name="title" data-trans="add-book-placeholder" placeholder="Book name "></input>
            <i onClick="confirmAddBook(event)"class="fas fa-check-square"></i>
            </div>
            <button class="btn create-book" onclick="onAddBook()"><i class="fas fa-2x fa-plus-square"></i></button>
            </th>
            <th style="border-bottom: 2px solid #d35400" data-trans="book">Book</th>
            <th class="sort" onclick="onSort()"><i class="${renderSort()}"></i></th>
            <th></th>
            <th class ="option-th"></th>
        </tr>${strBooks}</table>`;
    $('.table-container').html(strTable);
    $('.input-add-book').hide();
    doTrans();
}
function renderSort(){
    let classSort = ``;
    getSort() === false ? classSort = `fas fa-sort-up mark` : classSort = `fas fa-sort-down mark`;
    if(getSort() === '') classSort = 'fas fa-sort-down'
    return classSort;
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks();
}

function onAddBook() {
    $('.create-book').hide();
    $('.input-add-book').show()
}

function confirmAddBook(event) {
    const titleBook = $('input[name=title').val();
    addBook(titleBook);
    renderBooks();
}

function onUpdateBook(bookId) {
    const strInput = `<div class="input-update">
    <label for="price">Update price: </label>
    <input type="number" name = "price">
    <i onClick="confirmUpdate(${bookId})"class="fa-2x fas fa-check-square"></i>
    </div>`
    const $elUpdate = $(`.price-data-${bookId}`);
    $elUpdate.html(strInput);
}

function confirmUpdate(bookId) {
    const newPrice = $('input[name="price"').val();
    updateBook(bookId, parseInt(newPrice));
    renderBooks();
}

function readBookRender(bookId) {
    const $elModal = $('.modall');
    const book = gBooks.find(book => book.uid === bookId);
    const elBookModal = `<h1>${book.title}</h1>
    <p>${book.desc}</p>
    <img src="./img/harryPotter${book.uid}.jpg" alt="">
    <h1 class="price">Price: ${book.price} $</h1>`;
    $elModal.html(elBookModal);
    $elModal.animate({ "bottom": "-15%", "right": "-1%" });
    setTimeout(() => {
        $elModal.animate({ "bottom": "-110%", "right": "-110%" });
    }, 5000);

    console.log($elModal);
}

function onSort() {
    //boolean 0 dec 1 inc
    toggleSort();
    const $elSort = $('.fa-sort-down');
    $elSort.toggleClass('mark');
    console.log($elSort);
    sortBooks();
    renderBooks();
    // renderTableBySort(users)
}


function onSetLang(lang) {
    setLang(lang);
    // TODO: if lang is hebrew add RTL class to document.body
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    doTrans();
    renderBooks();
}

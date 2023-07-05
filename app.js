const card_container = document.querySelector(".book-list");
const para = document.createElement('p');
const add_btn = document.getElementById('add_btn');
const new_book = document.querySelector('.new_book');
const container = document.querySelector('.container');
const submit = document.getElementById('submit_btn');
const form = document.getElementById('form');
const overlay = document.getElementById('myOverlay');


add_btn.addEventListener('click', ()=>{
    overlay.style.display = "block";
    container.classList.add('blur');
})

let book_name = document.getElementById("title").value;
let author_name = document.getElementById("author").value;
let pages= document.getElementById('pages');

Book(book_name,author_name,pages);


const myLibrary =[
    {
        "title" : "harry",
        "author" : "test",
        "pages": 344
    },
    {

        "title" : "harfffry",
        "author" : "tesdddt",
        "pages": 34
    }
];

myLibrary.forEach((obj)=>{
    let book = document.createElement('div');
    book.classList.add('card');
    book.innerText = `${obj.title},${obj.author},${obj.pages}`
    card_container.append(book);
})

function Book(title,author,pages_no,status){
    this.author  = author;
    this.title = title;
    this.pages = pages_no;
    this.status = status;
    myLibrary.push(this);
}


// submit.addEventListener('click',addBookToLibrary);


// function addBookToLibrary{

// }




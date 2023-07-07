const card_container = document.querySelector(".book-list");
const para = document.createElement('p');
const add_btn = document.getElementById('add_btn');
const new_book = document.querySelector('.new_book');
const container = document.querySelector('.container');
const submit = document.getElementById('submit_btn');
const form = document.getElementById('form');
const overlay = document.getElementById('myOverlay');
const cross = document.getElementById('cross');
const inputs = document.querySelectorAll('.book_input');

add_btn.addEventListener('click', ()=>{
    overlay.style.display = "block";
    container.classList.add('blur');
})

cross.addEventListener('click',event =>{
    event.preventDefault();
    container.classList.remove('blur');
    overlay.style.display = "none";
}
);

const myLibrary = [];


submit.addEventListener('click', (event)=>
{
    event.preventDefault();
    let book_name = document.getElementById("title").value;
    let author_name = document.getElementById("author").value;
    let pages= document.getElementById('pages').value;
   if (book_name!='' &&author_name!=''&&pages!='') new Book(book_name,author_name,pages,false)
}
);






function Book(book_name,author_name,pages,status){
    this.title = book_name;
    this.author = author_name;
    this.pages = pages;
    this.status = status;
  
    myLibrary.push(this);
    console.log(myLibrary);
   addBookToLibrary();
}



function addBookToLibrary(){
    myLibrary.forEach( (obj)=>{
        if (obj.status==false){
            let book = document.createElement('div');
            book.classList.add('card');
            book.innerText = `${obj.title},${obj.author},${obj.pages}`;
            card_container.append(book);
            obj.status = true;
        }
    })
    inputs.forEach(element => {
        element.value = '';
});

}



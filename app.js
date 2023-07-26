const card_container = document.querySelector(".book-list");
const para = document.createElement('p');
const new_book = document.querySelector('.new_book');
const container = document.querySelector('.container');
const submit = document.getElementById('submit_btn');
const overlay = document.getElementById('myOverlay');
const inputs = document.querySelectorAll('.book_input');

const addBtn = document.querySelectorAll('[data-modal-target]');
const closeBtn = document.querySelectorAll('[data-close-button]');


let bookIndex = 0; //linking card and object array through dataset.

addBtn.forEach(button=>{
    button.addEventListener('click',()=>{
        console.log(button.dataset.modalTarget);
        const modal =document.getElementById(button.dataset.modalTarget);

        openModal(modal);

    })
})

closeBtn.forEach(button=>{
    button.addEventListener('click',()=>{

        const modal =button.closest('.new_book');
        console.log(modal);
        closeModal(modal);
    })
})

function openModal(modal){
    console.log(modal);
    if (modal ==null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
}
function closeModal(modal){
    if (modal ==null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

overlay.addEventListener('click', ()=>{
    const modals = document.querySelectorAll(".modal.active");
    modals.forEach(modal =>{
        closeModal(modal);
    });
})


const myLibrary = [];




submit.addEventListener('click', event=>
{
    event.preventDefault();
    let book_name = document.getElementById("title").value;
    let author_name = document.getElementById("author").value;
    let pages= document.getElementById('pages').value;
   if(book_name!='' &&author_name!=''&&pages!='') new Book(book_name,author_name,pages,false) 
    // closeModal(document.querySelector('.modal'));
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
    eventAdd();
}



function addBookToLibrary(){
    myLibrary.forEach( (obj)=>{
        if (obj.status==false){
            let book = document.createElement('div');
            let title = document.createElement('p');
            let author = document.createElement('p');
            let pages = document.createElement('p');
            book.classList.add('card');
            title.classList.add('title');
            author.classList.add('author');
            pages.classList.add('pages');
            title.innerText = `${obj.title}`
            author.innerText = `${obj.author}`
            pages.innerText = `${obj.pages}`;           
            book.append(title,author,pages);

            const deleteBook = document.createElement("button");
            deleteBook.classList.add("delete-book","book-button");
            deleteBook.dataset.index = bookIndex++;
            deleteBook.innerText="Delete";
            const editBook = document.createElement("button");
            editBook.classList.add("edit-book","book-button");
            editBook.innerText="Edit";
            let buttons= document.createElement('div');
            buttons.classList.add("card-buttons");
            buttons.append(editBook);
            buttons.append(deleteBook);
            book.append(buttons);
            
            card_container.append(book);
            obj.status = true;
        }
    })
    inputs.forEach(element => {
        element.value = '';
});

}

function eventAdd(){
    let bookBtn = document.querySelectorAll(".book-button");
    
    bookBtn.forEach((button)=>{
        button.addEventListener('click',(e)=>{
            if (e.target.classList.contains("delete-book")){
                myLibrary.splice(e.target.dataset.index,1);
                ((e.target.parentNode).parentNode).remove();
            }else if(e.target.classList.contains("edit-book")){
                openModal(new_book);
                let title;
                let author; 
                let pages;  
                let state;
                myLibrary.filter(function(item){
                    title = item.title;
                    author= item.author;
                    pages = item.pages;
                    state =item.status
                })
                console.log(title);
                if (state){
                    console.log("$1");
                    console.log(e.target.id);
                   if (e.target.id==="title"){
                    console.log("$2");
                    e.target.id.innerText = title;
                   }
                    

                }
                // let author = myLibrary[e.target.dataset.index].author;
                // let pages = myLibrary[e.target.dataset.index].pages;
            }
        });
});

}


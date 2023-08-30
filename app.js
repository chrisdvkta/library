const card_container = document.querySelector(".book-list");
const para = document.createElement('p');
const new_book = document.querySelector('.new_book');
const container = document.querySelector('.container');
const submit = document.getElementById('submit_btn');
const overlay = document.getElementById('myOverlay');
const inputs = document.querySelectorAll('.book_input');

const addBtn = document.querySelectorAll('[data-modal-target]');
const closeBtn = document.querySelectorAll('[data-close-button]');

const myLibrary = [];

let bookIndex = 0; //linking card and object array through dataset.
let currentBookIndex = 0; //to store index of the book details to be edited in the array myLibrary

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
    
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') { 
            closeModal(modal);
        }
    });
}

function closeModal(modal){
    if (modal ==null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
    reset();
}

overlay.addEventListener('click', ()=>{
    const modals = document.querySelectorAll(".modal.active");
    modals.forEach(modal =>{
        closeModal(modal);
    });
})



function EditModal(modal, index){

    console.log(modal);
    if (modal ==null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
    submit.value = "Edit";
    inputs.forEach((input)=>{
        console.log(input , input.id);
        if (input.id =="title") input.value = `${myLibrary[index].title}`;
        if (input.id =="author") input.value = `${myLibrary[index].author}`;
        if (input.id =="pages") input.value = `${myLibrary[index].pages}`;
    })
}






submit.addEventListener('click', event=>
{
    if (submit.value ==="Add"){

        console.log(event)
        event.preventDefault();
        let book_name = document.getElementById("title").value;
        let author_name = document.getElementById("author").value;
        let pages= document.getElementById('pages').value;
        
        
        if(book_name!='' &&author_name!=''&&pages!='') new Book(book_name,author_name,pages,false) 
    }else if (submit.value==="Edit"){
        event.preventDefault();
        let book_name = document.getElementById("title").value;
        let author_name = document.getElementById("author").value;
        let pages= document.getElementById('pages').value;
        EditObject(book_name,author_name,pages);
        closeModal(new_book);
    }
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
            title.classList.add('title',"content");
            author.classList.add('author',"content");
            pages.classList.add('pages',"content");
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
            editBook.dataset.index = bookIndex -1;
            book.dataset.index =bookIndex -1;
            let buttons= document.createElement('div');
            buttons.classList.add("card-buttons");
            buttons.append(editBook);
            buttons.append(deleteBook);
            book.append(buttons);
            
            card_container.append(book);
            obj.status = true;
        }
    })
    reset();
}

function eventAdd(){
    let bookBtn = document.querySelectorAll(".book-button");
    
    bookBtn.forEach((button)=>{
        button.addEventListener('click',(e)=>{
            const tgt = (e.target.parentNode).parentNode;
            console.log(tgt);
            if (e.target.classList.contains("delete-book")){
                myLibrary.splice(e.target.dataset.index,1);
                ((e.target.parentNode).parentNode).remove();
            }else if(e.target.classList.contains("edit-book")){
                currentBookIndex = e.target.dataset.index;
                EditModal(new_book,currentBookIndex);
            }
                // let author = myLibrary[e.target.dataset.index].author;
                // let pages = myLibrary[e.target.dataset.index].pages;
        }
        )    
            
        
}
    )};


function EditObject(title,author_name,pages){
    myLibrary[currentBookIndex].title = title;
    myLibrary[currentBookIndex].author = author_name;
    myLibrary[currentBookIndex].pages = pages;
    console.log(myLibrary);
    console.log("Index Book : ", currentBookIndex);
    let card = document.querySelectorAll(".card");
        card.forEach((item)=>{
        console.log(item);
        console.log(item.dataset.index);
        let currentCardIndex = item.dataset.index;
        if (currentCardIndex ===currentBookIndex){
                (item.childNodes).forEach((node)=>{
                    console.log(node);
                    if (node.classList.contains('title')){
                        node.innerText = `${title}`;
                    }
                    if (node.classList.contains('author')){
                        node.innerText = `${author_name}`;
                    }
                    if (node.classList.contains('pages')){
                        node.innerText = `${pages}`;
                    }
                })
        }
    })
    



}


function reset(){
    inputs.forEach(element => {
        element.value = '';
});
submit.value = "Add";
}
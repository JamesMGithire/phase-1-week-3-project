// https://gutendex.com/ used for the json api for this project
document.addEventListener("DOMContentLoaded", () => {
    let list = document.getElementById("list");
    let prev = document.getElementById("prev");
    let next = document.getElementById("next");
    let buttonToggle = () => (list.innerHTML === "") ? (
        prev.style = "visibility:hidden",
        next.style = "visibility :hidden"
    ) : (
        prev.style = "visibility:visible",
        next.style = "visibility :visible"
    );
    buttonToggle();
    let search = document.getElementById("search");
    let searched = document.getElementById("search-box")
    let pageNo = 1;
    let mySet = new Set();
    let categories = document.getElementById("categories");
    let pageSetter = () => {
        fetch(`http://localhost:3000/library`)
            .then(resp => resp.json())
            .then(obj => {
                let pages = Math.ceil(parseInt(obj.length) / 15);
                let eachBookCat =obj.map((el)=>el.category)
                eachBookCat.map((el)=>el.map((ex)=>mySet.add(ex)))
                mySet.forEach(el=>{
                    let category = document.createElement('option');
                    category.textContent = el;
                    categories.appendChild(category);
                })
                next.addEventListener("click", () => {
                    if (pages >= pageNo) {
                        prev.disabled = false;
                        ++pageNo;
                        fetcher(pageNo)
                    }
                    else {
                        next.disabled = true;
                    }
                })
                prev.addEventListener("click", () => {
                    if (pageNo > 1) {
                        next.disabled = false;
                        fetcher(pageNo)
                        --pageNo;
                    }
                    else {
                        prev.disabled = true;
                    }
                })
            });
    };
    pageSetter();
    function fetcher(page) {
        fetch(`http://localhost:3000/library?_limit=15&_page=${page}`)
            .then(resp => resp.json())
            .then(obj => {
                pages = Math.ceil(obj.length / 15);
                list.innerHTML = "";
                obj.forEach(element => {
                    let bookLi = document.createElement('li');
                    bookLi.textContent = element.title;
                    list.appendChild(bookLi);
                    buttonToggle()
                });
            });
    }
    fetcher()
    search.addEventListener("click",()=>{
        console.log(searched.value)
        searched.value="";
    });
})
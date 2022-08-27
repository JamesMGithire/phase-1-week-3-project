// https://gutendex.com/ used for the json api for this project
document.addEventListener("DOMContentLoaded", () => {
    let list = document.getElementById("list");
    let prev = document.getElementById("prev");
    let next = document.getElementById("next");
    let listContainer = document.getElementById("list-container");
    let details = document.getElementById("details-container");
    let buttonToggle = () => (list.innerHTML === "") ? (
        prev.style = "visibility:hidden",
        next.style = "visibility :hidden"
    ) : (
        prev.style = "visibility:visible",
        next.style = "visibility :visible"
    );
    buttonToggle();
    let search = document.getElementById("search");
    let searched = document.getElementById("search-box");
    let pageNo = 1;
    let pages = 0;
    let mySet = new Set();
    let categories = document.getElementById("categories");
    searched.addEventListener("input", (e) => {
        search.textContent = "Clear"
        finder(e.target.value);
    });
    let lib = `http://localhost:3000/library`;
    let liClicked = "margin-left: 1rem; width: 400px;padding-left: 0.1rem;padding-right: 0.1rem;";
    let detailsShown = "visibility:visible;left:auto;right:1rem;width:400px;padding-left: 0.1rem;padding-right: 0.1rem;";
    let liReturn = "margin: auto;width:600px;padding-left: 2rem;padding-right: 2rem;";
    let categoriesSetter = (obj) => {
        let eachBookCat = obj.map((el) => el.category)
        eachBookCat.map((el) => el.map((ex) => mySet.add(ex)))
        mySet.forEach(el => {
            let category = document.createElement('option');
            category.textContent = el;
            categories.appendChild(category);
        })
        categories.addEventListener("change", (e) => {
            finder(e.target.value);
            searched.value = ""
        })
    }
    let buttonSetter = (pages, url) => {
        function nextPage() {
            if (pages >= pageNo) {
                ++pageNo;
                prev.disabled = false;
                fetcher(pageNo, url)
            }
            else {
                next.disabled = true;
            }
        }
        function prevPage() {
            if (pageNo > 1) {
                pageNo--;
                next.disabled = false;
                fetcher(pageNo, url)
            }
            else {
                prev.disabled = true;
            }
        }
        next.addEventListener("click", nextPage);
        prev.addEventListener("click", prevPage);
    }

    let pageSetter = () => {
        fetch(lib)
            .then(resp => resp.json())
            .then(obj => {
                pages = Math.ceil(parseInt(obj.length) / 15);
                categoriesSetter(obj);
                fetcher();
                buttonSetter(pages);
            });
    };
    let ulSetter = (obj) => {
        list.innerHTML = "";
        obj.forEach(element => {
            let bookLi = document.createElement('li');
            bookLi.textContent = element.title;
            bookLi.id = element.id;
            list.appendChild(bookLi);
            bookLi.addEventListener("click", (e) => {
                fetch(`http://localhost:3000/library?id=${e.target.id}`)
                    .then(resp => resp.json())
                    .then(obj => {
                        listContainer.style = liClicked;
                        console.log(obj);
                        details.style = detailsShown;
                    });
            })
        });
    }
    let fetcher = (page = 1, url = `${lib}?_limit=15&_page=`) => {
        fetch(`${url}${page}`)
            .then(resp => resp.json())
            .then(obj => {
                listContainer.style = liReturn;
                details.style = liReturn + "visibility:hidden";

                ulSetter(obj);
                buttonToggle();
            });
    }
    function finder(sv) {
        listContainer.style = liReturn;
        details.style = liReturn + "visibility:hidden";
        fetch(`${lib}?q=${sv}`)
            .then(resp => resp.json())
            .then(obj => {
                let searchPages = Math.ceil(obj.length / 15);
                document.getElementById("prev").remove();
                document.getElementById("next").remove();
                next.remove();
                let prevNew = document.createElement('button');
                let nextNew = document.createElement('button');
                prevNew.id = "prev";
                nextNew.id = "next";
                prevNew.textContent = "<";
                nextNew.textContent = ">";
                listContainer.appendChild(prevNew);
                listContainer.appendChild(nextNew);
                pageNo = 1;
                fetch(`${lib}?q=${sv}&_limit=15&_page=`)
                    .then(resp => resp.json())
                    .then(obj => {
                        ulSetter(obj);
                    });
                nextNew.addEventListener("click", function nextPage() {
                    if (searchPages > pageNo) {
                        ++pageNo;
                        prevNew.disabled = false;
                        fetcher(pageNo, `${lib}?q=${sv}&_limit=15&_page=`)
                    }
                    else {
                        nextNew.disabled = true;
                    }
                })
                prevNew.addEventListener("click", function prevPage() {
                    if (pageNo > 1) {
                        pageNo--;
                        nextNew.disabled = false;
                        fetcher(pageNo, `${lib}?q=${sv}&_limit=15&_page=`)
                    }
                    else {
                        prevNew.disabled = true;
                    }
                })
            });
    }
    search.addEventListener("click", () => {
        // let sv = searched.value
        searched.value = "";
        pageSetter();
        search.textContent = "Search";
        // finder(sv);
    });
    pageSetter();
})

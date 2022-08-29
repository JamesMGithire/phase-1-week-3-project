// https://gutendex.com/ used for the json api for this project
document.addEventListener("DOMContentLoaded", () => {
    let list = document.getElementById("list");
    let prev = document.getElementById("prev");
    let next = document.getElementById("next");
    let listContainer = document.getElementById("list-container");
    let details = document.getElementById("details-container");
    let imgDiv = document.getElementById("cover-container");
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
        search.textContent = "Refresh"
        finder(e.target.value);
    });
    let lib = `http://localhost:3000/library`;
    let liClicked = "margin-left: 1rem; width: 400px;padding-left: 0.1rem;padding-right: 0.1rem;";
    let detailsShown = "transition:all 0.1s;visibility:visible;left:auto;right:1rem;width:400px;padding-left: 0.1rem;padding-right: 0.1rem;";
    let liReturn = "transition:all 0.1s;margin: auto;width:600px;padding-left: 2rem;padding-right: 2rem;";
    let categoriesSetter = (obj) => {
        let eachBookCat = obj.map((el) => el.category);
        eachBookCat.map((el) => el.map((ex) => mySet.add(ex)));
        mySet.forEach(el => {
            let category = document.createElement('option');
            category.textContent = el;
            categories.appendChild(category);
        });
        categories.addEventListener("change", (e) => {
            finder(e.target.value);
            searched.value = "";
        });
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
                        imgDiv.style.transition = "all 0.1s";
                        details.innerHTML = "";
                        imgDiv.innerHTML = "";
                        listContainer.style = liClicked;
                        details.style = detailsShown;
                        imgDiv.style = "visibility:visible; width:400px;padding:0px;";
                        let cover = document.createElement('img');
                        cover.id = obj[0].id;
                        cover.src = obj[0].image;
                        // Buttons
                        let returned = document.createElement('button');
                        returned.textContent = "Returned";
                        let giveOut = document.createElement('button');
                        giveOut.textContent = "Give Out";
                        let removeAll = document.createElement('button');
                        removeAll.textContent = "Remove all records";
                        let saveChanges = document.createElement('button');
                        saveChanges.textContent = "Save";
                        saveChanges.disabled = true;
                        imgDiv.appendChild(cover);
                        imgDiv.appendChild(returned);
                        imgDiv.appendChild(giveOut);
                        imgDiv.appendChild(removeAll);
                        imgDiv.appendChild(saveChanges);

                        // Details
                        let bookTitle = document.createElement('p');
                        bookTitle.textContent = obj[0].title + ".";
                        details.appendChild(bookTitle);
                        details.appendChild(document.createElement('hr'));
                        listAppender(obj[0].authors, "name");
                        listAppender(obj[0].category, "category");
                        pAppender("Owned", obj[0].owned);
                        pAppender("Available", obj[0].available);
                        let c5text = details.childNodes[5];
                        let c7text = details.childNodes[7];
                        let avNo = parseInt(details.childNodes[7].textContent.slice(19));
                        let ownedNo = parseInt(c5text.textContent.slice(15));
                        returned.addEventListener("click", () => {
                            if (obj[0].owned === avNo) {
                                returned.disabled = true;
                                saveChanges.disabled = true;
                            } else if (obj[0].owned > avNo) {
                                avNo++;
                                giveOut.disabled = false;
                                c7text.textContent = c7text.textContent.slice(0, 19) + avNo;
                                saveChanges.disabled = false;
                            }
                        })

                        giveOut.addEventListener("click", () => {
                            if (avNo === 0) {
                                giveOut.disabled = true;
                            }
                            else if (obj[0].available > 0) {
                                avNo--;
                                c7text.textContent = c7text.textContent.slice(0, 19) + avNo;
                                saveChanges.disabled = false;
                                returned.disabled = false;
                            }
                        })
                        saveChanges.addEventListener("click", () => {
                            if (obj[0].available === avNo) {
                                saveChanges.disabled = true;
                            } else {
                                console.log(ownedNo);
                                console.log(avNo);
                                fetch(lib +"/"+ cover.id, {
                                    method: "PATCH",
                                    body: JSON.stringify({
                                        "available": parseInt(avNo),
                                        "owned": parseInt(ownedNo)
                                    }),
                                    headers: {
                                        "Content-type": "application/json"
                                    }
                                }).then(resp=>{
                                    window.setTimeout(function () {
                                        window.location.reload();
                                      }, 30000);
                                })
                            }
                        })
                    });
            })
        });
    }
    function listAppender(list, val) {
        let listUl = document.createElement('ul');
        if (val === "name") {
            list.map((el) => {
                let listLi = document.createElement('p');
                listLi.textContent = el.name + ".";
                listUl.appendChild(listLi);
            })
        }
        else if (val === "category") {
            list.map((el) => {
                let listLi = document.createElement("li");
                listLi.textContent = el + ".";
                listUl.appendChild(listLi)
            })
        }
        details.appendChild(listUl);
        details.appendChild(document.createElement('hr'));
    }
    function pAppender(ownAvl, objVal) {
        let par = document.createElement("p");
        par.textContent = ownAvl + " copies : " + objVal
        details.appendChild(par);
        details.appendChild(document.createElement('hr'));
    }
    let fetcher = (page = 1, url = `${lib}?_limit=15&_page=`) => {
        fetch(`${url}${page}`)
            .then(resp => resp.json())
            .then(obj => {
                ulSetter(obj);
                buttonToggle();
            });
    }
    function finder(sv) {
        listContainer.style = liReturn;
        details.style = liReturn + "visibility:hidden";
        imgDiv.style = "transition:0.1s;visibility:hidden";
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
                fetcher(1, `${lib}?q=${sv}&_limit=15&_page=`);
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
        // let sv = searched.value //=""
        finder(searched.value);
        // pageSetter();
        search.textContent = "Search";
        // finder(sv);
    });
    pageSetter();
})

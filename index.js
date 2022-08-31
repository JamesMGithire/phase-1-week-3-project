// https://gutendex.com/ used for the json api for this project
document.addEventListener("DOMContentLoaded", () => {
    let list = document.getElementById("list");
    list.innerHTML = "<p>Waiting for the server...<p>";
    let prev = document.getElementById("prev");
    let next = document.getElementById("next");
    let whenSearch = document.getElementById("whenSearch")
    let listContainer = document.getElementById("list-container");
    let details = document.getElementById("details-container");
    let imgDiv = document.getElementById("cover-container");
    let buttonToggle = () => (list.innerHTML === "") ? (
        document.getElementById("prev").style = "visibility:hidden",
        document.getElementById("next").style = "visibility :hidden",
        list.innerHTML="<p>No Book found</p>"
    ) : (
        document.getElementById("prev").style = "visibility:visible",
        document.getElementById("next").style = "visibility :visible"
    );
    buttonToggle();
    let search = document.getElementById("search");
    let searched = document.getElementById("search-box");
    let pageNo = 1;
    let pages = 0;
    let mySet = new Set();
    let categories = document.getElementById("categories");
    searched.addEventListener("input", (e) => {
        detAndImgClear();
        search.textContent = "Refresh";
        whenSearch.style.display="block";
        finder(e.target.value);
    });
    let lib = `http://localhost:3000/library`;
    let liClicked = "margin-left: 1rem; width: 400px;padding-left: 0.1rem;padding-right: 0.1rem;margin-top:-0.9rem;";
    let detailsShown = "visibility:visible;left:auto;right:1rem;width:400px;padding-left: 0.1rem;padding-right: 0.1rem;";
    let liReturn = "transition:none;margin: auto;width:600px;padding-left: 2rem;padding-right: 2rem;";
    let categoriesSetter = (obj) => {
        let eachBookCat = obj.map((el) => el.category);
        eachBookCat.map((el) => el.map((ex) => mySet.add(ex)));
        mySet.forEach(el => {
            let category = document.createElement('option');
            category.textContent = el;
            categories.appendChild(category);
        });
        categories.addEventListener("change", (e) => {
            detAndImgClear();
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
    function detAndImgClear() {
        details.innerHTML = "";
        imgDiv.innerHTML = "";
    }
    let ulSetter = (obj) => {
        list.innerHTML = "";
        obj.forEach(element => {
            let bookLi = document.createElement('li');
            bookLi.textContent = element.title;
            bookLi.id = element.id;
            bookLi.style.transition = "none";
            list.appendChild(bookLi);
            bookLi.addEventListener("click", (e) => {
                whenSearch.style.display="none";
                fetch(`http://localhost:3000/library?id=${e.target.id}`)
                    .then(resp => resp.json())
                    .then(obj => {
                        imgDiv.style.transition = "all 0.1s";
                        detAndImgClear()
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
                        let addNew = document.createElement("button");
                        addNew.textContent = "Add A New Copy";
                        let removeCopy = document.createElement("button");
                        removeCopy.textContent = "Remove A Copy";
                        details.appendChild(removeAll);
                        details.appendChild(addNew);
                        details.appendChild(removeCopy);
                        function avNoInc() {
                            avNo++;
                            giveOut.disabled = false;
                            c8text.textContent = c8text.textContent.slice(0, 19) + avNo;
                            saveChanges.disabled = false;
                        }
                        addNew.addEventListener("click", () => {
                            ownedNo++;
                            c6text.textContent = c6text.textContent.slice(0, 15) + ownedNo;
                            avNoInc();
                        });
                        let c6text = details.childNodes[6];
                        let c8text = details.childNodes[8];
                        console.log(details.childNodes[6].textContent)
                        let avNo = parseInt(details.childNodes[8].textContent.slice(19));
                        let ownedNo = parseInt(c6text.textContent.slice(15));
                        returned.addEventListener("click", () => {
                            if (ownedNo === avNo) {
                                returned.disabled = true;
                                saveChanges.disabled = true;
                            } else if (ownedNo > avNo) {
                                avNoInc();
                            }
                        })

                        removeAll.addEventListener("click", () => {
                            let text = `Delete all records of ${obj[0].title}!\nThis process is irreversible.`;
                            if (confirm(text) == true) {
                                console.log("You pressed OK!");
                                fetch(lib + "/" + cover.id, {
                                    method: "DELETE"
                                }).then(() => windowWait())
                            } else {
                                console.log("You canceled!");
                            }
                        })
                        function avNoDec() {
                            avNo--;
                            c8text.textContent = c8text.textContent.slice(0, 19) + avNo;
                            saveChanges.disabled = false;
                            returned.disabled = false;
                        }
                        giveOut.addEventListener("click", () => {
                            if (avNo === 0) {
                                giveOut.disabled = true;
                            }
                            else if (obj[0].available > 0) {
                                avNoDec();
                            }
                        })
                        removeCopy.addEventListener("click", () => {
                            ownedNo--;
                            c6text.textContent = c6text.textContent.slice(0, 15) + ownedNo;
                            avNoDec();
                        })
                        saveChanges.addEventListener("click", () => {
                            if (obj[0].available === avNo && ownedNo === obj[0].owned) {
                                saveChanges.disabled = true;
                            } else {
                                if (confirm("Save changes") == true) {
                                    fetch(lib + "/" + cover.id, {
                                        method: "PATCH",
                                        body: JSON.stringify({
                                            "available": parseInt(avNo),
                                            "owned": parseInt(ownedNo)
                                        }),
                                        headers: {
                                            "Content-type": "application/json"
                                        }
                                    })
                                }
                            }
                        })
                    });
            })
        });
    }
    let windowWait = () => {
        window.setTimeout(function () {
            window.location.reload();
        }, 30000);
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
        detAndImgClear();
        finder(searched.value);
        search.textContent = "Search";
        whenSearch.style.display="none";
    });
    pageSetter();
})

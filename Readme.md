# Phase-1-Week-3-Project
<p>This is the project done by James Mburu Githire as required for the
completion of the first section of Software Engineering course in <a
href="https://moringaschool.com/" target="_blank">Moringa School</a>, Nairobi,
Kenya.</p> <body> <h1>ONLINE LIBRARY MANAGEMENT SYSTEM</h1> <p>This project is a
mock system intended for librarians.<br> <br>It acts as a catalog
system.<br><br> The objectives are to check in and check out books, update the
number of books in the library and the number of books owned by the
library.</p><br> <h2>Criteria met</h2> <ul> <li>A well documented readme that
any developer can use.</li> <li>This project is in a polished, portfolio-quality
state.</li> <li>20 + commits in the project with well detailed commit
messages.</li> <li>The project contains a single HTML file.</li> <li>This
project incorporates at least 3 separate event listeners. <ul>
<li><strong>DOMContentLoaded</strong> : in javascript to load the script</li>
<li><strong>Click</strong> : in javascript for all the buttons in the
project</li> <li><strong>Change</strong> : in javascript for the input (search
bar) and selection menu</li> <li><strong>Hover</strong> : in css file for the
list items</li> <li><strong>Focus</strong> : in css for the input (search
bar)</li> </ul> </li> <li>Well designed landing page that shows a list of books
(when connected to the server), a search bar, and a selection menu of the
categories available in the library.</li> <li>Follows good coding practices by
keeping code DRY (Do not repeat yourself) by utilizing functions to abstract
repetitive code. </ul><br> <h2>Introduction</h2> <p>A library is a collection of
materials, books or media that are accessible for use and not just for display
purposes.(ap1) The history of the book starts with the development of writing,
and various other inventions such as paper and printing, and continues through
to the modern-day business of book printing.(ap2).<br><br> And throughout this
time, people have developed ways of storing, sorting and classifying books.
Library classification system groups books together.<br><br></p> <strong>Problem
Statement</strong> <p> A librarian may use a catalog to keep track of the books
and classifications. <br><br> It may take a lot of time and energy finding a
book in a hardcopy catalog of books that the library owns. The librarian has to
cross check that catalog with the data kept after a book has been borrowed or
returned.<br><br> This monotonous activity can lead to boredom and strain on the
body for sitting for too long. </p><br> <strong>Solution</strong> <p>Single page
web-application that does the crucial task of updating a library catalog</p>
<br><br> <h2>API</h2> <p><strong>The API used in this project</strong> :
lib.json file hosted on a json-server for data manipulation on the
server(API).</p><br><br> <h2>Thought Process and Execution</h2> <p>The web
application has an interactive interface. It shows a list of books that are
owned.</p><p><strong>Execution</strong> : Having a div with
a list of books.</p><br> <br><p> One can access books of a certain
category.</p><p><strong>Execution</strong> : Having a selection menu containing
a list of all the available book categories fetched from the API.</p><br><br>
<p>The system gets the book searched quickly.</p><p><strong>Execution</strong> : Having a search bar (input that takes
text) that has a "change" event listener. After there is change in the input
value, fetch books that match the input value and have them listed in an
unordered list using "GET" method.</p> <br><br> <p> After clicking on the book
desired, the application displays the details of the book (the title, author, category, number of
copies the library owns, and the number available (not given out)). </p>
<p><strong>Execution</strong> : Add an eventListener to each listed item to
display the details and the buttons to update the information as needed.
</p><br> <br> <p>The system registers that a copy is given out, returned, removed or
added to the library.</p> <p><strong>Execution</strong> : Add
eventListeners to the buttons displayed with the relevant functionalities. <br>A
"Give Out" and a "Returned" button to reduce and increase the number of books
available. A "Remove A Copy" and a "Add A Copy" button to reduce and add the number of
books owned respectively.</p> <br><br> <p>It saves changes done. </p> <p><strong>Execution</strong> :
Have a button that updates the API using the "PATCH" method. </p><br><br> <p>
The system can remove all records of a book. </p>
<p><strong>Execution</strong> : Have a button that removes a book from the API
using "DELETE" method. </p> <br><br> <h2>Challenges Faced</h2> <p>Coming up with
a simplistic, pleasing and functional design.</p> <p> <strong>Solution</strong>
: Drawing out designs before writing the html or javascript. </p> <br><br>
<p>Following the DRY(do not repeat yourself) principle </p> <p>
<strong>Solution</strong> : Writing out pseudocode before writing javascript
code. This helped bring out the repetitive parts of code. Having them in
functions reduce recurrency. </p> <br><br> <h2>Acknowledgement</h2> <p>
<strong><a href="">Moringa School</a></strong><br>Having a good Software
Engineering curriculum and the resources to guide the students through it.
</p><br> <p> <strong>Daniel Karanja(Technical Mentor)</strong><br> Identified
this as a good project idea and gave the go ahead for the project.<br>Guided the
class through the class content which has been used in the project. </p> <br>
<p> <strong><a
href="https://github.com/public-apis/public-apis">public-apis</a></strong><br>Had
the <a href="https://gutendex.com/">gutendex</a> api used to populate the json
file for this project </p> <h2>Appendix</h2> <p> ap1 : <a
href="https://en.wikipedia.org/wiki/Library#:~:text=A%20library%20is%20a%20collection,a%20virtual%20space%2C%20or%20both.">Meaning
of a Library</a><br> ap2 : <a href
="https://en.wikipedia.org/wiki/History_of_books">History of Books</a> </p>
</body>
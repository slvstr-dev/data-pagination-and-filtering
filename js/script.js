// Set default amount of items per page
const itemsPerPage = 9;

const showPage = (list, page) => {
   let studentList = document.querySelector(".student-list");
   studentList.innerHTML = "";

   // Check if there are any student items to render
   if (list.length > 0) {
      let startIndex = (page * itemsPerPage) - itemsPerPage;
      let endIndex = (page * itemsPerPage);

      // Render all (matched) student items from given array to seperate pages
      for (let i = 0; i < list.length; i++) {
         if (i >= startIndex && i < endIndex) {
            const studentItem = `
               <li class="student-item cf">
                  <div>
                     <img src="${list[i].picture.large}" class="avatar" alt="Profile picture"/>
      
                     <h3>${list[i].name.first} ${list[i].name.last}</h3>
      
                     <span class="email">${list[i].email}</span>
                  </div>
      
                  <div class="joined-details">
                     <span class="date">Joined ${list[i].registered.date}</span>
                  </div>
               </li>
            `;

            studentList.insertAdjacentHTML("beforeend", studentItem);
         };
      };
   } else {
      studentList.insertAdjacentHTML("beforeend", "<li class='no-results'>No matched students found.</li>");
   };
};

const addSearchBar = () => {
   const header = document.querySelector("header");
   const searchBar = `
      <label for="search" class="student-search">
         <input id="search" placeholder="Search by name...">

         <button type="button">
            <img src="img/icn-search.svg" alt="Search icon"/>
         </button>
      </label>
   `;

   header.insertAdjacentHTML("beforeend", searchBar);
   addSearchListeners(data);
};

const addSearchListeners = list => {
   const studentSearch = document.querySelector(".student-search");

   // Listen for click events on BUTTON and IMG elements inside '.student-search' 
   studentSearch.addEventListener("click", e => {
      if (e.target.tagName === "BUTTON" ||
         e.target.tagName === "IMG") {
         // Call to check for new search matches when user submits query
         getSearchQuery(list);

         studentSearch.children[0].value = "";
      };
   });

   // Listen for keyup events on INPUT element inside '.student-search' 
   studentSearch.addEventListener("keyup", e => {
      if (e.target.tagName === "INPUT") {
         // Call to check for new search matches when user updates the input value
         getSearchQuery(list);
      };
   });
};

const getSearchQuery = list => {
   // Get lowercased value from input
   const query = document
      .getElementById("search")
      .value
      .toLowerCase();

   const matchedStudentsList = [];

   for (let student of list) {
      // Get lowercased first and last name from current student
      const firstName = student.name.first.toLowerCase();
      const lastName = student.name.last.toLowerCase();

      // Check if query matches first or last name from current student
      if (firstName.indexOf(query) !== -1 ||
         lastName.indexOf(query) !== -1) {
         matchedStudentsList.push(student);
      };
   };

   // Call to render page(s) and pagination again with 'matchedStudentsList'
   showPage(matchedStudentsList, 1);
   addPagination(matchedStudentsList);
};

const addPagination = list => {
   const pageCount = Math.ceil(list.length / itemsPerPage);
   const linkList = document.querySelector(".link-list");

   linkList.innerHTML = "";

   // Check if pagination needs to be rendered
   if (list.length >= itemsPerPage) {
      // Render pagination buttons when there are more than 'itemsPerPage'
      for (let i = 1; i <= pageCount; i++) {
         const button = `
            <li>
               <button type="button">${i}</button>
            </li>
         `;

         linkList.insertAdjacentHTML("beforeend", button);
      };

      // Call to add click listeners on buttons inside pagination
      addPaginationListeners(linkList, list);
   };
};

// Listen for click events on pagination buttons
const addPaginationListeners = (pagination, list) => {
   let activeButton = document.querySelectorAll("[type='button']")[0];

   activeButton.classList.add("active");

   pagination.addEventListener("click", e => {
      if (e.target.tagName === "BUTTON") {
         activeButton.classList.remove("active");
         e.target.classList.add("active");
         activeButton = e.target;

         // Call to render the page the user requested
         showPage(list, e.target.innerText);
      };
   });
};

// Calls to render default content
showPage(data, 1);
addPagination(data);
addSearchBar();
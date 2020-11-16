const itemsPerPage = 9;

const showPage = (list, page) => {
   let startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = (page * itemsPerPage);
   let studentList = document.querySelector(".student-list");

   studentList.innerHTML = "";

   for (let i = startIndex; i < endIndex; i++) {
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

const addPagination = list => {
   const totalPages = Math.floor(list.length / itemsPerPage);
   const linkList = document.querySelector(".link-list");

   linkList.innerHTML = "";

   for (let i = 1; i < totalPages; i++) {
      const button = `
         <li>
            <button type="button">${i}</button>
         </li>
      `;

      linkList.insertAdjacentHTML('beforeend', button);
   }

   let activeButton = document.querySelectorAll("[type='button']")[0];

   activeButton.classList.add("active");

   linkList.addEventListener("click", e => {
      if (e.target.tagName === "BUTTON") {
         activeButton.classList.remove("active");
         e.target.classList.add("active");
         activeButton = e.target;

         showPage(data, e.target.innerText);
      }
   });
};

showPage(data, 1);
addPagination(data);
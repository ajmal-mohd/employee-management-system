 //   PAGE BUTTONS
     
  
         let pageBtns;

          for( let pages=1; pages<totalPages;pages++){
             pageBtns=document.createElement("li")
            pageBtns.classList.add("page-item")
            pageBtns.innerHTML=`<button value="${pages}" class="ss">${pages}</button>`
            buttonCreation.appendChild(pageBtns,)

            console.log(pageBtns);
          
               
          }

           pageBtns.addEventListener('click',()=>{

         
           })

           
           function pagination() {
            // Ensure that `totalPages` and `currentpage` are properly defined

            // let currentPage_Employee = 10; // Assuming this is the number of items per page
            let totalPages = Math.ceil(data.length / currentPage_Employee);
        
            buttonCreation.innerHTML = '';
        
            // QUICKREVERCEBTTN
            let quickReverseBtn = document.createElement("li");
            quickReverseBtn.classList.add("page-item");
            quickReverseBtn.innerHTML = `<a class="page-link" href="#"><<</a>`;
            buttonCreation.appendChild(quickReverseBtn);
        
            quickReverseBtn.addEventListener('click', () => {
                currentpage = 1;
                showtabledate(data, currentpage);
            });
        
            // REVERCE BUTTON
            let reverseBtn = document.createElement("li");
            reverseBtn.classList.add("page-item");
            reverseBtn.innerHTML = `<a class="page-link" href="#"><</a>`;
            buttonCreation.appendChild(reverseBtn);
        
            reverseBtn.addEventListener('click', () => {
                if (currentpage > 1) {
                    currentpage--;
                } else {
                    currentpage = 1;
                }
                showtabledate(data, currentpage);
            });
        
            // Page Buttons
            for (let pages = 1; pages <= totalPages; pages++) { // Changed to include totalPages
                let pageBtns = document.createElement("li");
                pageBtns.classList.add("page-item");
                pageBtns.innerHTML = `<a class="page-link" href="#" value="${pages}">${pages}</a>`;
                buttonCreation.appendChild(pageBtns);
        
                pageBtns.addEventListener('click', function() {
                    currentpage = pages;
                    showtabledate(data, currentpage);
                });
            }
        
            // FASTBACK BUTTON
            let quickEndBtn = document.createElement("li");
            quickEndBtn.classList.add("page-item");
            quickEndBtn.innerHTML = `<a class="page-link" href="#">>></a>`;
            buttonCreation.appendChild(quickEndBtn);
        
            quickEndBtn.addEventListener('click', () => {
                currentpage = totalPages;
                showtabledate(data, currentpage);
            });
        
            // BACK BUTTON
            let endReverse = document.createElement("li");
            endReverse.classList.add("page-item");
            endReverse.innerHTML = `<a class="page-link" href="#">></a>`;
            buttonCreation.appendChild(endReverse);
        
            endReverse.addEventListener('click', () => {
                if (currentpage < totalPages) {
                    currentpage++;
                }
                showtabledate(data, currentpage);
            });
        }
        
        // Assuming `showtabledate` is a function that displays the data based on the current page
        function showtabledate(data, page) {
            let start = (page - 1) * currentPage_Employee;
            let end = page * currentPage_Employee;
            let paginatedData = data.slice(start, end);
            // Display the paginated data here
        }


        
        //

        pagination//
function pagination() {
    let totalPages = Math.ceil(data.length / currentPage_Emoloyee);
    buttonCreation.innerHTML = '';

    console.log(`Total Pages: ${totalPages}, Current Page: ${currentpage}`);

    // QUICK REVERSE BUTTON
    let quickReverseBtn = document.createElement("li");
    quickReverseBtn.classList.add("page-item");
    quickReverseBtn.innerHTML = `<a class="page-link" href="#"><<</a>`;
    buttonCreation.appendChild(quickReverseBtn);
    
    quickReverseBtn.addEventListener('click', () => {
        currentpage = 1;
        showtabledate(data, currentpage);
        console.log(`Quick Reverse Clicked: Current Page = ${currentpage}`);
    });

    // REVERSE BUTTON
    let reverseBtn = document.createElement("li");
    reverseBtn.classList.add("page-item");
    reverseBtn.innerHTML = `<a class="page-link" href="#"><</a>`;
    buttonCreation.appendChild(reverseBtn);

    reverseBtn.addEventListener('click', () => {
        if (currentpage > 1) {
            currentpage--;
        } else {
            currentpage = 1;
        }
        showtabledate(data, currentpage);
  
        reverseBtn.classList.add("active");
        setTimeout(() => {
            reverseBtn.classList.remove("active");
        }, 100);
    });

    // PAGE BUTTONS
    for (let pages = 1; pages <= totalPages; pages++) {
        let pageBtns = document.createElement("li");
        pageBtns.classList.add("page-item");
        pageBtns.innerHTML = `<a class="page-link" href="#" value="${pages}">${pages}</a>`;
        buttonCreation.appendChild(pageBtns);

        pageBtns.addEventListener('click', function() {
            currentpage = pages;
            showtabledate(data, currentpage);

        });
    }
   
    // FORWARD BUTTON
    let forwardBtn = document.createElement("li");
    forwardBtn.classList.add("page-item");
    forwardBtn.innerHTML = `<a class="page-link" href="#">></a>`;
    buttonCreation.appendChild(forwardBtn);

    forwardBtn.addEventListener('click', () => {
        if (currentpage < totalPages) {
            currentpage++;
        }
        showtabledate(data, currentpage);
   
    });

    // QUICK FORWARD BUTTON
    let quickEndBtn = document.createElement("li");
    quickEndBtn.classList.add("page-item");
    quickEndBtn.innerHTML = `<a class="page-link" href="#">>></a>`;
    buttonCreation.appendChild(quickEndBtn);

    quickEndBtn.addEventListener('click', () => {
        currentpage = totalPages;
        showtabledate(data, currentpage);

    });
}

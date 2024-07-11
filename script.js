

let data = [];

let currentpage=1;
let  currentPage_Emoloyee=document.querySelector("#page_value").value
let buttonCreation= document.querySelector("#pagination")

const fetchdata = async () => {
    try {
        const response = await fetch("http://localhost:3000/employees");
        data = await response.json();
        console.log(data);
        showtabledate(data,currentpage);
        pagination() 
    } 
    catch (error) {
        console.error("Error fetching data:", error);
    }
};

fetchdata();

// let pageOption=document.querySelector("#page_value")


// pagination values 10


let currentpageChange=document.querySelector("#page_value")

  
  currentpageChange.addEventListener('change',(e)=>{
    e.preventDefault()
       currentPage_Emoloyee=parseInt(document.querySelector("#page_value").value)
      showtabledate(data,currentpage)
      pagination()
   

  })
  

//  console.log(currentPage_Emoloyee);

async function showtabledate(data,currentpage) {

    // if (!data || data.length === 0) {
    //     console.error("Data is empty or undefined");
    //     return;
    // }
         
    let trimStart= (currentpage-1)*currentPage_Emoloyee
    let trimEnd= trimStart+currentPage_Emoloyee
   let  trimmedData=data.slice(trimStart,trimEnd)

      
     
   
    let row = "";
    let table_data_value = document.querySelector("#table-body");
     trimmedData.forEach((value, index) => {
        row += `<tr>
          
          <td class="table-font-cr"> ${index + 1}</td>
          <td class="table-font-cr"><img src="http://localhost:3000/employees/${value.id}/avatar" style="height: 30px; border-radius: 50px;" > ${value.salutation}.${value.firstName}${value.lastName}</td>
          <td class="table-font-cr"> ${value.email}</td>
          <td class="table-font-cr"> ${value.phone}</td>
          <td class="table-font-cr"> ${value.gender}</td>
          <td class="table-font-cr"> ${value.dob}</td>
          <td class="table-font-cr"> ${value.country}</td>
           <td>
           <div class="dropdown">
          <button class="btn btn-secondary " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fa-solid fa-ellipsis"></i>
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="view.html?id=${value.id}"><i class="fa-sharp fa-regular fa-eye"></i>View</a>
    
            <a class="dropdown-item"  onclick="editdata('${value.id}')" href="#"><i class="fa-solid fa-pen"></i>Edit </a>
            <a class="dropdown-item delete-employee-btn"  onClick="delete_employee('${ value.id }')" href="#"  ><i class="fa-solid fa-trash-can "></i>Delete</a>
          </div>
        </div>
         </td>
     
          

       </tr>`;
      
    });

    table_data_value.innerHTML = row;
 
document.querySelector("#count-value").innerHTML="of"+data.length

}
 


//   count_value.textContent=data.length

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
        updateActiveButton()

        quickReverseBtn.classList.add("active")
        setTimeout(()=>{
            quickReverseBtn.classList.remove("active")

        },100)


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
        updateActiveButton()



  
        reverseBtn.classList.add("active");
        setTimeout(() => {
            reverseBtn.classList.remove("active");
        }, 100);
    });


    //  let startPage=Math.max(currentpage-1,1)
    //  let endPage=Math.min(currentpage+1,totalPages)


    //   if(currentpage===1){
    //     endPage=Math.min(currentpage + 2,totalPages);
    //   }else if(currentpage===totalPages){
    //     startPage=Math.max(currentpage-2,1)
     
    //   }

      

    // PAGE BUTTONS
  for (let pages = 1; pages <= totalPages; pages++) {
    let pageBtns = document.createElement("li");
    pageBtns.classList.add("page-item");
    if (pages === currentpage) {
        pageBtns.classList.add("active");
    }
    pageBtns.innerHTML = `<a class="page-link" href="#" value="${pages}">${pages}</a>`;
    buttonCreation.appendChild(pageBtns);

    pageBtns.addEventListener('click', function(e) {
        e.preventDefault();
        currentpage = pages;
        showtabledate(data, currentpage);
        updateActiveButton()
       
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
        showtabledate(data, currentpage);
        updateActiveButton()
      
    }


    forwardBtn.classList.add("active")
    setTimeout(()=>{
        forwardBtn.classList.remove("active")
    },100)
});

    // QUICK FORWARD BUTTON
    let quickEndBtn = document.createElement("li");
    quickEndBtn.classList.add("page-item");
    quickEndBtn.innerHTML = `<a class="page-link" href="#">>></a>`;
    buttonCreation.appendChild(quickEndBtn);

    quickEndBtn.addEventListener('click', () => {
        currentpage = totalPages;
        showtabledate(data, currentpage);
        updateActiveButton()

        quickEndBtn.classList.add('active')
        setTimeout(()=>{
            quickEndBtn.classList.remove("active")
        },100)
    });


  //update activebutton
  function updateActiveButton(){
    document.querySelectorAll('.page-item').forEach(btn => btn.classList.remove('active'));
    let currentPageBtn = document.querySelector(`.page-item:nth-child(${currentpage + 2})`);
    if (currentPageBtn) {
        currentPageBtn.classList.add('active');
    }
  }

}








function addform_none() {
    addemploye_form_display.style.display = "none";
}

//   addemployeee //

let addemployee_btn = document.querySelector(".addemployee-form-btn");
let addemploye_form_display = document.querySelector(".add-form");
// let backblur=document.querySelector(".section-main-contatiner")

addemployee_btn.addEventListener("click", () => {
    addemploye_form_display.style.display = "block";

    console.log("click1");
    let filterblur=document.querySelector(".section-main-contatiner")
    filterblur.style.filter="brightness(0.5)"
});

// success of form none function

function addform_none() {
    addemploye_form_display.style.display = "none";
  
}

// addempolyeee frist cancel btn //

let addemployye_Formbtn_cancel = document.querySelector(".addempoyecancel-form-btn");

addemployye_Formbtn_cancel.addEventListener("click", () => {
    addemploye_form_display.style.display = "none";
    let filterblur=document.querySelector(".section-main-contatiner")
    filterblur.style.filter="none"
    console.log("cancel");
});

// addempolyeee frist cancel btn//

let second_form_cancel = document.querySelector(".second-btn-cancel ");

second_form_cancel.addEventListener("click", () => {
    addemploye_form_display.style.display = "none";
    let filterblur=document.querySelector(".section-main-contatiner")
    filterblur.style.filter="none"
    console.log("sjjsjssj");
      
});

// addempolyee form

// add image
let profilepic=document.querySelector("#profile-pic");
let inputfile=document.querySelector("#input-file");

inputfile.onchange=function(){
    profilepic.src= URL.createObjectURL(inputfile.files[0]);
}
 
   
function reset(){
    document.querySelector("#inputSalutation").value='';
    document.querySelector("#inputFirstname").value=''
    document.querySelector("#inputLastname").value=''
    document.querySelector("#inputEmail").value=''
    document.querySelector("#inputMobile").value=''
    document.querySelector("#inputdateofbirth").value=''
    let checkradio= document.querySelector("input[name='gender']:checked")

    if (checkradio) {
        checkradio.checked = false;
    } 
    document.querySelector("#inputquali").value=''
    document.querySelector("#inputaddress").value=''
    document.querySelector("#inputcity").value=''
    document.querySelector("#select_state").value=''
    document.querySelector("#select_country").value=''
    document.querySelector("#inputpin").value=''
    document.querySelector("#inputUsername").value=''
    document.querySelector("#inputPassword").value=''



}

async function postdata() {

     
    let n_salutation = document.querySelector("#inputSalutation").value;
    let n_firstName = document.querySelector("#inputFirstname").value;
    let n_lastName = document.querySelector("#inputLastname").value;
    let n_email = document.querySelector("#inputEmail").value;
    let n_phone = document.querySelector("#inputMobile").value;
    let n_dob = document.querySelector("#inputdateofbirth").value;
    let n_gender = document.querySelector("input[name='gender']:checked");
    let n_qualification = document.querySelector("#inputquali").value;
    let n_address = document.querySelector("#inputaddress").value;
    // let n_city =document.querySelector("#inputcity").value;
    let n_city = document.querySelector("#inputcity").value;
    let n_state = document.querySelector("#select_state").value;
    let n_country = document.querySelector("#select_country").value;
    let n_pin_zip = document.querySelector("#inputpin").value;
    let n_userName = document.querySelector("#inputUsername").value;
    let n_password = document.querySelector("#inputPassword").value;
    let n_male = document.querySelector("#radiomale").checked;
    let n_female = document.querySelector("#radiofemale").checked;



 
    let new_employee = {
        salutation: n_salutation,
        firstName: n_firstName,
        lastName: n_lastName,
        email: n_email,
        phone: n_phone,
        dob: n_dob.split("-").reverse().join("-"),
        gender: n_male ? "male" : n_female ? "female" : "unknown",
        qualifications: n_qualification,
        address: n_address,
        city: n_city,
        state: n_state,
        country: n_country,
        zip: n_pin_zip,
        username: n_userName,
        password: n_password,
    };

    console.log("Sending new employee data:", new_employee);

    try {
        const response = await fetch("http://localhost:3000/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(new_employee),
        });
         addform_none()
        console.log("Server response:", response);

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error("Network response was not ok: " + errorMessage);
        }

        const responseData = await response.json();
        console.log("ashui",responseData);
        const formdata= new FormData();
        formdata.append("avatar",inputfile.files[0]);
   
        const res= await fetch(`http://localhost:3000/employees/${responseData.id}/avatar`,{
            method:'POST',
            body:formdata,
        })


        console.log("Server response data:", responseData);
       new_employee['id'] = responseData.id;

       console.log(new_employee);
        data.unshift(new_employee);
        console.log(data);
        showtabledate(data,currentpage);
        console.log("Employee added successfully:", new_employee);
    } catch (error) {
        console.log("Network error:", error);
    }
    

    



    
}


//  add employye  btn//

let empo_submit = document.querySelector("#add_btn");

empo_submit.addEventListener("click", () => {
    let validform = validationform();

    console.log(validform);

    if (validform === 0) {
        postdata();

        Swal.fire({
            title: "successfully data add",
            text: "You clicked the button!",
            icon: "success"
          });
          let filterblur=document.querySelector(".section-main-contatiner")
          filterblur.style.filter="none"
          reset()
    }

    showtabledate(data,currentpage)
    
});



// delete btn//

let delete_btn_Press = document.querySelector(".delete_employee_btn");
let cancel_btn_press = document.querySelector(".cancel_employee_btn");

function delete_employee(deleteid) {
    let id=deleteid
    console.log(id,"dd");
    let button_pop_up = document.querySelector(".delete-aler-box");
    let filterblur=document.querySelector(".section-main-contatiner")
    filterblur.style.filter="brightness(0.5)"

    button_pop_up.style.display = "block";
    delete_btn_Press.addEventListener("click", () => {
        fetch(`http://localhost:3000/employees/${deleteid}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        delete_reload();
        data.filter((elm,index)=>{
            if(id===elm.id){
             data.splice(index,1)
             console.log(data,'aa');
            }
            showtabledate(data,currentpage)

  let filterblur=document.querySelector(".section-main-contatiner")
    filterblur.style.filter="none"
        })
       
     
    });
}

let x_mark = document.querySelector(".btn-delete");

x_mark.addEventListener("click", () => {
    let button_pop_up = document.querySelector(".delete-aler-box");
    button_pop_up.style.display = "none";
    let filterblur=document.querySelector(".section-main-contatiner")
    filterblur.style.filter="none"
  
});

cancel_btn_press.addEventListener("click", () => {
    let button_pop_up = document.querySelector(".delete-aler-box");
    button_pop_up.style.display = "none";
    let filterblur=document.querySelector(".section-main-contatiner")
    filterblur.style.filter="none"
});

// function delete employee sucess reload

function delete_reload() {
    let button_pop_up = document.querySelector(".delete-aler-box");
    button_pop_up.style.display = "none";
}

// edit form
let edit_form = document.querySelector(".edit-form-page");
// edit_form.style.display = "block";

function editformpopup() {
    edit_form.style.display = "block";
    let filterblur=document.querySelector(".section-main-contatiner")
    filterblur.style.filter="brightness(0.5)"
    console.log("hello");
}

let x_btn_into = document.querySelector(".x_mark_cancel ");
x_btn_into.addEventListener("click", () => {
    edit_form.style.display = "none";
    let filterblur=document.querySelector(".section-main-contatiner")
    filterblur.style.filter="none"
});

let edit_cancel_btn = document.querySelector(".edit_cancel_btn");
edit_cancel_btn.addEventListener("click", () => {
    edit_form.style.display = "none";
    let filterblur=document.querySelector(".section-main-contatiner")
    filterblur.style.filter="none"
    
});

//   editimage

let edit_profile_pic=document.querySelector("#edit-profile-pic")
let input_editFile=document.querySelector("#update-edit-file")

input_editFile.onchange=function(){
    edit_profile_pic.src= URL.createObjectURL(input_editFile.files[0])
}







async function editdata(id) {
    editformpopup();
    console.log(id,"dkd");
    let employeeDatas
  
    console.log(employeeDatas,"datarecived");

    try {
        const response = await fetch(`http://localhost:3000/employees/${id}`);
        if (!response.ok) {
            throw new Error(` server error: ${response.status}`);
        }
         employeeDatas= await response.json();
        console.log(employeeDatas);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    document.getElementById("edit-profile-pic").src=`http://localhost:3000/employees/${id}/avatar`;
    document.querySelector("#edit_inputSalutation").value = employeeDatas.salutation;
    document.querySelector("#edit_inputFirstname").value = employeeDatas.firstName;
    document.querySelector("#edit_inputLastname").value = employeeDatas.lastName;
    document.querySelector("#edit_inputEmail").value = employeeDatas.email;
    document.querySelector("#edit_inputMobile").value = employeeDatas.phone;
    document.querySelector("#edit_inputdateofbirth").value = employeeDatas.dob.split("-").reverse().join("-");
    document.querySelector("#edit_inputquali").value = employeeDatas.qualifications;
    document.querySelector("#edit_inputaddress").value = employeeDatas.address;
    document.querySelector("#edit_select_country").value = employeeDatas.country;
    document.querySelector("#edit_select_state").value = employeeDatas.state;
    document.querySelector("#edit_inputcity").value = employeeDatas.city;
    document.querySelector("#edit_inputpin").value = employeeDatas.zip;
    document.querySelector("#edit_inputUsername").value = employeeDatas.username;
    document.querySelector("#edit_inputPassword").value = employeeDatas.password;
    document.querySelector("#edit_radiomale").checked = employeeDatas.gender === "male";
    document.querySelector("#edit_radiofemale").checked = employeeDatas.gender === "female";
   

    let edit_empolyee_add_btn = document.querySelector(".edit_addemplye_btn");
    edit_empolyee_add_btn.addEventListener("click", () => {
        let result = edit_Formvalidation();

        if (result == 0) {
            let edit_employee_data = {
                salutation:document.querySelector("#edit_inputSalutation").value,
                firstName:document.querySelector("#edit_inputFirstname").value,
                lastName:document.querySelector("#edit_inputLastname").value,
                email:document.querySelector("#edit_inputEmail").value,
                phone:document.querySelector("#edit_inputMobile").value,
                dob: document.querySelector("#edit_inputdateofbirth").value.split("-").reverse().join("-"),
                qualifications: document.querySelector("#edit_inputquali").value,
                address: document.querySelector("#edit_inputaddress").value,
                country: document.querySelector("#edit_select_country").value,
                state:document.querySelector("#edit_select_state").value,
                city:document.querySelector("#edit_inputcity").value,
                zip:document.querySelector("#edit_inputpin").value,
                username:document.querySelector("#edit_inputUsername").value,
                password:document.querySelector("#edit_inputPassword").value,
                gender:document.querySelector("#edit_radiomale").checked ? "male" : "female",
            };
            console.log(edit_employee_data);
                

            try {
                fetch (`http://localhost:3000/employees/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type":"application/json",
                    },

                    body: JSON.stringify(edit_employee_data),

                });
                 
                
                 

                const  inputEdit_file=document.getElementById("update-edit-file");
                if(inputEdit_file.files.length>0){
                    const formdata=new FormData();
                    formdata.append("avatar",inputEdit_file.files[0])

                    const avatarUpdate= fetch(`http://localhost:3000/employees/${id}/avatar`,{
                        method:'POST',
                        body:formdata,


                    });

                    // if(!avatarUpdate.ok){
                    //     throw new Error ('failed to upload employee avatar')
                    //}
                }

                 Swal.fire({
                  title:"successfully data  updated",

                  icon:"success"
                });

                edit_employee_data.id=id
              const userId=data.filter(user=>user.id===id);
              if(userId!==-1){
                data.splice(userId,1,edit_employee_data)
                showtabledate(data,currentpage)
              }
            } catch (error) {
                console.log("Network error:", error);
            }
            let edit_form = document.querySelector(".edit-form-page");
            edit_form.style.display = "none";
            let filterblur=document.querySelector(".section-main-contatiner")
            filterblur.style.filter="none"
           
    
        }
      
    
    });

}

//form validatio//


document.querySelector("#inputSalutation").addEventListener('change',()=>{
    document.querySelector(".salutation-msg").innerHTML='';
})

document.querySelector("#inputFirstname").addEventListener('change',()=>{
    document.querySelector(".fristname-msg").innerHTML='';
    
})

document.querySelector("#inputLastname").addEventListener('change',()=>{
    document.querySelector(".lastname-msg").innerHTML='';
    
})
document.querySelector("#inputEmail").addEventListener('change',()=>{
    document.querySelector(".email-msg").innerHTML='';
    
})
document.querySelector("#inputMobile").addEventListener('change',()=>{
    document.querySelector(".phone-msg").innerHTML='';
    
})

document.querySelector("#inputdateofbirth").addEventListener('change',()=>{
    document.querySelector(".dob-msg").innerHTML='';
    
})

document.querySelector("#inputquali").addEventListener('change',()=>{
    document.querySelector(".Qualifications-msg").innerHTML='';
    
})

document.querySelector("#inputaddress").addEventListener('change',()=>{
    document.querySelector(".address-msg").innerHTML='';
    
})

document.querySelector("#select_country").addEventListener('change',()=>{
    document.querySelector(".country-msg").innerHTML='';
    
})

document.querySelector("#select_country").addEventListener('change',()=>{
    document.querySelector(".country-msg").innerHTML='';
    
})

document.querySelector("#select_state").addEventListener('change',()=>{
    document.querySelector(".state-msg").innerHTML='';
    
})
document.querySelector("#inputcity").addEventListener('change',()=>{
    document.querySelector(".city-msg").innerHTML='';
    
})
document.querySelector("#inputpin").addEventListener('change',()=>{
    document.querySelector(".pin-msg").innerHTML='';
    
})

document.querySelector("#inputUsername").addEventListener('change',()=>{
    document.querySelector(".usarname-msg").innerHTML='';
    
})

document.querySelector("#inputPassword").addEventListener('change',()=>{
    document.querySelector(".password-msg").innerHTML='';
    
})


function validationform() {
    let v_img=document.querySelector("#input-file").value
    let v_salutation = document.querySelector("#inputSalutation");
    let v_fristname = document.querySelector("#inputFirstname");
    let v_lastName = document.querySelector("#inputLastname");
    let v_Email = document.querySelector("#inputEmail");
    let v_phone = document.querySelector("#inputMobile");
    let v_dob = document.querySelector("#inputdateofbirth");
    let v_qualification = document.querySelector("#inputquali");
    let v_address = document.querySelector("#inputaddress");
    let v_country = document.querySelector("#select_country");
    let v_state = document.querySelector("#select_state");
    let v_city = document.querySelector("#inputcity");
    let v_zip = document.querySelector("#inputpin");
    let v_Username = document.querySelector("#inputUsername");
    let v_password = document.querySelector("#inputPassword");
    let v_male = document.querySelector("#radiomale").checked;
    let v_female = document.querySelector("#radiofemale").checked;
    
   
    let user_Salutation = v_salutation.value.trim();
    let user_Fristname = v_fristname.value.trim();
    let user_LastName = v_lastName.value.trim();
    let user_Email = v_Email.value.trim();
    let user_Phone = v_phone.value.trim();
    let user_Dob = v_dob.value.trim();

    let user_Qualification = v_qualification.value.trim();
    let user_Address = v_address.value.trim();
    let user_Country = v_country.value.trim();
    let user_state = v_state.value.trim();
    let user_City = v_city.value.trim();
    let user_zip = v_zip.value.trim();
    let user_UserName = v_Username.value.trim();
    let user_Password = v_password.value.trim();
   
    const img_msg= document.querySelector(".img-msg")
    const salutation_msg = document.querySelector(".salutation-msg");
    const firstName_msg = document.querySelector(".fristname-msg");
    const lastName_msg = document.querySelector(".lastname-msg");
    const email_msg = document.querySelector(".email-msg");
    const phone_msg = document.querySelector(".phone-msg");
    const dob_msg = document.querySelector(".dob-msg");
    const gender_msg = document.querySelector(".gender-msg");
    const quali_msg = document.querySelector(".Qualifications-msg");
    const address_msg = document.querySelector(".address-msg");
    const country_msg = document.querySelector(".country-msg");
    const state_msg = document.querySelector(".state-msg");
    const city_msg = document.querySelector(".city-msg");
    const zip_msg = document.querySelector(".pin-msg");
    const username_msg = document.querySelector(".usarname-msg");
    const password_msg = document.querySelector(".password-msg");

    let count = 0;
    
    // if(v_img==""){
    //     errorMessage(img_msg, "image is required", "red");
    //     count++

    // }else{
    //     successmessage(img_msg, "", "");


    // }


    if (v_male.checked == "" || v_female == "") {
        errorMessage(gender_msg, "gender is required", "red");
    }else {
        successmessage(gender_msg, "", "");
    }

    if (user_Salutation == "") {
        errorMessage(salutation_msg, "salutation is required", "red");
        count++;
    }else{
successmessage(salutation_msg, "", " ");
    } 


    if (user_Fristname === "") {
        errorMessage(firstName_msg, " firstName is required", "red");
        count++;
    } else {
        // successmessage(firstName_msg, "Great firstName", "green");
        
    }

    if (user_LastName === "") {
        errorMessage(lastName_msg, " lastName is required", "red");
        count++;
    } else {
        successmessage(lastName_msg, "greatlasttName", "green");
    }

    if (user_Dob === "") {
        errorMessage(dob_msg, "dob is required", "red");
        count++;
    } else {
        successmessage(dob_msg, "dob is great", "green");
    }

    if (user_Qualification === "") {
        errorMessage(quali_msg, "qualification is required", "red");
        count++;
    } else {
        successmessage(quali_msg, "greate qualification", "green");
    }

    if (user_Address === "") {
        errorMessage(address_msg, "address is required", "red");
        count++;
    } else {
        successmessage(address_msg, "greate address", "green");
    }

    if (user_Country == "") {
        errorMessage(country_msg, "country is required", "red");
        count++;
    } else if (user_Country == "india") {
        successmessage(country_msg, "valid a country", "green");
    } else if (user_Country == "uk") {
        successmessage(country_msg, "valid a country", "green");
    } else if (user_Country == "uae") {
        successmessage(country_msg, "valid a country", "green");
    }

    if (user_state == "") {
        errorMessage(state_msg, "state is required", "red");
        count++;
    } else if (user_state == "Tamilnadu") {
        successmessage(state_msg, "state is valid", "green");
    } else if (user_state == "Karnataka") {
        successmessage(state_msg, " state is valid", "green");
    } else if (user_state == "Mumbai") {
        successmessage(state_msg, "state is valid", "green");
    } else if (user_state == "delhi") {
        successmessage(state_msg, "state is valid", "green");
    }

    if (user_City === "") {
        errorMessage(city_msg, "city is required", "red");
        count++;
    } else {
        successmessage(city_msg, "", "");
    }

    if (user_zip === "") {
        errorMessage(zip_msg, "pin is required", "red");
        count++;
    } else {
        successmessage(zip_msg, "", "");
    }

    if (user_UserName === "") {
        count++;
        errorMessage(username_msg, "username is required", "red");
    } else {
        successmessage(username_msg, "", "");
    }

 
    //email validation

    let reg = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+).([a-z]+)?$/; //abc123._@gmail.com this format

    if (user_Email === "" || !reg.test(user_Email)) {
        errorMessage(email_msg, "invalidiemail", "red");
    } else {
        successmessage(email_msg, "", "");
    }

    // password checking
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20}$/;

if (user_Password === "" || user_Password.length <= 8 || !passwordRegex.test(user_Password)) {
    errorMessage(password_msg, "Starts with an uppercase letter one special character include digit and lowercase", "red");
    count++
} else {
    successmessage(password_msg, "", "");
}

    // mobile phone checking
    if (user_Phone.length != 10) {
        errorMessage(phone_msg, "phone number is requried", "red");
    } else if (user_Phone.length == 10) {
        successmessage(phone_msg, "", "");
    }
    function errorMessage(element, message, color) {
        element.style.display = "block";
        element.textContent = message;
        element.style.color = color;
    }

    function successmessage(element, message, color) {
        element.style.display = "none";
        element.textContent = message;
        element.style.color = color;
    }

    return count;
}

// edit form validatio//

function edit_Formvalidation() {
    let ev_salutation = document.querySelector("#edit_inputSalutation").value.trim();
    let ev_firstname = document.querySelector("#edit_inputFirstname").value.trim();
    let ev_lastname = document.querySelector("#edit_inputLastname").value.trim();
    let ev_email = document.querySelector("#edit_inputEmail").value.trim();
    let ev_phone = document.querySelector("#edit_inputMobile").value.trim();
    let ev_dob = document.querySelector("#edit_inputdateofbirth").value.trim();
    let ev_gender = document.querySelector("input[name='gender']:checked").value.trim();
    let ev_qualification = document.querySelector("#edit_inputquali").value.trim();
    let ev_address = document.querySelector("#edit_inputaddress").value.trim();
    let ev_country = document.querySelector("#edit_select_country").value.trim();
    let ev_state = document.querySelector("#edit_select_country").value.trim();
    let ev_city = document.querySelector("#edit_inputcity").value.trim();
    let ev_pin = document.querySelector("#edit_inputpin").value.trim();
    let ev_username = document.querySelector("#edit_inputUsername").value.trim();
    let ev_password = document.querySelector("#edit_inputPassword").value.trim();
    let ev_male = document.querySelector("#edit_radiomale").checked;
    let ev_female = document.querySelector("#edit_radiofemale").checked;

    const editsalu_msg = document.querySelector(".salu_edi_message");
    const editfirst_msg = document.querySelector(".first_edi_message");
    const editlast_msg = document.querySelector(".last_edi_message");
    const editemail_msg = document.querySelector(".email_edi_message");
    const editphone_msg = document.querySelector(".phone_edi_message ");
    const editdob_msg = document.querySelector(".dob_edi_message");
    const editgender_msg = document.querySelector(".gender_edi_message");
    const editquali_msg = document.querySelector(".quali_edi_message");
    const editaddress_msg = document.querySelector(".address_edi_message");
    const editcountry_msg = document.querySelector(".country_edi_message");
    const editstate_msg = document.querySelector(".state_edi_message");
    const editcity_msg = document.querySelector(".city_edi_message");
    const editpin_msg = document.querySelector(".pin_edi_message");
    const edituser_msg = document.querySelector(".username_edi_message");
    const editpass_mgs = document.querySelector(".paasword_edi_message");

    let count = 0;

    if (ev_salutation === "") {
        errorMessage(editsalu_msg,"salutation is required","red");
        count++;
    } else {
        successmessage(editsalu_msg,"","none");
    }

    if (ev_firstname === "") {
        errorMessage(editfirst_msg, "fristName is required", "red");
        count++;
    } else {
        successmessage(editfirst_msg, "", "none");
    }

    if (ev_lastname === "") {
        errorMessage(editlast_msg, "lastName is required", "red");
        count++;
    } else {
        successmessage(editlast_msg, "", "none");
    }

    let reg = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+).([a-z]+)?$/; //abc123._@gmail.com this format

    if (ev_email === "" || !reg.test(ev_email)) {
        errorMessage(editemail_msg, "invalidiemail", "red");
        count++
    } else {
        successmessage(editemail_msg, "", "none");
    }

    if (ev_phone === "" || ev_phone.length !== 10) {
        errorMessage(editphone_msg, "phone number is required", "red");
        count++
    } else if (ev_phone.length == 10) {
        successmessage(editphone_msg, "", "none");
    }

    if (ev_dob == "") {
        errorMessage(editdob_msg, "dob id required", "red");
        count++
    } else {
        successmessage(editdob_msg, "", "none");
    }

    if (ev_qualification === "") {
        errorMessage(editquali_msg, "qualification is required", "red");
        count++
    } else {
        successmessage(editquali_msg, "", "none");
    }

    if (ev_address === "") {
        errorMessage(editaddress_msg, "address is required", "red");
        count++
    } else {
        successmessage(editaddress_msg, "", "none");
    }

    if (ev_country == "") {
        errorMessage(editcountry_msg, "  country is  required", "red");
        count++
    } else {
        successmessage(editcountry_msg, "", "none");
    }

    if (ev_state === "") {
        errorMessage(editstate_msg, "state is required", "red");
        count++
    } else {
        successmessage(editstate_msg, "", "none");
    }

    if (ev_city === "") {
        errorMessage(editcity_msg, "city is required ", "red");
        count++
    } else {
        successmessage(editcity_msg, "", "none");
    }

    if (ev_pin === "") {
        errorMessage(editpin_msg, "pin is required", "red");
        count++
    } else {
        successmessage(editpin_msg, "", "none");
    }

    if (ev_username === "") {
        errorMessage(edituser_msg, "username is required", "red");
        count++
    } else {
        successmessage(edituser_msg, "", "none");
    }

    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20}$/;

    if (ev_password === "" || ev_password.length <= 8 || !passwordRegex.test(ev_password)) {
        errorMessage(editpass_mgs, "Starts with an uppercase letter one special character include digit and lowercase", "red");
        count++
    } else {
        successmessage(password_msg, "", "");
    }
    //  if(ev_male==""||ev_female==""){
    //    errorMessage(editgender_msg,"gender is required","red")
    //  }else{
    //   successmessage(editgender_msg,"","none")
    //  }

    function errorMessage(element,message,color) {
        element.style.display = "block";
        element.textContent = message;
        element.style.color = color;
    }

    function successmessage(element, message, color) {
        element.style.display = "none";
        (element.textContent = message), 
        (element.style.color = color);
    }

    return count;
}



// searchbox


const search = () => {
    let searchData = [];

    const SearchBox = document.querySelector("#search-item").value.toUpperCase();

    for (let i = 0; i < data.length; i++) {
        let first_Name = data[i].firstName.toUpperCase();
        let last_Name = data[i].lastName.toUpperCase();
        let phone = data[i].phone.toUpperCase();
        let emails = data[i].email.toUpperCase();

        if (
            first_Name.includes(SearchBox) >= true || 
            last_Name.includes(SearchBox) >= true||
            phone.includes(SearchBox) >= true|| 
            emails.includes(SearchBox) >= true
        ) {
            searchData.push(data[i]);
        }
    }

    showtabledate(searchData,currentpage)
    pagination()

}











































  



















   
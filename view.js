
let alldata=[]

const url_id=  new URLSearchParams(window.location.search)
const id= url_id.get("id")
console.log("ndndnd",id);

 
const fetchdata=async()=>{
    const response = await fetch(`http://localhost:3000/employees/${id}`)
    alldata =await response.json()

    viewData()
    console.log("data kitty",alldata);
   

}

fetchdata()


async function viewData(){

    let gender=document.querySelector("#gender-view")
    let age=document.querySelector("#age-view")
    let dob=document.querySelector("#date-view")
    let phone=document.querySelector("#phone-view")
    let qualification=document.querySelector("#Qualifications-view")
    let address=document.querySelector("#add-view")
    let username=document.querySelector("#username-view")
    let name=document.querySelector("#name-view")
    let email=document.querySelector("#email-view")
    let image=document.querySelector("#image-view")


  
    // calculateAge

    let ageDate=alldata.dob
    


    


      let year=ageDate.split("-").pop()
      console.log(year);
      let currentYear= new Date().getFullYear()

      let ages = currentYear-year

    



   
  

 age.innerHTML=ages
 gender.innerHTML=alldata.gender
 dob.innerHTML=alldata.dob
 phone.innerHTML=alldata.phone
 qualification.innerHTML=alldata.qualifications
 address.innerHTML=alldata.address
 username.innerHTML=alldata.username
 name.innerHTML=(alldata.salutation+"."+alldata.firstName+" "+alldata.lastName)
 email.innerHTML=alldata.email
 image.innerHTML = `<img src="http://localhost:3000/employees/${id}/avatar">`
   
}



//  vieweditcode//
let profilepic=document.querySelector("#profile-pic")
let inputFile=document.querySelector("#input-file")

inputFile.onchange=function(){
  profilepic.src=URL.createObjectURL(inputFile.files[0]);
}





let view_form=document.querySelector(".view-form")
let formxCancel=document.querySelector(".view_addempolye_cancel")

formxCancel.addEventListener('click',()=>{
  view_form.style.display="none"
  let blur_body=document.querySelector(".employee_view_details")
  blur_body.style.filter="none"

  

})


let viewEdit_PopBtn=document.querySelector(".view_edit-button")

viewEdit_PopBtn.addEventListener('click',()=>{
  let blur_body=document.querySelector(".employee_view_details")
  blur_body.style.filter="brightness(0.5)"

     view_form.style.display="block" 

     document.querySelector("#profile-pic").src=`http://localhost:3000/employees/${id}/avatar`
     document.querySelector("#viewSalutation").value=alldata.salutation;
     document.querySelector("#viewFirstname").value=alldata.firstName;
     document.querySelector("#viewLastname").value=alldata.lastName;
     document.querySelector("#viewEmail").value=alldata.email;
     document.querySelector("#viewMobile").value=alldata.phone;
     document.querySelector("#viewdateofbirth").value=alldata.dob.split("-").reverse().join("-");
     document.querySelector("#radiomale").checked=alldata.gender==="male";
     document.querySelector("#radiofemale").checked=alldata.gender==="female";
     document.querySelector("#viewquali").value=alldata.qualifications;
     document.querySelector("#viewaddress").value=alldata.address;
     document.querySelector("#view_country").value=alldata.country;
     document.querySelector("#view-state").value=alldata.state;
     document.querySelector("#viewcity").value=alldata.city;
     document.querySelector("#viewpin").value=alldata.zip;
     document.querySelector("#viewUsername").value=alldata.username;
     document.querySelector("#viewPassword").value=alldata.password;
     
   
})




 async function vieweditdata(){
  
  
    
    const response=  await fetch(`http://localhost:3000/employees/${id}`)
     alldata = await response.json()

    console.log(alldata)

 
    
   console.log( document.querySelector("#view-state").value=alldata.state);
  


let viewEditd_employee={
   salutation:document.querySelector("#viewSalutation").value,
   firstName:document.querySelector("#viewFirstname").value,
   lastName:document.querySelector("#viewLastname").value,
   email:document.querySelector("#viewEmail").value,
   phone:document.querySelector("#viewMobile").value,
   dob:document.querySelector("#viewdateofbirth").value.split("-").reverse().join("-"),
   gender:document.querySelector("#radiomale").checked ? "male" :"female",
   qualifications:document.querySelector("#viewquali").value,
   address:document.querySelector("#viewaddress").value,
   city:document.querySelector("#viewcity").value,
   state:document.querySelector("#view-state").value,
   country:document.querySelector("#view_country").value,
   zip:document.querySelector("#viewpin").value,
   username:document.querySelector("#viewUsername").value,
   password:document.querySelector("#viewPassword").value,
  
  }

   console.log("ojectresived",viewEditd_employee);


 try{
  fetch(`http://localhost:3000/employees/${id}`,{
                                                                      
  method:"PUT",
  headers:{
   "Content-type":"application/json",

  },                                                  

  body:JSON.stringify(viewEditd_employee)
     
  })
  setTimeout(()=>{

    window.location.reload()
  },500)

  const viewInputFile=document.getElementById('input-file')
  if(viewInputFile.files.length>0){
    const formdata=new FormData();
    formdata.append("avatar",viewInputFile.files[0])

    const avatarupDATE=fetch(`http://localhost:3000/employees/${id}/avatar`,{
      method:'POST',
      body:formdata,

    })

    // setTimeout(()=>{

    //   window.location.reload()
    // },500)
  }

 }catch(error){

  console.log("net work error",error);
 }
 

  
  }



  let view_edit_sumbmit=document.querySelector(".view-edit-sumbit")

  view_edit_sumbmit.addEventListener('click',()=>{

      
     
    
  let viewvalidation=   viewValidationform()
        if(viewvalidation==0){
         vieweditdata()
         view_form.style.display="none" 
         let blur_body=document.querySelector(".employee_view_details")
         blur_body.style.filter="none"

        }                   


  })

// addbtnleftcancelbutton

let view_form_cancel=document.querySelector(".view_edit-cancel")
view_form_cancel.addEventListener('click',()=>{
   view_form.style.display="none"
   let blur_body=document.querySelector(".employee_view_details")
   blur_body.style.filter="none"
})


//   validationviewedit//

function viewValidationform(){

   let salutaion=document.querySelector("#viewSalutation").value.trim()
   let fristName=document.querySelector("#viewFirstname").value.trim()         
   let lastName=document.querySelector("#viewLastname").value.trim()
   let email=document.querySelector("#viewEmail").value.trim()
   let phone=document.querySelector("#viewMobile").value.trim()           
   let dob=document.querySelector("#viewdateofbirth").value.trim()
   let v_male=document.querySelector("#radiomale").checked
   let v_female=document.querySelector("#radiofemale").checked
   let qualifications=document.querySelector("#viewquali").value.trim()
   let address=document.querySelector("#viewaddress").value.trim()
   let country=document.querySelector("#view_country").value.trim()
   let state=document.querySelector("#view-state").value.trim()
   let city =document.querySelector("#viewcity").value.trim()
   let zip=document.querySelector("#viewpin").value.trim()
   let username=document.querySelector("#viewUsername").value.trim()
   let password=document.querySelector("#viewPassword").value.trim()

  
let count=0

   let salutaion_msg=document.querySelector(".view-salutaion")         
   let fristName_msg=document.querySelector(".view-firstName")
   let lastName_msg=document.querySelector(".view-lastName")
   let email_msg=document.querySelector(".view-Email")
   let phone_msg=document.querySelector(".view-phone")
   let dob_msg=document.querySelector(".view-dob")
   let gender_msg=document.querySelector(".view-gender")
   let qualification_msg=document.querySelector(".view-qualification")
   let address_msg=document.querySelector(".view-addess")
   let country_msg=document.querySelector(".view-country")
   let state_msg=document.querySelector(".view-state")
   let city_msg=document.querySelector(".view-city")
   let zip_msg=document.querySelector(".view-zip")
   let user_msg=document.querySelector(".view-userName")
   let password_msg=document.querySelector(".view-password")        

     

 if(salutaion===""){
   errorMessage(salutaion_msg,"salutation is required","red")
   count++
 }else{
   successmessage(salutaion_msg,"","none")
 }

  if(fristName===""){
    errorMessage(fristName_msg,"firstName is required","red")
    count++
  }else{
   successmessage(fristName_msg,"","none")
  }

   
 if(lastName===""){
   errorMessage(lastName_msg,"lastname is required","red")
   count++
 }else{
   successmessage(lastName_msg,"","none")
 }


 let reg = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+).([a-z]+)?$/; //abc123._@gmail.com this format

    if (email === "" || !reg.test(email)) {
        errorMessage(email_msg, "invalidiemail", "red");
        count++
    } else {
        successmessage(email_msg, "", "none");
    }

    if(phone===""||phone.length!==10){
      errorMessage(phone_msg,"number is required")
      count++
    }else{
      successmessage(phone_msg,"","none")
    }


    if(dob==""){
     errorMessage(dob_msg,"dateofbirth is required","red")
     count++
    }else{
      successmessage(dob_msg,"","none")
    }

    if(address===""){
      errorMessage(address_msg,"address is required","red")
      count++
   
    }else{
      successmessage(address_msg,"","none")
    }
   
    if(qualifications===""){
      errorMessage(qualification_msg,"qualification is required","red")
      count++
    }else{
      successmessage(qualification_msg,"","none")
    }
   
    if(country===""){
      errorMessage(country_msg,"country is required","red")
      count++
    }else{
      successmessage(country_msg,"","none")
    }
    
    if(state===""){
      errorMessage(state_msg,"state is required","red")
      count++
    }else{
      successmessage(state_msg,"","none")
    }

   
   if(city===""){
      errorMessage(city_msg,"city is required","red")
      count++
   }else{
      successmessage(city_msg,"","none")
   }

   if(zip===""){
      errorMessage(zip_msg," zip/pin is required","red")
      count++
   }else{
      successmessage(zip_msg,"","none")
   }


   if(username===""){
      errorMessage(user_msg,"username is required","red")
      count++
   }else{
      successmessage(user_msg,"","none")
   }

   let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20}$/;

   if (password === "" ||password.length <= 8 || !passwordRegex.test(password)) {
       errorMessage(password_msg, "Starts with an uppercase letter one special character include digit and lowercase", "red");
       count++
   } else {
       successmessage(password_msg, "", "");
   }
   function errorMessage(element,message,color) {
    element.style.display = "block";
    element.textContent = message;
    element.style.color = color;
}

function successmessage(element,message,color){
   element.style.display="none";
   element.textContent=message;
   element.style.color=color
}



return count;

}



// view_delete_form

let alert_delete=document.querySelector(".view-delete-aler-box")
let cancel_btn=document.querySelector(".cancel_employee_btn")

cancel_btn.addEventListener('click',()=>{
   alert_delete.style.display="none"
   let blur_body=document.querySelector(".employee_view_details")
   blur_body.style.filter="none"
})



let xVIew_btn=document.querySelector(".btn-delete")

xVIew_btn.addEventListener('click',()=>{
    alert_delete.style.display="none"
   
    let blur_body=document.querySelector(".employee_view_details")
   blur_body.style.filter="none"

})


// deleteempolview
let viewDelet=document.querySelector("#view-delete-employe")


viewDelet.addEventListener('click',()=>{
   alert_delete.style.display="block"
  
   let blur_body=document.querySelector(".employee_view_details")
   blur_body.style.filter="brightness(0.5)"
  
})



let viewEmploye_DeleteBtn=document.querySelector('.delete_employee_btn')

viewEmploye_DeleteBtn.addEventListener('click',(e)=>{
  e.preventDefault()

    fetch(`http://localhost:3000/employees/${id}`,{
      method:"DELETE",
      headers:{
         "Content-Type": "application/json",
      },
   })


   
   setTimeout(() => {
    //  window.location.href=("C:\")
         window.location.href=("file:///C:/Users/Ajmal/Desktop/jsprojectstack/index.html")


    }, 2000);                    









   })


   


var Fname = document.getElementById("Fname"); 
var Lname = document.getElementById("Lname");
var mail = document.getElementById("Email");
var age = document.getElementById("Age");
var search = document.getElementById("search");
var btnAdd = document.getElementById("add");
var tbody = document.getElementsByTagName("tbody")[0]
var btnClear = document.getElementById("clear");
var Invalid1 = document.getElementById("Invalid1")
var Invalid2 = document.getElementById("Invalid2")
var Invalid3 = document.getElementById("Invalid3")
var Invalid4 = document.getElementById("Invalid4")
var valid1 = document.getElementById("valid1")
var valid2 = document.getElementById("valid2")
var valid3 = document.getElementById("valid3")
var valid4 = document.getElementById("valid4")
var Repeat = document.getElementById("Repeat")
var arr = JSON.parse(localStorage.getItem("users")) || [];
var currentIndex=0;


var regxFirstName = /[a-z]/i;
var regxLastName = /^[a-z]{1,10}$/i
var regxEmail = /[a-z0-9]{0,15}@(gmail|outlook|mail).com$/i
var regxAge = /^(([0-7]{1}[0-9]{1})|80)$/i

document.addEventListener("keydown",function(e){
    if(e.keyCode === 13){
        addToTable()
    }    
})
btnAdd.addEventListener("click",addToTable)     

btnClear.addEventListener("click",clearAllItem)

search.addEventListener("keyup",searchForItem)

displayINTable(arr);

function addToTable(){
    if(showVaildation() && UniqueValue()){
    if(btnAdd.innerHTML==="Add"){
        var UserData = {
            FirstName:Fname.value.trim(),
            LastName:Lname.value.trim(),
            Email:mail.value.trim(),
            Age:age.value.trim()
        }
        arr.push(UserData);
    }
else{
    saveupdate()
    btnAdd.innerHTML = "Add"
}
displayINTable(arr);
clearInputsField();
SaveDataINLocalStorage();
}
    }
function displayINTable(data){
    var result=""; 
    for(var i=0 ; i<data.length;i++){
    result +=`<tr>
             <td class="text-white">${data[i].FirstName}</td>
             <td class="text-white">${data[i].LastName}</td>
             <td class="text-white">${data[i].Email}</td>
             <td class="text-white">${data[i].Age}</td>
             <td><button class="btn btn-success" onclick="update(${i})">Update</button></td>
             <td><button class="btn btn-danger" onclick = "DeleteFromTabel(${i})">Delete</button></td> 
    </tr>`
    } 
    tbody.innerHTML = result
    SaveDataINLocalStorage();
}
function DeleteFromTabel(index){
    arr.splice(index,1);
    displayINTable(arr);
    SaveDataINLocalStorage();
}
function clearAllItem(){
        arr=[];
        displayINTable(arr);
        ClearFromLocalStorage();
        clearInputsField();
}

function searchForItem(){ 
   let filtered = arr.filter(function(e){
       return e.FirstName.toLowerCase().includes(search.value.toLowerCase())
    })
    displayINTable(filtered)
}
function clearInputsField(){
   Fname.value ="";
   Lname.value ="";
   mail.value ="";
   age.value ="";
}
function update(index){
  Fname.value =`${arr[index].FirstName}` 
  Lname.value = `${arr[index].LastName}` 
  mail.value = `${arr[index].Email}` 
  age.value = `${arr[index].Age}` 
  currentIndex = index;
 btnAdd.innerHTML = "Update"
}
function saveupdate(){
    arr[currentIndex] = {
        FirstName: Fname.value.trim(),
        LastName: Lname.value.trim(),
        Email: mail.value.trim(),
        Age: age.value.trim()
    };
}
function ClearFromLocalStorage(){
    localStorage.removeItem("users") 
}
function SaveDataINLocalStorage(){
    localStorage.setItem("users", JSON.stringify(arr));
}

function showVaildation(){
    var flag = true;
    if(regxFirstName.test(Fname.value)){
        Invalid1.classList.remove("invalid-feedback")
        valid1.classList.add("valid-feedback")
          valid1.style.display = "block"
          Invalid1.style.display = "none"
          setTimeout(() => {
            valid1.style.display = "none"
          },3000)
    }else{
        Invalid1.classList.add("invalid-feedback")
        valid1.classList.remove("valid-feedback")
        Invalid1.style.display = "block"
        valid1.style.display = "none"
        setTimeout(() => {
            Invalid1.style.display = "none"
          },3000)
           flag = false
    }
    if(regxLastName.test(Lname.value)){
        Invalid2.classList.remove("invalid-feedback")
        valid2.classList.add("valid-feedback")
          valid2.style.display = "block"
          Invalid2.style.display = "none"
          setTimeout(() => {
            valid2.style.display = "none"
          },3000)
    }else{
        Invalid2.classList.add("invalid-feedback")
        valid2.classList.remove("valid-feedback")
        Invalid2.style.display = "block"
        valid2.style.display = "none"
        setTimeout(() => {
            Invalid2.style.display = "none"
          },3000)
           flag = false
    }
    if(regxEmail.test(mail.value)){

        Invalid3.classList.remove("invalid-feedback")
        valid3.classList.add("valid-feedback")
          valid3.style.display = "block"
          Invalid3.style.display = "none"
          setTimeout(() => {
            valid3.style.display = "none"
          },3000)
    
}
    else{
        Invalid3.classList.add("invalid-feedback")
        valid3.classList.remove("valid-feedback")
          Invalid3.style.display = "block"
          valid3.style.display = "none"
          setTimeout(() => {
            Invalid3.style.display = "none"
          },3000)
           flag = false
    }
    if(regxAge.test(age.value)){
        Invalid4.classList.remove("invalid-feedback")
        valid4.classList.add("valid-feedback")
          valid4.style.display = "block"
          Invalid4.style.display = "none"
          setTimeout(() => {
            valid4.style.display = "none"
          },3000)
    }else{
        Invalid4.classList.add("invalid-feedback")
        valid4.classList.remove("valid-feedback")
          Invalid4.style.display = "block"
          valid4.style.display = "none"
          setTimeout(() => {
            Invalid4.style.display = "none"
          },3000)
           flag = false
    }
    return flag
}
function UniqueValue(){
  var isDuplicate;
  if (btnAdd.innerHTML === "Update") {
    isDuplicate = arr.some(function(e){
      return e.Email.toLowerCase() === mail.value.toLowerCase() && arr[currentIndex].Email !== e.Email;
  })
  }
    else{
      isDuplicate = arr.some(function(e){ 
      return e.Email.toLowerCase() === mail.value.toLowerCase()
    });
  }
    if(isDuplicate){
        Repeat.classList.add("invalid-feedback")
        Repeat.style.display = "block" 
        valid1.style.display = "none"
        valid2.style.display = "none"
        valid3.style.display = "none"
        valid4.style.display = "none"
      setTimeout(()=>{
       Repeat.style.display = "none"
      },3000)
        return false;
    }
    else{
        Repeat.style.display = "none"
        return true
    }
    }
    
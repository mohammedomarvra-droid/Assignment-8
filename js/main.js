
var userName = document.getElementById('userName')
var userNumber = document.getElementById('userNumber')
var userEmail = document.getElementById('userEmail')
var userPassword = document.getElementById('userPassword')
var userAddress = document.getElementById('userAddress')
var userSelect = document.getElementById('userSelect')
var contactNotes = document.getElementById('contactNotes')
var contactRow = document.getElementById('contactRow')
var addButton = document.getElementById('addButton')
var upDate = document.getElementById('upDate')
var searchInput = document.getElementById('searchInput')

var contactsList = []
if (localStorage.getItem('contacts')) {
    contactsList = JSON.parse(localStorage.getItem('contacts'));
    displayContacts()
}




function addContact() {
    if (
        validate(userName) &&
        validate(userNumber) &&
        validate(userEmail) &&
        validate(userPassword) &&
        validate(userAddress) &&
        validate(userSelect) &&
        validate(contactNotes)
    ) {

        Swal.fire({
            title: 'Do you want to add this contact?',
            text: 'The date will be saved to your list',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#0d6efd',
            cancelButtonColor: '#dc3545',
            confirmButtonText: 'yes , Add',
            cancelButtonText: 'cancel'
        }).then((result) => {

            if (result.isConfirmed) {
                var contact = {
                    name: userName.value,
                    number: userNumber.value,
                    email: userEmail.value,
                    password: userPassword.value,
                    addres: userAddress.value,
                    select: userSelect.value,
                    notes: contactNotes.value,
                    isFavorite: false
                };

                contactsList.push(contact);
                localStorage.setItem('contacts', JSON.stringify(contactsList));

                displayContacts();
                clearForm();

                Swal.fire({
                    title: 'Added Successfully',
                    text: 'Contact saved successfully to the list ',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        });
    }
}


function clearForm() {

    userName.value = ''
    userNumber.value = ''
    userEmail.value = ''
    userAddress.value = ''
    userPassword.value = ''
    userSelect.value = ''
    contactNotes.value = ''
}

function deleteFun(index) {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {

        if (result.isConfirmed) {


            contactsList.splice(index, 1);
            localStorage.setItem('contacts', JSON.stringify(contactsList));
            displayContacts();


            Swal.fire({
                title: 'Deleted!',
                text: 'Contact has been deleted successfully.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
        }
    });
}

function displayContacts(list = contactsList) {
    var box = '';
    for (let i = 0; i < list.length; i++) {
        box += `
        <div class="col-md-4 pt-5">
                    <div class="card-item-2 shadow rounded-3">
                        <div class="head-card d-flex gap-3 pb-3">
                            <div class="image">
                                <img src="" alt="">
                            </div>
                            <div class="userphone">
                                <p class="m-0">${list[i].name}</p>
                                <p class=" phone m-0 "><i class="fa-solid fa-phone text-success "></i> <span
                                        class="fw-bold">${list[i].number}</span></p>
                            </div>
                        </div>
                        <div class="user-info d-flex flex-column gap-3">
                            <p class="m-0"><i class="fa-solid fa-envelope text-primary"></i>${list[i].email}</p>
                            <p class="m-0"><i class="fa-solid fa-location-dot text-success"></i>${list[i].addres}</p>
                        </div>
                        <div class="footer d-flex align-items-end justify-content-between">
                            <div class="user-footer d-flex gap-2 pt-3">
                                <button type="button" class="btn btn-light"><i
                                        class="fa-solid fa-envelope text-primary"></i></button>
                                <button type="button" class="btn btn-light"><i
                                        class="fa-solid fa-location-dot text-success"></i></button>
                            </div>
                            <div class="action">
                                <button type="button" class="btn btn-light"><i
                                        class="fa-solid fa-star text-secondary"></i></button>
                                <button type="button" class="btn btn-light"><i
                                        class="fa-solid fa-heart text-secondary"></i></button>
                                <button type="button" onclick="populateForm(${i})" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#contactModal"><i
                                        class="fa-solid fa-file-pen text-secondary"></i></button>
                                <button type="button"    onclick="deleteFun(${i})"  class="btn btn-light" ><i
                                        class="fa-solid fa-trash-can text-secondary"></i></button>
                            </div>
                        </div>

                    </div>
                </div>
            
        `
    }
    contactRow.innerHTML = box;
}
var globaIndex;
function populateForm(index) {
    if (!contactsList[index]) return;
    globaIndex = index
    userName.value = contactsList[index].name
    userNumber.value = contactsList[index].number
    userEmail.value = contactsList[index].email
    userAddress.value = contactsList[index].addres

    addButton.classList.add('d-none')
    upDate.classList.remove('d-none')

}

function updeteFun() {
    contactsList[globaIndex].name = userName.value
    contactsList[globaIndex].number = userNumber.value
    contactsList[globaIndex].email = userEmail.value
    contactsList[globaIndex].addres = userAddress.value

    localStorage.setItem('contacts', JSON.stringify(contactsList));
    displayContacts();

    addButton.classList.remove('d-none')
    upDate.classList.add('d-none')

}

function searchFun() {
    var searchedArr = []
    var trem = searchInput.value.trim().toLowerCase()
    for (var i = 0; i < contactsList.length; i++) {
        if (
            contactsList[i].name.trim().toLowerCase().includes(trem) ||
            contactsList[i].number.trim().includes(trem) ||
            contactsList[i].email.trim().toLowerCase().includes(trem)) {
            searchedArr.push(contactsList[i])
        }
    }
    displayContacts(searchedArr)
}

function validate(ele) {


    var regex = {
        userName: /^[A-Z][a-z]{2,10}$/,
        userNumber: /^\d+$/,
        userEmail: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
        userAddress: /^[\u0600-\u06FFa-zA-Z0-9\s,./]{3,50}$/,
        userPassword: /^\d+$/,
        userSelect: /^(Family|Frindes|Work)$/,
        contactNotes: /^[a-z]+$/,
    }
    var isValid = regex[ele.id].test(ele.value)
    ele.classList.toggle('is-valid', isValid)
    ele.classList.toggle('is-invalid', !isValid)


    ele.parentElement.nextElementSibling.classList.toggle('d-none', isValid)


    return isValid;
}

Swal.fire({
    title: "Drag me!",
    icon: "success",
    draggable: true
});

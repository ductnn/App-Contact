/**
 * Sử dụng kiến thức đã học, tạo ra một ứng dụng danh bạ điện thoại, có các chức năng:
 * - Nhập dữ liệu contact (name, phone number)
 * - Sửa dữ liệu contact
 * - Xoá contact
 * - Tìm kiếm contact: có thể nhập vào tên (không dấu hoặc có dấu, chữ hoa hoặc chữ thường vẫn cho ra kết quả) hoặc 1 phần số điện thoại
 */

const readlineSync = require('readline-sync');
const fs = require('fs');

var contacts = [];

function loadData(){
    var fileContent = fs.readFileSync('./data.json');
    contacts = JSON.parse(fileContent);
};

function showMenu(){
    console.log('1. Show all list contact');
    console.log('2. Create a new contact');
    console.log('3. Search contact');
    console.log('4. Update contact');
    console.log('5. Delete contact');

    var option = readlineSync.question('> ');
    switch (option){
        case '1':
            showContacts();
            showMenu();
            break;
        case '2':
            showCreateContacts();
            showMenu();
            break;
        case '3':
            searchContacts();
            showMenu();
            break;
        case '4':
            updateContacts();
            showMenu();
            break;
        case '5':
            deleteContacts();
            showMenu();
            break;
        default:
            console.log("Wrong option");
            showMenu();
            break;
    };
};

function showContacts(){
    for(var contact of contacts){
        console.log("id: " + contact.id + ">> " + contact.name + ": " + contact.phone);
    };
};

function showCreateContacts(){
    var name = readlineSync.question("Name: ");
    var phone = readlineSync.question("Phone Number: ");
    var contact = {
        id: contacts.length+1,
        name: name,
        phone: parseInt(phone)
    };
    contacts.push(contact);
    saveContacts();
};

function saveContacts(){
    var content = JSON.stringify(contacts);
    console.log(content);
    fs.writeFileSync('./data.json', content, { encoding: "utf8" });
};

function updateContacts(){
    var idUpdate = readlineSync.question("Type id update: ");
    idUpdate = parseInt(idUpdate);
    for(var i=0; i<contacts.length; i++){
        if(contacts[i].id == idUpdate){
            var newPhoneNumber = readlineSync.question("Type new phone number: ");
            contacts[i].phone = parseInt(newPhoneNumber);
            saveContacts();
            break;
        };
    };
};

function deleteContacts(){
    var idDelete = readlineSync.question("Type id delete: ");
    idDelete = parseInt(idDelete);
    for(var i=0; i<contacts.length; i++){
        if(contacts[i].id == idDelete){
            contacts.splice(i, 1);
            saveContacts();
            break;
        };
    };
};

function searchContacts(){
    var result = [];
    var searchSomething = readlineSync.question("Search something: ");
    if(!isNaN(searchSomething)){
        // console.log(typeof searchSomething);
        searchSomething = Number(searchSomething);
        for(var contact of contacts){
            if(Number(contact.phone).toString().indexOf(Number(searchSomething).toString()) >= 0){
                result.push(contact);
            };
        };
        showContacts(result);
    } else {
        searchSomething = searchSomething.toString();
        for(contact of contacts){
            if(contact.name.toLowerCase().indexOf(searchSomething.toLowerCase()) >= 0){
                result.push(contact);
            };
        };
        showContacts(result);
    };
};

function main(){
    loadData();
    showMenu();
};

main();
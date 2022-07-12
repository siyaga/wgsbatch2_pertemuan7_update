const validator = require('validator');
const fs = require('fs');
const readline = require('readline');

  // Membuat fungsion periksaFolder
  const periksaFolder = ()=> {
  //Membuat folder data apabila tidak ada
  const dirPath = './data';
  if(!fs.existsSync(dirPath)){
  fs.mkdirSync(dirPath);
  }

  }

  //Membuat fungsi periksaFile
  const periksaFile = ()=> {
  // Membuat file contacts.json jika belum ada
  const dataPath = './data/contacts.json';
  if(!fs.existsSync(dataPath)){
  fs.writeFileSync(dataPath,'[]','utf-8');
  }
  }

  //Membuat fungsi loader jsonnya
  const loadContact= ()=>{
    const file = fs.readFileSync('data/contacts.json', 'utf8');
    const contacts =JSON.parse(file);
    return contacts;
  }


//Simpan Data
const saveIsiData = (name,mobile,email) => {
    periksaFolder();
    periksaFile();
    const contact = {name, mobile, email};
    const contacts = loadContact();
    // Membuat Jika Nama duplikat
const namaDuplikat = contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase());
    if(namaDuplikat){
      //Menampilkan jika nilai true bila sama namanya maka munculkan nama sudah digunakan
      //agar error berhenti disini
      return  console.log("Nama sudah digunakan, silakan ganti nama lain");
  }
     //Menambahkan validasi untuk nomor telephone
     if(!validator.isMobilePhone(mobile, 'id-ID')){
      console.log("Nomor Telephone Yang anda Masukan Salah!!, Pastikan Format nomor sesuai.")
      return false;
    
    }
    //Menambahkan validasi untuk email
    if(!validator.isEmail(email)){
      console.log("Email yang anda Masukan Salah!, Pastikan Format email sesuai.")
      return false;
    }
    


    contacts.push(contact);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log("Terima Kasih sudah memasukkan data!");

}

// Fungsi Menampilkan list data di json
const listContact= ()=>{
  const contacts = loadContact();
  console.log('Contact List : ');
  contacts.forEach((contact,i)=>{
    console.log(` ${i+1}. ${contact.name} - ${contact.mobile}`);

  });
};
//Membuat fungsi detail Contact dengan parameter masukan name
const detailContact = (name)=> {
  const contacts = loadContact();
  console.log('Detail contact : ');
  const contact = contacts.find((contact)=>contact.name.toLowerCase() === name.toLowerCase());


  //Melakukan validasi jika nama tidak di temukan
  if(!contact){
    console.log("Nama tidak ada");
    return false;
  }

  
  console.log(` Nama : ${contact.name}`);
  if(contact.email){
    console.log(` Email : ${contact.email}`);
  }
  console.log(` No Telp : ${contact.mobile}`);

 
}

//Membuat fungsi Delete Contact dengan parameter masukan name
const deleteContact = (name)=> {
  const contacts = loadContact();
  //Membuat array baru untuk di masukan ke dalam newContact
  const newContact = contacts.filter((contact)=>contact.name.toLowerCase() !== name.toLowerCase());


  //Melakukan validasi bila tidak di temukan namanya
  if(contacts.length === newContact.length){
    console.log(`${name} tidak ditemukan`);
    return false;
  }


  //melakukan timpa terhadap array baru
  fs.writeFileSync('data/contacts.json', JSON.stringify(newContact));
  console.log(` ${name} Berhasil di hapus`);
}

// Membuat fungsi Update
const updateContact = (namef,name,mobile,email)=> {
  const contacts = loadContact();
  const contact = contacts.find((contact)=>contact.name.toLowerCase() === namef.toLowerCase());

//Melakukan validasi jika nama tidak di temukan
  if(!contact){
    console.log(`${namef} tidak ada`);
    return false;
  }
  

   
  
  let updateName, updateMobile, updateEmail;

  // Validasi untuk menemukan data
  if(contact.name === name || name === undefined || name === null || name === ''){
     updateName = contact.name;
  } else if(contact.name !== name ){
    //Menampilkan jika nilai true bila sama namanya maka munculkan nama sudah digunakan
    const namaDuplikat = contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase());
    if(namaDuplikat){
      
      //agar error berhenti disini
      return  console.log("Nama sudah digunakan, silakan ganti nama lain");
  }else {

  
     updateName = name;
    }
  }

  if(contact.mobile === mobile || mobile === null || mobile === undefined || mobile === ''){
     updateMobile = contact.mobile;
  } else if(contact.name !== mobile ){
    //Validasi format Nomor
    if(!validator.isMobilePhone(mobile, 'id-ID')){
      console.log("Nomor Telephone Yang anda Masukan Salah!!, Pastikan Format nomor sesuai.");
      return false;
    
    }else{
      updateMobile = mobile;
    }
  }

  if(contact.email === email || email === null || email === undefined || mobile === ''){
     updateEmail = contact.email;
  } else if(contact.email !== email )
  {
    //Validasi format Email
    if(!validator.isEmail(email)){
      console.log("Email yang anda Masukan Salah!, Pastikan Format email sesuai.");
      return false;
    }else {
      updateEmail = email;
    }
  }



  


  const dataUpdate = {
    name : updateName,
    mobile : updateMobile,
    email : updateEmail,

  }
  


  // deleteContact(namef);
  const newContact = contacts.filter((contact)=>contact.name.toLowerCase() !== namef.toLowerCase());
  fs.writeFileSync('data/contacts.json', JSON.stringify(newContact));
  

  newContact.push(dataUpdate);
  console.log(dataUpdate);
  fs.writeFileSync('data/contacts.json', JSON.stringify(newContact));
  // saveIsiData(dataUpdate.name, dataUpdate.mobile, dataUpdate.email);
  // untuk mengclear console log di atas
  process.stdout.write('\033c');
  console.log(`${namef} data updated`);

  




  


 

}

module.exports = { saveIsiData, listContact, detailContact, deleteContact, updateContact};
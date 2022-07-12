
    const { argv } = require('process')
    const contact = require('./contact')
    // Memanggil Yargs
    const yargs = require("yargs");
    
    // Membuat Yargs 
    yargs.command({
        command:'add',
        describe:'add new contact',
        builder:{
            //membuat isi Objek deksripsinya
            // Membuat nama
            name: {
                describe:'Contact name',
                demandOption:true,
                type:'string',
            },
            // membuat email
            email:{
                describe:'Contact Email',
                demandOption:false,
                type:'string',
            },
            // membuat Mobile
            mobile:{
                describe:'Contact Mobile phone number',
                demandOption:true,
                type:'string',
            },
    
        },
        //Memanggil yargs
        handler(argv){
      
    
            
    
            contact.saveIsiData(argv.name,argv.mobile,argv.email);
            
        },
    });

    // shown contact list
    yargs.command({
        command:'list',
        describe:'see contact list',
        handler(){
            contact.listContact();
        },
    });
       // shown contact Detail
       yargs.command({
        command:'detail',
        describe:'see contact detail base on name',
        builder:{
            //membuat isi Objek deksripsinya
            // Membuat nama
            name: {
                describe:'Contact name',
                demandOption:true,
                type:'string',
            },
        },
        handler(argv){
            contact.detailContact(argv.name);
        },
    });
       // shown contact Delete
       yargs.command({
        command:'delete',
        describe:'delete contact base on name',
        builder:{
            //membuat isi Objek deksripsinya
            // Membuat nama
            name: {
                describe:'Contact name',
                demandOption:true,
                type:'string',
            },
        },
        handler(argv){
            contact.deleteContact(argv.name);
        },
    });

       // shown contact Update
       yargs.command({
        command:'update',
        describe:'update contact base on name',
        builder:{
            //membuat isi Objek deksripsinya
            namef: {
                describe:'Cari Nama',
                demandOption:true,
                type:'string',
            },
            // Membuat nama
            name: {
                describe:'Contact name',
                demandOption:false,
                type:'string',
            },
              // membuat email
              email:{
                describe:'Contact Email',
                demandOption:false,
                type:'string',
            },
            // membuat Mobile
            mobile:{
                describe:'Contact Mobile phone number',
                demandOption:false,
                type:'string',
            },
        },
        handler(argv){
            contact.updateContact(argv.namef,argv.name,argv.mobile,argv.email);
        },
    });

    yargs.parse();
 
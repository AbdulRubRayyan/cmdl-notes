const chalk = require('chalk');
const fs = require('fs');

const getNotes =  () => {
    return 'Your notes...'
}


const addNote = (title, body) => {
    const notes = LoadNotes();
    const dupNote = notes.find((note) => note.title === title)
    

    if(!dupNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes); 
        console.log(chalk.black.bgGreen(title+ ' is added'));
        
        
    } else {
        console.log(chalk.red.inverse('Note title already exits'));
         
    }
    saveNotes(notes);    
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
} 

const LoadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];  
    } 
}

const removeNote = (title)  => { 
    const notes = LoadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title )
    
    if(notes.length > notesToKeep.length) {
        console.log(chalk.bgRed(title + ' is removed. '));
        saveNotes(notesToKeep);
    } else {
        console.log(chalk.red.inverse('No note found.'));     
    }  
}

const listNotes = () => {
    const notes = LoadNotes();

    console.log(chalk.inverse('Your Notes'));
    notes.forEach((note) => {
        console.log(note.title);
    })   
}

const readNotes = (title) => {
    const notes = LoadNotes();
    const note = notes.find((note) => note.title === title )
    if(note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body);
        
        
    } else {
        console.log(chalk.red('No note was found. '));
        
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}
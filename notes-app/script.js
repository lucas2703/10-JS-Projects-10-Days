var isNewNoteOpen = false;

if (!localStorage.getItem('numberOfNotes'))
{
    console.log("no ticker found, creating...");
    localStorage.setItem('numberOfNotes', 0);
}

function displayNotes()
{
    if (document.getElementById('note-storage'))
    {
        document.getElementById('note-storage').innerHTML = '';
    }
    Object.keys(localStorage).forEach(function(key){
        if (!(key == 'numberOfNotes'))
        {
            var newNote = document.createElement('div');
            newNote.classList.add('stored-note');

            var noteText = localStorage.getItem(key).substring(0, 40);
        
            newNote.innerHTML = `
                ${noteText}
            `
            
            newNote.addEventListener('click', () => {
                openNote(newNote)
             })
        
            document.getElementById('note-storage').appendChild(newNote);
        }
    
    });
}

displayNotes();

function openNote(note)
{
    if (isNewNoteOpen == true)
    {
        alert('Please finishing writing note');
    }

    Object.keys(localStorage).forEach(function(key){
        var value = localStorage.getItem(key)
        var tempText = note.innerHTML.trim().substring(0, 15) 
        if (tempText == value.substring(0, 15))
        {
            console.log('found match', value);
            isNewNoteOpen = !isNewNoteOpen;
            var newNote = document.createElement('div');
            newNote.classList.add('new-note')

            newNote.innerHTML = `
                <div class="nn-btn-header">
                    <button id="save-note-btn"><i class="fas fa-save"></i></i></button>
                </div>
                <div class="note" id="note" contenteditable="true">${value}</div>
            `
            document.body.appendChild(newNote);

            document.getElementById('save-note-btn').addEventListener('click', () => {
                var newNoteText = document.getElementById('note').innerHTML;
                localStorage.setItem(key, newNoteText);
                newNote.remove();
                isNewNoteOpen = false;
            });
        }
    });
}

function addNewNote(text)
{
    console.log('adding note: ', text);

    var counter = parseInt(localStorage.getItem('numberOfNotes'));
    console.log(counter);
    counter += 1

    localStorage.setItem(counter, text);

    localStorage.setItem('numberOfNotes', counter)

    displayNotes();
}

document.getElementById('new-note-btn').addEventListener('click', () => {
    if (localStorage.length > 4)
    {
        alert('Please delete a note to free up room');
        return
    }
    document.getElementById('new-note-btn').style.visibility = 'hidden';

    isNewNoteOpen = !isNewNoteOpen;
    var newNote = document.createElement('div');
    newNote.classList.add('new-note')

    newNote.innerHTML = `
        <div class="nn-btn-header">
            <button id="hide-note-btn"><i class="fas fa-minus"></i></button>
            <button id="add-note-btn"><i class="fas fa-plus"></i></button>
            <button id="rmv-note-btn"><i class="fas fa-trash"></i></button>
        </div>
        <div class="note" id="note" contenteditable="true"></div>
    `

    document.body.appendChild(newNote);

    document.getElementById('add-note-btn').addEventListener('click', () => {
        var newNoteText = document.getElementById('note').innerHTML;
        newNote.remove();
        isNewNoteOpen = false;
        addNewNote(newNoteText);
        document.getElementById('new-note-btn').style.visibility = 'visible';
    })

    document.getElementById('hide-note-btn').addEventListener('click', () => {
        isNewNoteOpen = false;
        newNote.remove();
        document.getElementById('new-note-btn').style.visibility = 'visible';
    })
    
    document.getElementById('rmv-note-btn').addEventListener('click', () => {
        console.log("remove note");
        document.getElementById('new-note-btn').style.visibility = 'visible';
    })
}) 

document.getElementById('delete-notes-btn').addEventListener('click', () => {
    if (confirm('Delete all notes?'))
    {
        console.log('deleting all notes...');
        localStorage.clear();
        localStorage.setItem('numberOfNotes', 0);
        displayNotes();
    }
})
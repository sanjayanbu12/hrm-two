import React, { useState } from 'react';
import styled from 'styled-components';
import { MdDelete, MdEdit } from 'react-icons/md';
import { IoIosAdd } from 'react-icons/io';
import SaveIcon from '@mui/icons-material/Save';

const Container = styled.div`
  * {
    padding: 20;
    margin: 20;
    box-sizing: border-box;
  }

  html {
    font-family: sans-serif;
  }

  body {
    background: #ffffff;
  }
`;

const Form = styled.form`
  position: relative;
  width: 600px;
  margin: 32px auto 50px auto;
  background: #fff;
  padding: 7px;
  border-radius: 7px;
  box-shadow: 0 1px 7px rgb(128, 128, 128);
`;

const FormInput = styled.input`
  width: 100%;
  border: none;
  padding: 4px 10px;
  margin-bottom: 20px;
  outline: none;
  font-size: 1rem;
  resize: none;
`;

const FormTextArea = styled.textarea`
  width: 100%;
  border: none;
  padding: 4px 10px;
  outline: none;
  font-size: 1rem;
  resize: none;
`;

const FormButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 18px;
  bottom: -18px;
  background: rgb(255, 200, 18);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  box-shadow: 0 1px 3px rgb(165, 165, 165);
  cursor: pointer;
  outline: none;
`;

const Note = styled.div`
  background: #ffffff;
  width: 240px;
  border-radius: 7px;
  box-shadow: 0 2px 5px rgb(175, 175, 175);
  padding: 10px;
  margin: 16px;
  float: left;
  margin-right: 0;
  margin-bottom: 20px;
  padding: 30px;
  position: relative;
`;

const EditButton = styled.button`
  position: relative;
  float: right;
  margin-right: 10px;
  color: #0074d9;
  border: none;
  background: none;
  cursor: pointer;
  outline: none;
`;

const EditableNote = styled(Note)`
  background: #f5f5f5;
`;

const NoteTitle = styled.h1`
  font-size: 1rem;
  margin-bottom: 6px;
`;

const NoteContent = styled.p`
  font-size: 1rem;
  color: #6f212b;
  margin-bottom: 10px;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const DeleteButton = styled.button`
  position: relative;
  float: right;
  color: #f88651;
  border: none;
  background: none;
  cursor: pointer;
  outline: none;
`;

const Count = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
`;

const CreateArea = ({ onAdd }) => {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: '',
    content: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setNote((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function handleExpanded() {
    setExpanded(true);
  }

  function submitButton(event) {
    onAdd(note);
    setNote({
      title: '',
      content: '',
    });
    event.preventDefault();
  }

  return (
    <Form>
      {isExpanded && (
        <FormInput
          value={note.title}
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />
      )}
      <p>
        <FormTextArea
          value={note.content}
          onClick={handleExpanded}
          name="content"
          placeholder="Take a note..."
          onChange={handleChange}
          rows={isExpanded ? 3 : 1}
        ></FormTextArea>
      </p>
      <FormButton onClick={submitButton}>
        <IoIosAdd size={35} />
      </FormButton>
    </Form>
  );
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  function addNote(newNote) {
    setNotes((prevValue) => {
      return [...prevValue, newNote];
    });
  }

  function deleteNotes(id) {
    setNotes((prevValue) => {
      return [...prevValue.filter((note, index) => index !== id)];
    });
  }

  function editNote(index) {
    setEditingIndex(index);
    setEditMode(true);
  }

  function saveEditedNote() {
    setEditingIndex(null);
    setEditMode(false);
  }

  return (
    <Container>
      <Count
        count={
          notes.length === 0 ? 'Empty' : `Showing ${notes.length} Notes in Database`
        }
      />
      <CreateArea onAdd={addNote} />
      {notes.map((note, index) => (
        <div key={index}>
          {editMode && editingIndex === index ? (
            <EditableNote>
              <FormInput
                value={note.title}
                type="text"
                placeholder="Title"
                name="title"
                onChange={(e) => {
                  const newNotes = [...notes];
                  newNotes[index].title = e.target.value;
                  setNotes(newNotes);
                }}
              />
              <FormTextArea
                value={note.content}
                name="content"
                placeholder="Edit your note..."
                onChange={(e) => {
                  const newNotes = [...notes];
                  newNotes[index].content = e.target.value;
                  setNotes(newNotes);
                }}
              />
              <FormButton onClick={saveEditedNote}>
                <SaveIcon/>
              </FormButton>
            </EditableNote>
          ) : (
            <Note>
              <NoteTitle>{note.title}</NoteTitle>
              <NoteContent>{note.content}</NoteContent>
              <EditButton onClick={() => editNote(index)}>
                <MdEdit size={25} /> Edit
              </EditButton>
              <DeleteButton onClick={() => deleteNotes(index)}>
                <MdDelete size={25} />
              </DeleteButton>
            </Note>
          )}
        </div>
      ))}
    </Container>
  );
};

export default App;

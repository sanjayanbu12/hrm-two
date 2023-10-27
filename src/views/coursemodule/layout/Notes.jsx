import React, { useState } from 'react';
import styled from 'styled-components';
import { MdDelete } from 'react-icons/md';
import { IoIosAdd } from 'react-icons/io';


const Container = styled.div`
  /* Global styles */
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
  /* Form styles */
  position: relative;
  width: 600px;
  margin: 32px auto 50px auto;
  background: #fff;
  padding: 7px;
  border-radius: 7px;
  box-shadow: 0 1px 7px rgb(128, 128, 128);
`;

const FormInput = styled.input`
  /* Form input styles */
  width: 100%;
  border: none;
  padding: 4px 10px;
  margin-bottom: 20px;
  outline: none;
  font-size: 1rem;
  resize: none;
`;

const FormTextArea = styled.textarea`
  /* Form textarea styles */
  width: 100%;
  border: none;
  padding: 4px 10px;
  outline: none;
  font-size: 1rem;
  resize: none;
`;

const FormButton = styled.button`
  /* Form button styles */
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
  /* Note styles */
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
`;

const NoteTitle = styled.h1`
  /* Note title styles */
  font-size: 1rem;
  margin-bottom: 6px;

`;

const NoteContent = styled.p`
  /* Note content styles */
  font-size: 1rem;
  color: #6f212b;
  margin-bottom: 10px;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const DeleteButton = styled.button`
  /* Delete button styles */
  position: relative;
  float: right;
  color: #f88651;
  border: none;
  background: none;
  cursor: pointer;
  outline: none;
`;

const Count = styled.div`
  /* Count styles */
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
    setNote(prevValue => {
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
    onAdd(note); // Call the onAdd function to add the note
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

  function addNote(newNote) {
    setNotes(prevValue => {
      return [...prevValue, newNote];
    });
  }

  function deleteNotes(id) {
    setNotes(prevValue => {
      return [...prevValue.filter((note, index) => index !== id)];
    });
  }

  return (
    <Container>
      
      <Count
        count={
          notes.length === 0 ? 'Empty' : `Showing ${notes.length} Notes in Database`
        }
      />
      <CreateArea  onAdd={addNote} />
      {notes.map((note, index) => (
        <Note  key={index} >
          <NoteTitle>{note.title}</NoteTitle>
          <NoteContent>{note.content}</NoteContent>
          <DeleteButton onClick={() => deleteNotes(index)}>
            <MdDelete size={25} />
          </DeleteButton>
        </Note>
       
      ))}
     
    </Container>
  );
};

export default App;

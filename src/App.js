import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';
import { v4 as uuidv4 } from 'uuid';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    type: '',
    msg: '',
  });

  const showAlert = (type = '', msg = '') => {
    setAlert({ type, msg });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // Display alert
      showAlert('danger', 'please enter value');
    } else if (name && isEditing) {
      // Deal with Edit
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert('success', 'item edited');
    } else {
      // Show alert
      showAlert('success', 'item added to the list');
      const newItem = { title: name, id: uuidv4() };
      setList([...list, newItem]);
      setName('');
    }
  };

  const clearList = () => {
    showAlert('success', 'list is empty');
    setList([]);
  };

  const removeItem = (id) => {
    showAlert('success', 'item removed');
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <>
      <section className='section-center'>
        {<Alert {...alert} removeAlert={showAlert} list={list} />}

        <form className='grocery-form' onSubmit={handleSubmit}>
          <h3>Grocery Bud</h3>

          <div className='form-control'>
            <input
              type='text'
              className='grocery'
              placeholder='e.g. milk'
              value={name}
              name='name'
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <button type='submit' className='submit-btn'>
              {isEditing ? 'edit' : 'submit'}
            </button>
          </div>
        </form>

        {list.length > 0 && (
          <div className='grocery-container'>
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <button className='clear-btn' onClick={clearList}>
              clear items
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default App;

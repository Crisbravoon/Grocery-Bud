
import React, { useState, useEffect } from 'react';
import Alert from './Alert';
import List from './List';
import './Grocery.css';


const getLocalState = () => {
    let list = localStorage.getItem('list');
    if (list) {
        return JSON.parse(localStorage.getItem('list'));
    }
    else {
        return [];
    }
};

const Grocery = () => {

    const [text, setText] = useState('');
    const [list, setList] = useState(getLocalState());
    const [edit, setEdit] = useState(false);
    const [editID, setEditID] = useState(null);
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });


    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list))
    }, [list]);

    const showAlert = (show = false, type = "", message = "",) => {
        setAlert({ show, type, message });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text) {
            showAlert(true, 'danger', 'Ingrese un Valor');
        }
        else if (text && edit) {
            setList(list.map((item) => {
                if (item.id === editID) {
                    return { ...item, title: text };
                }
                return item
            }))
            setText('');
            setEdit(false);
            setEditID(null);
            showAlert(true, 'success', 'Ha cambiado el Item');
        }
        else {
            const newItem = { id: new Date().getTime().toString(), title: text };
            showAlert(true, 'success', 'Ingreso Correctamente');
            setList([...list, newItem]);
            setText('');
        }
    };

    const clearList = () => {
        showAlert(true, 'danger', 'Listado Eliminado');
        setList([]);
    };

    const removeItem = (id) => {
        showAlert(true, 'danger', 'Item Eliminado');
        setList(list.filter((item) => item.id !== id));
    };

    const editItem = (id) => {
        const specificItem = list.find((item) => item.id === id);
        setEdit(true);
        setEditID(id);
        setText(specificItem.title);
    };

    return (
        <section className="section-center">
            <form className="grocery-form" onSubmit={handleSubmit} >
                {alert.show && <Alert {...alert} removeAlert={showAlert} List={list} />}
                <h3>Grocery Bud</h3>
                <div className="form-control">
                    <input
                        className='grocery'
                        placeholder='Huevo'
                        type='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button className="submit-btn" type='submit'>
                        {edit ? 'Editar' : 'Guardar'}
                    </button>
                </div>
            </form>
            {list.length > 0 && (
                <div className="grocery-container">
                    <List
                        items={list}
                        removeItem={removeItem}
                        editItem={editItem}
                    />
                    <button className='clear-btn' onClick={clearList}>Eliminar Listado</button>
                </div>
            )}
        </section>
    )
}

export default Grocery;

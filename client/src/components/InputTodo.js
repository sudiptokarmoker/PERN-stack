import React, { Fragment, useState } from 'react';

const InputTodo = () => {
    const [description, setDescription] = useState("");
    /**
     * on submit form
     */
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch("http://localhost:5000/todos",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            console.log(response);
        } catch (err) {
            
        }
    }
    return <Fragment>
        <h2 className="text-center mt-5">Pern todo practise</h2>
        <form className="d-flex" onSubmit={onSubmitForm}>
            <input className="form-control" type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <button className="btn btn-success">Add</button>
        </form>
    </Fragment>;
}

export default InputTodo;
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

type PropsType = {
    callBack: (title: string) => void
}

export const AddItemForm = (props: PropsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.callBack(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    return (
        <div>
            {/*<input value={title}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyPress={onKeyPressHandler}*/}
            {/*       className={error ? "error" : ""}*/}
            {/*/>*/}

            <TextField id="outlined-basic" label={error} variant="outlined" size={'small'}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
            />

            {/*backgroundColor: 'gray', opacity: 0.3,*/}
            <IconButton style={{ maxWidth: '15px', maxHeight: '15px', minWidth: '15px', minHeight: '15px' }} onClick={addTask}>
                <AddIcon/>
            </IconButton>



                {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
);
};


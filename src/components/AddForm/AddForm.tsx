import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import s from "./AddForm.module.css"

type AddFormPropsType = {
    callback: (title: string) => void,
    name: string,
}

export const AddForm = React.memo((props: AddFormPropsType) => {
    const {callback} = props
    const [value, setValue] = useState("");
    const [error, setError] = useState(false);


    const onClickHandler = () => {
        if (value.trim() !== "") {
            callback(value.trim());
            setValue("");
        }
        if (value === "") {
            setError(true);
        }
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onClickHandler()
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false);
        setValue(event.currentTarget.value);
    }

    return (
        <div className={s.main}>
            <TextField
                helperText={error && "Title is required"}
                error={error}
                label={"Title"}
                value={value}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}/>
            <div className={s.btn}>
                <IconButton onClick={onClickHandler}>
                    <AddCircleIcon color={"primary"}/>
                </IconButton>
            </div>
        </div>
    );
});

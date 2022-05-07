import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";;

export type EditableSpanPropsType = {
    name: string
    callback: (newTitle: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    const {name, callback} = props;

    const [spanOrInput, setSpanOrInput] = useState(false);
    const [value, setValue] = useState(name);

    const onDoubleClickHandler = () => {
        setSpanOrInput(true);
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    }

    const onBlurHandler = () => {
        callback(value);
        setSpanOrInput(false);
    }

    return (
        <>
            {spanOrInput ? <TextField
                variant={"standard"}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                value={value}
                autoFocus
            /> : <span onDoubleClick={onDoubleClickHandler}>{name}</span>}
        </>
    );
});
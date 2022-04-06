import React, {ChangeEvent, useState} from 'react';

type EditTableSpanType = {
    oldTitle: string
    callBack: (title:string) => void
}

export const EditTableSpan = (props: EditTableSpanType) => {

    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.oldTitle)

    const onDoubleClickHandler = () => {
        setEdit(true)
    }

    const onBlurHandler = () => {
        props.callBack(newTitle)
        setEdit(false)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        edit
            ? <input value={newTitle} onChange={onChangeHandler} autoFocus={true} onBlur={onBlurHandler}/>
            : <span onDoubleClick={onDoubleClickHandler}>{newTitle}</span>
    );
};


import React from 'react';

type propsButtonType = {
    name: string
    callBack: () => void
}

export const Button = (props: propsButtonType) => {

    const onClickHandler = () => {
        props.callBack()
    }

    return (
        <button onClick={onClickHandler}>{props.name}</button>
    );
};
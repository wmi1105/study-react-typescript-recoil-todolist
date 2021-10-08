import React from 'react';

interface propTypes {
    code : string,
    text : string,
}

function SelectOption({code, text}: propTypes) {

    return (
        <option value={code}>{text}</option>
    );
}

export default SelectOption;
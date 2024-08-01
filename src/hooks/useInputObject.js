import React, { useState } from "react";

function useInputObject(initialVal) {
    const [values, setValues] = useState(initialVal);

    const update = (index, key) => (e) => {
        const newValues = values.map((item, i) =>
            i === index ? { ...item, [key]: e.target.value } : item
        );
        setValues(newValues);
    };

    const reset = () => {
        setValues(initialVal);
    };

    return [values, update, reset];
}

export default useInputObject;

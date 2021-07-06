import React, {useState} from 'react';

function MyForm() {
    const [fields, setFields] = useState({
        name: ""
    })

    const handleChange = event => {
        console.log(event.target.value);
        setFields({name: event.target.value});
    }

    return (
        <div>
            <input value={fields.name} onChange={handleChange}/>
            <h3>{fields.name}</h3>
        </div>
    );
}
export default MyForm;
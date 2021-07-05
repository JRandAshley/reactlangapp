import React, {useState, useEffect} from 'react';

function ToolBar() {
    const [displayPhonemes, setDisplayPhonemes] = useState(false)
    return (
        <div>
            <button onClick={() => setDisplay(!display)}>
                Toggle Display
            </button>
            {display && <HookMouse />}       
        </div>
    );
}
export default ToolBar;
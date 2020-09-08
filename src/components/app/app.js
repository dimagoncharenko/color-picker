import React, { useState } from 'react';
import ColorPicker from '../color-picker';

import './app.scss';

const colors = [
    { name: 'red', hex: '#ff0000' },
    { name: 'yellow', hex: '#ffff00' },
    { name: 'green', hex: '#00ff00' },
    { name: 'blue', hex: '#0000ff' }
];

const App = () => {
    const [activeColor, setActiveColor] = useState('#ffcc33');

    const onColorChange = (hex) => {
        setActiveColor(hex);
    };

    return (
        <div className="app">
            <ColorPicker onChange={onColorChange} colors={colors} value={activeColor} />
        </div>
    )
};

export default App;
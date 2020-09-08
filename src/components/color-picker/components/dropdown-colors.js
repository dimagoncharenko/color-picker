import React, { useContext } from 'react';
import ColorItem from './color-item';
import { ColorPickerContext } from '../color-picker';

const DropdownColors = React.forwardRef((props, ref) => {
    const { colors } = useContext(ColorPickerContext);

    return (
        <div ref={ref} className="color-picker__dropdown dropdown-colors">
            <ul className="dropdown-colors__list">
                {colors.map(({ name, hex }) => <ColorItem key={hex} name={name} hex={hex} />)}
            </ul>
        </div>
    );
});


export default DropdownColors;
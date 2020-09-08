import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ColorPickerContext } from '../color-picker';

const ColorItem = ({ hex, name }) => {
    const { value: currentColor, onColorClick } = useContext(ColorPickerContext);

    return (
        <li className="dropdown-colors__item">
            <button
                className={classNames(
                    "color-btn dropdown-colors__btn",
                    { "color-btn--active": currentColor === hex })}
                onClick={() => onColorClick(hex)} >
                <span>{name}</span>
                <span
                    className="color-box color-btn__sample"
                    style={{ backgroundColor: hex }}
                />
            </button>
        </li>
    );
};

ColorItem.propTypes = {
    hex: PropTypes.string,
    name: PropTypes.string
};

export default ColorItem;
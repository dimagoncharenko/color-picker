import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { hexToRgb, rgbToHex, isOutsideClick } from '../../utils';
import DropdownColors from './components/dropdown-colors';
import DropdownSliders from './components/dropdown-sliders';

import 'react-rangeslider/lib/index.css';
import './color-picker.scss';

const ColorPickerContext = React.createContext();

const ColorPicker = ({ onChange, colors, value }) => {
    const { current: rgbValues } = useRef(hexToRgb(value));

    const [isColorsShow, setColorsShow] = useState(false);
    const [isSlidersShow, setSlidersShow] = useState(false);
    const [backupValue, setBackupValue] = useState(value);
    const [r, setR] = useState(rgbValues.r);
    const [g, setG] = useState(rgbValues.g);
    const [b, setB] = useState(rgbValues.b);

    const dropdownColorsNode = useRef(null);
    const dropdownSlidersNode = useRef(null);

    const sliders = [
        {
            name: 'r',
            className: 'slider--r',
            setRGBState: setR,
            value: r
        },
        {
            name: 'g',
            className: 'slider--g',
            setRGBState: setG,
            value: g
        },
        {
            name: 'b',
            className: 'slider--b',
            setRGBState: setB,
            value: b
        },
    ];

    const updateRGBState = (hex) => {
        setR(hexToRgb(hex).r);
        setB(hexToRgb(hex).b);
        setG(hexToRgb(hex).g);
    };

    const updateColorState = (hex) => {
        setBackupValue(hex);
        updateRGBState(hex);
        onChange(hex);
    };

    const onColorClick = (hex) => {
        updateColorState(hex);
        setColorsShow(false);
    };

    const onOkBtnClick = () => {
        updateColorState(value);
        setSlidersShow(false);
    };

    const onCancelBtnClick = () => {
        updateColorState(backupValue);
        setSlidersShow(false);
    };

    useEffect(() => {
        const onDocumentClick = (evt) => {
            if (isOutsideClick(dropdownColorsNode.current, evt.target)) {
                setColorsShow(false);
            }

            if (isOutsideClick(dropdownSlidersNode.current, evt.target)) {
                updateColorState(backupValue);
                setSlidersShow(false);
            }
        };

        document.addEventListener('mousedown', onDocumentClick);
        return () => {
            document.removeEventListener('mousedown', onDocumentClick);
        };
    });

    useEffect(() => {
        onChange(rgbToHex(r, g, b));
    }, [r, g, b, onChange]);

    const contextValues = {
        onColorClick, value, sliders, onOkBtnClick, onCancelBtnClick, colors
    };

    return (
        <ColorPickerContext.Provider value={contextValues}>
            <div className="color-picker">
                <div className="color-picker__row">
                    <div className="color-picker__item">
                        <span className="color-picker__hex">{value}</span>
                    </div>
                    <div className="color-picker__item">
                        <button
                            className="color-picker__btn"
                            onClick={() => setSlidersShow(true)}>
                            <span className="color-box" style={{ backgroundColor: value }}></span>
                        </button>
                        {isSlidersShow && <DropdownSliders ref={dropdownSlidersNode} />}
                    </div>
                    <div className="color-picker__item">
                        <button
                            className="color-picker__btn color-picker__btn--arrow"
                            onClick={() => setColorsShow(true)}
                        />
                        {isColorsShow && <DropdownColors ref={dropdownColorsNode} />}
                    </div>
                </div>
            </div>
        </ColorPickerContext.Provider >
    );
};

ColorPicker.propTypes = {
    onChange: PropTypes.func,
    colors: PropTypes.array,
    value: PropTypes.string
};

export {
    ColorPickerContext
};

export default ColorPicker;
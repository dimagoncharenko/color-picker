import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-rangeslider';

const SliderItem = ({ value, setRGBState, name, className }) => {
    return (
        <div className={`slider ${className}`}>
            <span className="slider__name">{name}</span>
            <Slider
                min={0}
                max={255}
                step={1}
                tooltip={false}
                value={value}
                onChange={setRGBState}
            />
        </div>
    );
};

SliderItem.propTypes = {
    value: PropTypes.number,
    setState: PropTypes.func,
    name: PropTypes.string,
    className: PropTypes.string
};

export default SliderItem;
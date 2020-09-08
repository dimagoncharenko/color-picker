import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ColorPickerContext } from '../color-picker';
import SliderItem from './slider-item';

const DropdownSliders = React.forwardRef((props, ref) => {
    const { onCancelBtnClick, onOkBtnClick, sliders } = useContext(ColorPickerContext);

    const sliderItems = sliders.map(slider => <SliderItem key={slider.name} {...slider} />);

    return (
        <div ref={ref} className="color-picker__dropdown dropdown-slider">
            {sliderItems}
            <div className="dropdown-slider__btn-wrapper">
                <button onClick={onCancelBtnClick} className="btn btn--grey">Cancel</button>
                <button onClick={onOkBtnClick} className="btn btn--green">Ok</button>
            </div>
        </div>
    );
});

DropdownSliders.propTypes = {
    sliders: PropTypes.array,
    onCancelBtnClick: PropTypes.func,
    onOkBtnClick: PropTypes.func
};

export default DropdownSliders;
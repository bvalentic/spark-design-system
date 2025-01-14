import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class SprkStepperSlider extends Component {
  render() {
    const {
      title,
      contents,
      sliderStyle,
    } = this.props;

    return (
      <li className={classnames(
        'sprk-c-Stepper__slider',
        'sprk-c-Stepper__slider--active',
        )}
        style={sliderStyle}
      >
        <div className='sprk-c-Stepper__step-content sprk-c-Stepper__step-content--has-description' >
          <span className="sprk-c-Stepper__step-header sprk-b-Link sprk-b-Link--plain" >
            <span className="sprk-c-Stepper__step-icon sprk-u-Visibility--hidden" />
            <h3 className="sprk-c-Stepper__step-heading" >
              {title}
            </h3>
          </span>

          <div className="sprk-c-Stepper__step-description" >
            <p className="sprk-b-TypeBodyTwo">
              {contents}
            </p>
          </div>
        </div>
      </li>
    );
  };
}

SprkStepperSlider.propTypes = {
  // The title text for the slider
  title: PropTypes.string,
  // The contents text for the slider
  contents: PropTypes.string,
  // An object representing the style properties of this component.
  sliderStyle: PropTypes.shape({
    top: PropTypes.number,
  }),
};

export default SprkStepperSlider;

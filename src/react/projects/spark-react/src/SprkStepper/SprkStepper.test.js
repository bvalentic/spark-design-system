import React from 'react';
import Enzyme, { mount } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import '../windowStubs';
import SprkStepper from './SprkStepper';
import SprkStepperStep from './components/SprkStepperStep/SprkStepperStep';

Enzyme.configure({ adapter: new Adapter() });

// Root Element Tests
it('should display a stepper element with the correct base class', () => {
  const wrapper = mount(
    <SprkStepper>
      <SprkStepperStep />
      <SprkStepperStep />
    </SprkStepper>,
  );
  expect(wrapper.find('ol.sprk-c-Stepper').length).toBe(1);
});

it('should correctly apply additional classes', () => {
  const expected = 'expected_class';
  const wrapper = mount(
    <SprkStepper additionalClasses={expected}>
      <SprkStepperStep />
      <SprkStepperStep />
    </SprkStepper>,
  );

  expect(wrapper.find('ol.sprk-c-Stepper').hasClass(expected)).toBe(true);
});

it('should correctly apply bookend classes', () => {
  const wrapper = mount(
    <SprkStepper>
      <SprkStepperStep />
      <SprkStepperStep />
      <SprkStepperStep />
    </SprkStepper>,
  );

  expect(wrapper.find('li.sprk-c-Stepper__step').length).toBe(3);
  expect(
    wrapper
      .find('li.sprk-c-Stepper__step')
      .first()
      .hasClass('sprk-c-Stepper__step--first'),
  ).toBe(true);

  expect(
    wrapper
      .find('li.sprk-c-Stepper__step')
      .last()
      .hasClass('sprk-c-Stepper__step--last'),
  ).toBe(true);
});

it('should ignore non-step children', () => {
  const wrapper = mount(
    <SprkStepper>
      <SprkStepperStep />
      <SprkStepperStep />
      <div id="foo" />
    </SprkStepper>,
  );

  expect(wrapper.find('div#foo').length).toBe(0);
});

it('should correctly advance and overflow the selected item with keyboard', () => {
  const wrapper = mount(
    <SprkStepper>
      <SprkStepperStep />
      <SprkStepperStep />
      <SprkStepperStep isSelected />
    </SprkStepper>,
  );

  const lastStep = wrapper.find('li.sprk-c-Stepper__step--last');

  expect(wrapper.state().activeStepId).toBe(lastStep.prop('id'));

  const eventObj = {
    keyCode: 39,
    preventDefault() {},
  };

  // call the key handle function with eventObj
  wrapper.instance().handleKeyEvents(eventObj);

  const firstStep = wrapper.find('li.sprk-c-Stepper__step--first');
  expect(wrapper.state().activeStepId).toBe(firstStep.prop('id'));
});

it('should not change state for unexpected keypresses', () => {
  const wrapper = mount(
    <SprkStepper>
      <SprkStepperStep isSelected />
      <SprkStepperStep />
      <SprkStepperStep />
    </SprkStepper>,
  );

  const firstStep = wrapper.find('li.sprk-c-Stepper__step--first');

  expect(wrapper.state().activeStepId).toBe(firstStep.prop('id'));

  const eventObj = {
    keyCode: 11,
    preventDefault() {},
  };

  // call the key handle function with eventObj
  wrapper.instance().handleKeyEvents(eventObj);

  expect(wrapper.state().activeStepId).toBe(firstStep.prop('id'));
});

it('should call step callback function', () => {
  const expectedFunc = sinon.spy();
  const wrapper = mount(
    <SprkStepper>
      <SprkStepperStep />
      <SprkStepperStep additionalClasses='foo' onClick={expectedFunc} />
      <SprkStepperStep />
    </SprkStepper>,
  );

  const step = wrapper.find('li.foo');

  step.simulate('click');

  expect(expectedFunc.called).toBe(true);
});

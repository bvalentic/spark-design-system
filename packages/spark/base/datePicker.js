/* global window */
import getElements from '../utilities/getElements';

const setupTDP = (input, config) => {
  const tdpConfig = {
    mode: 'dp-below',
    lang: {
      days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    },
    min: '01/1/2008',
    max: '01/1/2068',
    format: date => date.toLocaleDateString('en-US',
      { month: '2-digit', day: '2-digit', year: 'numeric' })
      .replace(/[^ -~]/g, ''),
  };

  dp.on('select', () => {
    input.dispatchEvent(new window.Event('input'));
    input.focus();
  });
};

const bindUIEvents = (element, config) => {
  const input = element.querySelector('input');
  setupTDP(input, config);
};

export { bindUIEvents };

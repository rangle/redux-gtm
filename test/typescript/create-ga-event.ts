import { createGAevent } from '../../index.d';

createGAevent();

createGAevent({
  eventAction: 'action',
  eventCategory: 'category',
  eventLabel: 'label',
  eventValue: 'value',
});

import { EventHelpers } from '../../index.d';

EventHelpers.createGAevent();

EventHelpers.createGAevent({
  eventAction: 'action',
  eventCategory: 'category',
  eventLabel: 'label',
  eventValue: 'value',
});

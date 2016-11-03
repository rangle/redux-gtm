import { emitGAevent } from '../../index.d';

emitGAevent();

emitGAevent({ 
    eventAction: 'action',
    eventCategory: 'category',
    eventLabel: 'label',
    eventValue: 'value',
});

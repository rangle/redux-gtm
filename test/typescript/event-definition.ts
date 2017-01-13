import { EventDefinition } from '../../index.d';

const isString = (value: any) => typeof value === 'string';

const eventDefinition: EventDefinition = {
  eventName: 'page-view',
  eventFields: (prevState, action) => ({
    route: action.payload.location.pathname,
  }),
  eventSchema: {
    event: isString,
    route: isString,
  }
}

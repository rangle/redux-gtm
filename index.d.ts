// Type definitions for redux-gtm
// Project: https://github.com/rangle/redux-gtm

export interface EventSchema {
  [key: string]: (eventFieldValue: any) => boolean;
}

/**
 * Used by ReduxGTM to generate an event for a given Redux action.
 *
 * eventName
 * Use this property to specify the name of the event you want to emit
 * for the associated Redux action. If not provided, the event name
 * defaults to the Redux action type.
 *
 * eventFields
 * Attach a function to this property to define any variables you
 * would like to emit with the event. Any function assigned to this
 * property will receive the state of the application, and the
 * associated action object. Any properties in the object returned by
 * the attached function will be emitted along with the event.
 *
 * eventSchema
 * Use this property to define a schema for the event. Attach
 * validation functions for each property in the event that you want
 * to validate. If any of these validation functions return false, the
 * event will not be emitted.
 */
export interface EventDefinition {
  eventName?: string;
  eventFields? (prevState: any, action: any): any;
  eventSchema?: EventSchema;
}

/**
 * A map between your Redux actions and your analytics events.  Each
 * key must be a Redux action type.
 */
export interface EventDefinitionsMap {
  [key: string]: EventDefinition;
}

/**
 * Create Redux middleware that synchronizes actions to Google Tag Manager events.
 */
export function createMiddleware(eventDefinitions: EventDefinitionsMap, dataLayer?: any): any;

/**
 * Create a meta reducer that synchronizes actions to Google Tag Manager events.
 */
export function createMetaReducer(eventDefinitions: EventDefinitionsMap, dataLayer?: any): any;

export interface GAeventProperties {
  eventAction?: string,
  eventCategory?: string,
  eventLabel?: string,
  eventValue?: string,
}

/**
 * Emit an event to Google Analtyics.
 * Use with the ga-starter-container
 */
export function emitGAevent(eventProps?: GAeventProperties): any;
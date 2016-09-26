declare module ICAL {

    export function parse(data: string): any[];

    export abstract class Property {
        /**
         * The value type for this property
         * @readonly
         * @type {String}
         */
        type: string;
        /**
         * The name of this property, in lowercase.
         * @readonly
         * @type {String}
         */
        name: string;

        /**
         * The parent component for this property.
         * @type {ICAL.Component}
         */
        parent: Component;

        parent(p: Component);


        /**
         * Gets a parameter on the property.
         *
         * @param {String}        name   Property name (lowercase)
         * @return {Array|String}        Property value
         */
        getParameter(name: string): any;

        /**
         * Sets a parameter on the property.
         *
         * @param {String}       name     The parameter name
         * @param {Array|String} value    The parameter value
         */
        setParameter(name: string, value: any);

        /**
         * Removes a parameter
         *
         * @param {String} name     The parameter name
         */
        removeParameter(name: string);

        /**
         * Get the default type based on this property's name.
         *
         * @return {String}     The default type for this property
         */
        getDefaultType(): string;

        /**
         * Sets type of property and clears out any existing values of the current
         * type.
         *
         * @param {String} type     New iCAL type (see design.*.values)
         */
        resetType(type: string);

        /**
         * Finds the first property value.
         *
         * @return {String}         First property value
         */
        getFirstValue(): string;

        /**
         * Gets all values on the property.
         *
         * NOTE: this creates an array during each call.
         *
         * @return {Array}          List of values
         */
        getValues(): any[];

        /**
         * Removes all values from this property
         */
        removeAllValues();

        /**
         * Sets the values of the property.  Will overwrite the existing values.
         * This can only be used for multi-value properties.
         *
         * @param {Array} values    An array of values
         */
        setValues(values: any[]);

        /**
         * Sets the current value of the property. If this is a multi-value
         * property, all other values will be removed.
         *
         * @param {String|Object} value     New property value.
         */
        setValue(value: any);

        /**
         * Returns the Object representation of this component. The returned object
         * is a live jCal object and should be cloned if modified.
         * @return {Object}
         */
        toJSON(): JSON;

        /**
         * The string representation of this component.
         * @return {String}
         */
        toICALString(): string;

        /**
         * Create an {@link ICAL.Property} by parsing the passed iCalendar string.
         *
         * @param {String} str                        The iCalendar string to parse
         * @param {ICAL.design.designSet=} designSet  The design data to use for this property
         * @return {ICAL.Property}                    The created iCalendar property
         */
        fromString(str, designSet): Property;

    }

    export abstract class Component {

        constructor(jcalData: any);

        /**
         * The name of this component
         */
        name: string;

        /**
         * Finds first sub component, optionally filtered by name.
         *
         * @param {String=} name        Optional name to filter by
         * @return {?ICAL.Component}     The found subcomponent
         */
        getFirstSubcomponent(name: string): Component;

        /**
         * Finds all sub components, optionally filtering by name.
         *
         * @param {String=} name            Optional name to filter by
         * @return {ICAL.Component[]}       The found sub components
         */
        getAllSubcomponents(name: string): Component[];

        /**
         * Returns true when a named property exists.
         *
         * @param {String} name     The property name
         * @return {Boolean}        True, when property is found
         */
        hasProperty(name: string): boolean;

        /**
         * Finds the first property, optionally with the given name.
         *
         * @param {String=} name        Lowercase property name
         * @return {?ICAL.Property}     The found property
         */
        getFirstProperty(name: string): Property ;

        /**
         * Returns first property's value, if available.
         *
         * @param {String=} name    Lowercase property name
         * @return {?String}        The found property value.
         */
        getFirstPropertyValue(name: string): string;

        /**
         * Get all properties in the component, optionally filtered by name.
         *
         * @param {String=} name        Lowercase property name
         * @return {ICAL.Property[]}    List of properties
         */
        getAllProperties(name: string): Property[];

        /**
         * Adds a single sub component.
         *
         * @param {ICAL.Component} component        The component to add
         * @return {ICAL.Component}                 The passed in component
         */
        addSubcomponent(component: Component): Component;

        /**
         * Removes a single component by name or the instance of a specific
         * component.
         *
         * @param {ICAL.Component|String} nameOrComp    Name of component, or component
         * @return {Boolean}                            True when comp is removed
         */
        removeSubcomponent(nameOrComp: any): boolean;


        /**
         * Removes all components or (if given) all components by a particular
         * name.
         *
         * @param {String=} name            Lowercase component name
         */
        removeAllSubcomponents(name: string);

        /**
         * Adds an {@link ICAL.Property} to the component.
         *
         * @param {ICAL.Property} property      The property to add
         * @return {ICAL.Property}              The passed in property
         */
        addProperty(property: Property): Property ;

        /**
         * Helper method to add a property with a value to the component.
         *
         * @param {String}               name         Property name to add
         * @param {String|Number|Object} value        Property value
         * @return {ICAL.Property}                    The created property
         */
        addPropertyWithValue(name, value): Property;

        /**
         * Helper method that will update or create a property of the given name
         * and sets its value. If multiple properties with the given name exist,
         * only the first is updated.
         *
         * @param {String}               name         Property name to update
         * @param {String|Number|Object} value        Property value
         * @return {ICAL.Property}                    The created property
         */
        updatePropertyWithValue(name, value): Property;

        /**
         * Removes a single property by name or the instance of the specific
         * property.
         *
         * @param {String|ICAL.Property} nameOrProp     Property name or instance to remove
         * @return {Boolean}                            True, when deleted
         */
        removeProperty(nameOrProp): boolean;

        /**
         * Removes all properties associated with this component, optionally
         * filtered by name.
         *
         * @param {String=} name        Lowercase property name
         * @return {Boolean}            True, when deleted
         */
        removeAllProperties(name): boolean;

        /**
         * Returns the Object representation of this component. The returned object
         * is a live jCal object and should be cloned if modified.
         * @return {Object}
         */
        toJSON(): JSON;

        /**
         * The string representation of this component.
         * @return {String}
         */
        toString(): string;

        /**
         * Create an {@link ICAL.Component} by parsing the passed iCalendar string.
         *
         * @param {String} str        The iCalendar string to parse
         */
        fromString(str): Component;
    }

    export class Event {

        constructor(vevent: Component);

        /**
         * List of related event exceptions.
         *
         * @type {ICAL.Event[]}
         */
        exceptions: any;

        /**
         * When true, will verify exceptions are related by their UUID.
         *
         * @type {Boolean}
         */
        strictExceptions: boolean;

        /**
         * Relates a given event exception to this object.  If the given component
         * does not share the UID of this event it cannot be related and will throw
         * an exception.
         *
         * If this component is an exception it cannot have other exceptions
         * related to it.
         *
         * @param {ICAL.Component|ICAL.Event} obj       Component or event
         */
        relateException(obj: Component|Event) ;

        /**
         * Checks if this record is an exception and has the RANGE=THISANDFUTURE
         * value.
         *
         * @return {Boolean}        True, when exception is within range
         */
        modifiesFuture(): boolean;

        /**
         * Finds the range exception nearest to the given date.
         *
         * @param {ICAL.Time} time usually an occurrence time of an event
         * @return {?ICAL.Event} the related event/exception or null
         */
        findRangeException(time): Event;

        /**
         * This object is returned by {@link ICAL.Event#getOccurrenceDetails getOccurrenceDetails}
         *
         * @typedef {Object} occurrenceDetails
         * @memberof ICAL.Event
         * @property {ICAL.Time} recurrenceId       The passed in recurrence id
         * @property {ICAL.Event} item              The occurrence
         * @property {ICAL.Time} startDate          The start of the occurrence
         * @property {ICAL.Time} endDate            The end of the occurrence
         */

        /**
         * Returns the occurrence details based on its start time.  If the
         * occurrence has an exception will return the details for that exception.
         *
         * NOTE: this method is intend to be used in conjunction
         *       with the {@link ICAL.Event#iterator iterator} method.
         *
         * @param {ICAL.Time} occurrence time occurrence
         * @return {ICAL.Event.occurrenceDetails} Information about the occurrence
         */
        getOccurrenceDetails: any;

        /**
         * Builds a recur expansion instance for a specific point in time (defaults
         * to startDate).
         *
         * @param {ICAL.Time} startTime     Starting point for expansion
         * @return {ICAL.RecurExpansion}    Expansion object
         */
        iterator(startTime);

        /**
         * Checks if the event is recurring
         *
         * @return {Boolean}        True, if event is recurring
         */
        isRecurring();

        /**
         * Checks if the event describes a recurrence exception. See
         * {@tutorial terminology} for details.
         *
         * @return {Boolean}    True, if the even describes a recurrence exception
         */
        isRecurrenceException(): boolean;

        /**
         * Returns the types of recurrences this event may have.
         *
         * Returned as an object with the following possible keys:
         *
         *    - YEARLY
         *    - MONTHLY
         *    - WEEKLY
         *    - DAILY
         *    - MINUTELY
         *    - SECONDLY
         *
         * @return {Object.<ICAL.Recur.frequencyValues, Boolean>}
         *          Object of recurrence flags
         */
        getRecurrenceTypes();

        /**
         * The uid of this event
         * @type {String}
         */
        uid: string;

        uid(value: string);

        /**
         * The start date
         * @type {ICAL.Time}
         */
        startDate;

        startDate(value);

        /**
         * The end date. This can be the result directly from the property, or the
         * end date calculated from start date and duration.
         * @type {ICAL.Time}
         */
        endDate;

        endDate(value);

        /**
         * The duration. This can be the result directly from the property, or the
         * duration calculated from start date and end date.
         * @type {ICAL.Duration}
         * @readonly
         */
        duration;

        /**
         * The location of the event.
         * @type {String}
         */
        location: string;

        location(value: string);

        /**
         * The attendees in the event
         * @type {ICAL.Property[]}
         * @readonly
         */
        attendees: Property[];


        /**
         * The event summary
         * @type {String}
         */
        summary: string;

        summary(value: string);

        /**
         * The event description.
         * @type {String}
         */
        description: string;

        description(value: string);

        /**
         * The organizer value as an uri. In most cases this is a mailto: uri, but
         * it can also be something else, like urn:uuid:...
         * @type {String}
         */
        organizer: string;

        organizer(value: string) ;

        /**
         * The sequence value for this event. Used for scheduling
         * see {@tutorial terminology}.
         * @type {Number}
         */
        sequence: number;

        sequence(value: number);

        /**
         * The recurrence id for this event. See {@tutorial terminology} for details.
         * @type {ICAL.Time}
         */
        recurrenceId;

        recurrenceId(value);


        /**
         * The string representation of this event.
         * @return {String}
         */
        toString(): string;

        compareRangeException(a, b): number;

    }
}

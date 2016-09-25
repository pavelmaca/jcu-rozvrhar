declare module ICAL {

    export function parse(data: string): any[];

    export interface Property {
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
        getParameter (name: string): any;

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

    export interface Component {

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
        removeAllSubcomponents (name: string);

        /**
         * Adds an {@link ICAL.Property} to the component.
         *
         * @param {ICAL.Property} property      The property to add
         * @return {ICAL.Property}              The passed in property
         */
        addProperty (property: Property): Property ;
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
        updatePropertyWithValue (name, value): Property;

        /**
         * Removes a single property by name or the instance of the specific
         * property.
         *
         * @param {String|ICAL.Property} nameOrProp     Property name or instance to remove
         * @return {Boolean}                            True, when deleted
         */
        removeProperty (nameOrProp): boolean;

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
        toString (): string;

        /**
         * Create an {@link ICAL.Component} by parsing the passed iCalendar string.
         *
         * @param {String} str        The iCalendar string to parse
         */
        fromString (str): Component;
    }
}

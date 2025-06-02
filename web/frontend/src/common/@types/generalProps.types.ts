/**
 * @description: This file contains the types that are used in the generalProps file
 */

/**
 * @type {ComponentHasParentHandler}
 * @description: This type is used to define the parentHandler of a component
 * @property {T} parentHandler - The parentHandler of the
 * @example ```tsx
 * export interface BusinessSelectorTableParentHandler {
 *  onSelectHandler: (itemId: string) => void;
 * }
 *
 * export interface BusinessSelectorTableProps extends ComponentHasParentHandler<BusinessSelectorTableParentHandler> {
 *  businessItems: string[];
 * }
 * ````
 */
export interface ComponentHasParentHandler<T> {
  parentHandler: T;
}

/**
 * Main JS for GCV.
 */

//  Import CSS.
import './editor.scss';

/**
 * External dependencies
 */
import { assign } from 'lodash';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { getWrapperDisplayName } = wp.element;
const { addFilter } = wp.hooks;
const { TextControl } = wp.components;

/**
 * Internal dependencies
 */
const { hasBlockSupport } = wp.blocks;
const { InspectorControls } = wp.blocks;

/**
 * Filters registered block settings, extending attributes with anchor using ID
 * of the first node.
 *
 * @param {Object} settings Original block settings.
 *
 * @return {Object} Filtered block settings.
 */
export function addAttribute( settings ) {

	settings.attributes = assign( settings.attributes, {
		gcvVisibility: {
			type: 'string',
		},
	} );

	return settings;
}

/**
 * Override the default edit UI to include a new block inspector control for
 * assigning the custom class name, if block supports custom class name.
 *
 * @param {function|Component} BlockEdit Original component.
 *
 * @return {string} Wrapped component.
 */
export function withInspectorControl( BlockEdit ) {

	const WrappedGCV = ( props ) => {

		return [
			<BlockEdit key="block-edit-visibility" { ...props } />,
			props.isSelected && <InspectorControls key="inspector-visibility">
				<TextControl
					label={ __( 'Block Visibility' ) }
					value={ props.attributes.gcvVisibility || '' }
					onChange={ ( nextValue ) => {
						props.setAttributes( {
							gcvVisibility: nextValue,
						} );
					} }
				/>
			</InspectorControls>,
		];

	};

	WrappedGCV.displayName = getWrapperDisplayName( BlockEdit, 'gcvVisibility' );

	return WrappedGCV;

}

/**
 * Override props assigned to save component to inject anchor ID, if block
 * supports anchor. This is only applied if the block's save result is an
 * element and not a markup string.
 *
 * @param {Object} extraProps Additional props applied to save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Current block attributes.
 *
 * @return {Object} Filtered props applied to save element.
 */
export function addSaveProps( extraProps, blockType, attributes ) {

	extraProps.gcvVisibility = attributes.gcvVisibility;
	// if ( hasBlockSupport( blockType, 'customClassName', true ) && attributes.gcvVisibility ) {
		// extraProps.gcvVisibility = attributes.gcvVisibility;
	// }
	// extraProps.gcvVisibility = extraProps.gcvVisibility;
	// extraProps.gcvVisibility = classnames( extraProps.gcvVisibility, attributes.gcvVisibility );
	return extraProps;
}

addFilter( 'blocks.registerBlockType', 'gcv/attribute', addAttribute );
addFilter( 'blocks.BlockEdit', 'gcv/inspector-control', withInspectorControl, 5 );
addFilter( 'blocks.getSaveContent.extraProps', 'gcv/save-props', addSaveProps );

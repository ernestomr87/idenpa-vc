import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createReducer from '../reducers';

function getInjectors(store) {
	return {
		injectReducer(key, reducer) {
			if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer) {
				return;
			}

			store.injectedReducers[key] = reducer;
			store.replaceReducer(createReducer(store.injectedReducers));
		}
	};
}

export default ({ key, reducer }) => (WrappedComponent) => {
	return class ReducerInjector extends Component {
		static contextTypes = {
			store: PropTypes.object.isRequired
		};

		injectors = getInjectors(this.context.store);

		componentWillMount() {
			const { injectReducer } = this.injectors;
			injectReducer(key, reducer);
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	};
};

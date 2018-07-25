import React, { Component } from 'react';
import PropTypes from 'prop-types';

function getInjectors(store) {
  return {
    injectSaga(key, saga, daemon = false) {
      const hasSaga = Reflect.has(store.injectedSagas, key);

      if (!hasSaga || (hasSaga && !daemon)) {
        store.injectedSagas[key] = { task: store.runSaga(saga), daemon };
      }
    },

    ejectSaga(key) {
      const descriptor = store.injectedSagas[key];

      if (descriptor && !descriptor.daemon) {
        descriptor.task.cancel();
      }
    },
  };
}

export default ({ key, saga }) => WrappedComponent =>
  class SagaInjector extends Component {
    static contextTypes = {
      store: PropTypes.object.isRequired,
    };

    injectors = getInjectors(this.context.store);

    componentWillMount() {
      const { injectSaga } = this.injectors;
      injectSaga(key, saga);
    }

    componentWillUnmount() {
      const { ejectSaga } = this.injectors;
      ejectSaga(key);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

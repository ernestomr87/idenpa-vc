import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import 'antd/dist/antd.css';
import './globalStyles';
import './react-geo.css';
import 'antd-iconfont/iconfont.css';
import enUS from 'antd/lib/locale-provider/en_US';
import { IntlProvider } from 'react-intl';

import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';

const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<IntlProvider locale="en">
				<LocaleProvider locale={enUS}>
					<App />
				</LocaleProvider>
			</IntlProvider>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

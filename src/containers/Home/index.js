import Loadable from 'react-loadable';

export default Loadable({
	loader: () => import('./home'),
	loading: () => null
});

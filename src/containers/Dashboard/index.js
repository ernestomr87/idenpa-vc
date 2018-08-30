import Loadable from 'react-loadable';

export default Loadable({
	loader: () => import('./dashboard'),
	loading: () => null
});

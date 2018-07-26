import Loadable from 'react-loadable';

export default Loadable({
	loader: () => import('./landing'),
	loading: () => null
});

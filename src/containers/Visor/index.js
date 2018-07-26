import Loadable from 'react-loadable';

export default Loadable({
	loader: () => import('./visor'),
	loading: () => null
});

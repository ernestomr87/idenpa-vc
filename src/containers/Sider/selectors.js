import { createSelector } from 'reselect';

const selectSiderDomain = () => (state) => state.sider;

const makeSelectSider = () =>
	createSelector(selectSiderDomain(), (substate) => {
		if (!substate) return undefined;
		return substate;
	});

export default selectSiderDomain;
export { makeSelectSider };

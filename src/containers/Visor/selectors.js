import { createSelector } from 'reselect';

const selectVisorDomain = () => (state) => state.visor;

const makeSelectVisor = () =>
	createSelector(selectVisorDomain(), (substate) => {
		if (!substate) return undefined;
		return substate;
	});

export default selectVisorDomain;
export { makeSelectVisor };

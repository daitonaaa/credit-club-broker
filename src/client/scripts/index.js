import metrikaInit from './metrika';

export default () => {
	if (process.env.BUILD_MODE === 'production') {
		metrikaInit();
	}
};

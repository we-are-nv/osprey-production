import { SafePipe } from './pages/services/safe.pipe';

describe('SafePipe', () => {
	it('create an instance', () => {
		const pipe = new SafePipe();
		expect(pipe).toBeTruthy();
	});
});

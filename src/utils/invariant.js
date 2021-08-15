// A way to provide descriptive errors in critical code paths.
export default function invariant(condition, message) {
	if (!condition) {
		throw new Error(`Invariant Violation: ${message}`);
	}
}

// Logs a warning if the condition is not met. This is used to log issues in development
// environments in critical paths. Not logging warnings for production environments keeps
// the same logic and follows the same code paths.
export default function warning(condition, message) {
	if (__DEV__ && !condition) {
		// We want to show a warning without altering program flow. To do this, we'll use
		// console.warn. Since this warning will never appear in production, it's a safe
		// place to use a console method, hence we ignore the warning from the linter about
		// not using console statements.

		// eslint-disable-next-line no-console
		console.warn(`Warning: ${message}`);
	}
}

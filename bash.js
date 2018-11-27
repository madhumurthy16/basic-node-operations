process.stdout.write('Prompt >');
process.stdin.on('data', (data) => {
	const cmd = data.toString().trim();
	process.stdout.write('You typed: ' + cmd);
	process.stdout.write('\nPrompt >');
});
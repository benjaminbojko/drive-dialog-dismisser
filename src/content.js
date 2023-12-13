import chalk from 'chalk';

const rootNode = document.body;
const config = { attributes: false, childList: true, subtree: false };
const options = {
	logToConsole: true,
	roles: new Set(['alertdialog', 'dialog']),
	headings: new Set(['Create in a shared folder?', 'Change who has access?'])
};

const debugLog = (...args) => {
	if (options.logToConsole) {
		console.log(...args);
	}
}

const mutationCallback = (mutationList, observer) => {
  for (const mutation of mutationList) {
		for (const addedNode of mutation.addedNodes) {
			try {
				if (!options.roles.has(addedNode.role)) {
					continue;
				}
				
				const heading = addedNode.querySelector('[role="heading"]').innerText;
				
				if (!options.headings.has(heading)) {
					continue;
				}
				
				const confirmButton = addedNode.querySelector('button[name="ok"]');
				confirmButton.click();
				debugLog(`Confirmed dialog: ${chalk.green(heading)}`);
			} catch (error) {
				debugLog(`Error: `, chalk.red(error));
			}
		}
  }
};

const observer = new MutationObserver(mutationCallback);
observer.observe(rootNode, config);

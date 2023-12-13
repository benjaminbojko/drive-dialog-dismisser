import chalk from 'chalk';

// Select the node that will be observed for mutations
const rootNode = document.body;

// Options for the observer (which mutations to observe)
const config = { attributes: false, childList: true, subtree: false };

const nodeRoles = new Set(['alertdialog', 'dialog']);
const nodeHeadings = new Set(['Create in a shared folder?', 'Change who has access?']);

// Callback function to execute when mutations are observed
const mutationCallback = (mutationList, observer) => {
  for (const mutation of mutationList) {
		for (const addedNode of mutation.addedNodes) {
			try {
				if (!nodeRoles.has(addedNode.role)) {
					continue;
				}
				
				const heading = addedNode.querySelector('[role="heading"]').innerText;
				
				if (!nodeHeadings.has(heading)) {
					continue;
				}
				
				const confirmButton = addedNode.querySelector('button[name="ok"]');
				confirmButton.click();
				console.log(chalk.bgBlack(chalk.green(`Confirmed alert: "${heading}"`)));
			} catch (error) {
				console.log(chalk.bgBlack(chalk.red(error)));
			}
		}
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(mutationCallback);

// Start observing the target node for configured mutations
observer.observe(rootNode, config);

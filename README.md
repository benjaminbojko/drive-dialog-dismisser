# Drive Dialog Dismisser

Chrome Extension to auto dismiss Google Drive confirmation dialogs for sharing permissions.

Built with https://github.com/crxjs/chrome-extension-tools.

Listens to DOM changes via `MutationObserver` and automatically dimisses dialogs that match specific `role` attributes and text content.

## Todos

[] Options page to expose current dialog roles and headers
[] Animate icon when a dialog is dimissed
[] Add inline button to DOM to auto-dismiss dialogs

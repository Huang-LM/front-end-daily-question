import * as vscode from "vscode";
import * as path from "path";
// import * as tempy from "tempy";
// import * as fs from "fs";
// import * as queryString from "query-string";
// import * as execa from "execa";
// const SAVE_DIRECTORY = tempy.directory();

// const FULL_DOWNLOADED_PATH = `${SAVE_DIRECTORY}/shareImg.png`;

export function webViewPanel(context: vscode.ExtensionContext, code: string) {
	// 1. 使用 createWebviewPanel 创建一个 panel，然后给 panel 放入 html 即可展示 web view
	const panel = vscode.window.createWebviewPanel(
		"shareWeb",
		"shareCode",
		vscode.ViewColumn.One, // web view 显示位置
		{
			enableScripts: true, // 允许 JavaScript
			retainContextWhenHidden: true, // 在 hidden 的时候保持不关闭
		}
	);

	const template = {
		background: "#fff",
		width: "auto",
		height: "auto",
		borderRadius: "25px",
	};

	// 获取npm包
	const onDiskPath = vscode.Uri.file(
		path.join(context.extensionPath, "media", "phl.js")
	);
	const URI = onDiskPath.with({ scheme: "vscode-resource" });

	panel.webview.html = getWebviewContent(code, JSON.stringify(template), URI);

	// Handle messages from the webview
	// panel.webview.onDidReceiveMessage(
	// 	async (base) => {
	// 		switch (base.command) {
	// 			case "share":
	// 				let canvas = JSON.parse(base.canvas);
	// 				console.log(canvas);

	// 				canvas
	// 					.createPNGStream()
	// 					.pipe(
	// 						fs.createWriteStream(path.join(SAVE_DIRECTORY, "shareImg.png"))
	// 					);
	// 				// const downloadedAs = FULL_DOWNLOADED_PATH;
	// 				// await imgToClipboard(downloadedAs);

	// 				fs.unlink(path.join(SAVE_DIRECTORY, "shareImg.png"), (err) => {
	// 					if (err) {
	// 						throw err;
	// 					}
	// 				});
	// 				return;
	// 		}
	// 	},
	// 	undefined,
	// 	context.subscriptions
	// );
	// return imgUrl;
}

function getWebviewContent(
	code: string,
	template: string,
	scriptUri: vscode.Uri
) {
	return `<!DOCTYPE html>
		<html lang="en">
		<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Cat Coding</title>
		</head>
		<body>
		
				<canvas id="canvas"></canvas>
				<script src="${scriptUri}"></script>
				<script type="module">
				(function() {
					const canvas = document.getElementById('canvas');
					const ctx = canvas.getContext('2d');
					const vscode = acquireVsCodeApi();
									
					phl(canvas, ctx, ${template}, \`${code}\`, "js");		

					// let img = canvas.pngStream();
					// console.log(canvas.pngStream());
					setTimeout(() => {
						let imgURL = canvas.toDataURL(canvas);

						const a = document.createElement('a')
						a.href = imgURL
						a.setAttribute('download', 'shareImg')
						a.click()
						document.body.removeChild(a);
						
						// vscode.postMessage({
						// 	command: 'share',
						// 	img: img
						// })
						
					}, 500);
				}())
				</script>
				
		</body>
		</html>`;
}

// // 2. 周期性改变 html 中的内容，因为是直接给 webview.html 赋值，所以是刷新整个内容
// function changeWebView() {
// 	const newData = Math.ceil(Math.random() * 100);
// 	panel.webview.html = getWebViewContent(`${innerHtml}<p>${newData}</p>`);
// }
// const interval = setInterval(changeWebView, 1000);

// // 3. 可以通过设置 panel.onDidDispose，让 webView 在关闭时执行一些清理工作。
// panel.onDidDispose(
// 	() => {
// 		clearInterval(interval);
// 	},
// 	null,
// 	context.subscriptions
// );

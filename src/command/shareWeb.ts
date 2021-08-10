import * as vscode from "vscode";
import * as path from "path";

// export function webViewPanel(context: vscode.ExtensionContext) {
export function webViewPanel(context: vscode.ExtensionContext, code: string) {
	// 1. 使用 createWebviewPanel 创建一个 panel，然后给 panel 放入 html 即可展示 web view
	const panel = vscode.window.createWebviewPanel(
		"helloWorld",
		"Hello world",
		vscode.ViewColumn.One, // web view 显示位置
		{
			enableScripts: true, // 允许 JavaScript
			retainContextWhenHidden: true, // 在 hidden 的时候保持不关闭
		}
	);

	const template = {
		background: "#eee",
		width: "600px",
		height: "350px",
		borderRadius: "25px",
	};

	const webviewDir = path.join(context.extensionPath, "media");
	let URI = vscode.Uri.file(path.join(webviewDir, "phj.js"));
	URI = URI.with({ scheme: "vscode-resource" });

	panel.webview.html = getWebViewContent(code, template, URI);
}

function getWebViewContent(
	code: string,
	template: object,
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
					import phj from "phj.js";
					const CanvasNode = document.getElementById('canvas');
					const canvas = CanvasNode.getContext('2d');

					phj(CanvasNode, canvas, ${template}, ${code}, "js")
				</script>
			</body>
		</html>
  `;
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

// <script src="https://cdn.jsdelivr.net/npm/painter-kernel@1.0.5/dist/painter.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.0.1/highlight.min.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/painter-highlight@0.1.1/dist/index.min.js"></script>
// <script type="module">
// 	import phj from 'painter-hightlight'
// 	import hljs from 'highlight.js';
// 	import { Pen, toPx } from 'painter-kernel';

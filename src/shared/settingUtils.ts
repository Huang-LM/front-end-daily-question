import { workspace, WorkspaceConfiguration, ConfigurationTarget } from "vscode";
import { DescriptionConfiguration } from "../shared";

export function getWorkspaceConfiguration(): WorkspaceConfiguration {
	return workspace.getConfiguration("interview");
}
export function shouldUpdateNotification(): number {
	if (getWorkspaceConfiguration().get("updateNotification")) {
		getWorkspaceConfiguration().update(
			"updateNotification",
			+new Date(),
			ConfigurationTarget.Global
		);
	}
	return getWorkspaceConfiguration().get<number>("updateNotification", 0);
}
export function setShouldUpdateNotification(): void {
	getWorkspaceConfiguration().update(
		"updateNotification",
		+new Date(),
		ConfigurationTarget.Global
	);
}
export function shouldHideSolvedProblem(): boolean {
	return getWorkspaceConfiguration().get<boolean>("hideSolved", false);
}

export function getWorkspaceFolder(): string {
	return getWorkspaceConfiguration().get<string>("workspaceFolder", "");
}

export function getEditorShortcuts(): string[] {
	return getWorkspaceConfiguration().get<string[]>("editor.shortcuts", [
		"submit",
		"test",
	]);
}

export function hasStarShortcut(): boolean {
	const shortcuts: string[] = getWorkspaceConfiguration().get<string[]>(
		"editor.shortcuts",
		["submit", "test"]
	);
	return shortcuts.indexOf("star") >= 0;
}

export function getDescriptionConfiguration(): IDescriptionConfiguration {
	const setting: string = getWorkspaceConfiguration().get<string>(
		"showDescription",
		DescriptionConfiguration.InWebView
	);
	const config: IDescriptionConfiguration = {
		showInComment: false,
		showInWebview: true,
	};
	switch (setting) {
		case DescriptionConfiguration.Both:
			config.showInComment = true;
			config.showInWebview = true;
			break;
		case DescriptionConfiguration.None:
			config.showInComment = false;
			config.showInWebview = false;
			break;
		case DescriptionConfiguration.InFileComment:
			config.showInComment = true;
			config.showInWebview = false;
			break;
		case DescriptionConfiguration.InWebView:
			config.showInComment = false;
			config.showInWebview = true;
			break;
	}

	// To be compatible with the deprecated setting:
	if (getWorkspaceConfiguration().get<boolean>("showCommentDescription")) {
		config.showInComment = true;
	}

	return config;
}

export interface IDescriptionConfiguration {
	showInComment: boolean;
	showInWebview: boolean;
}

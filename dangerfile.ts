import { danger, markdown, message, warn } from "danger";
import * as fs from "fs";

const modifiedMD = danger.git.modified_files.join("- ");
message("Changed Files in this PR: \n - " + modifiedMD);

const isWIP = (danger.github.pr.body + danger.github.pr.title).includes("WIP");
if (isWIP) warn("PR is classed as Work in Progress");

const isBigPR = Math.max(danger.github.pr.additions, danger.github.pr.deletions) > 500;
if (isBigPR) warn("Big PR");

markdown('##Report\n');

warn(`test warning`);

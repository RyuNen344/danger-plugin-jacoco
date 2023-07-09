import { MarkdownString } from "@/model/markdown/markdown";
import { Reporter } from "@/reporter/reporter";
import { ILogObj, Logger } from "tslog";

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
export class LocalReporter implements Reporter {
    private readonly log: Logger<ILogObj> = new Logger();

    markdown(message: MarkdownString): void {
        this.log.debug(message);
    }
    debug(message: MarkdownString): void {
        this.log.debug(message);
    }
    warn(message: MarkdownString): void {
        this.log.warn(message);
    }

    error(message: string): void;
    error(error: Error): void;
    error(error: string | Error | unknown): void {
        this.log.error(error);
    }
}

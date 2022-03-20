import { MarkdownString } from "@/model/markdown/markdown";
import { Reporter } from "@/reporter/reporter";
import { Logger } from "tslog";

export class LocalReporter implements Reporter {
    private readonly log: Logger = new Logger();

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

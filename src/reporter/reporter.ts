import { MarkdownString } from "@/model/markdown/markdown";

export interface Reporter {
    markdown(message: MarkdownString): void;
    debug(message: MarkdownString): void;
    warn(message: MarkdownString): void;
    error(message: string): void;
    error(error: Error): void;
    error(error: unknown): void;
}

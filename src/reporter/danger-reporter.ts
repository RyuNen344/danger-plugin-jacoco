import { MarkdownString } from "@/model/markdown/markdown";
import { Reporter } from "@/reporter/reporter";

export declare function markdown(message: string): void;
export declare function message(message: string): void;
export declare function warn(message: string): void;
export declare function fail(message: string): void;

export class DangerReporter implements Reporter {
    markdown(message: MarkdownString): void {
        markdown(message);
    }
    debug(messages: MarkdownString): void {
        message(messages);
    }
    warn(message: MarkdownString): void {
        warn(message);
    }
    error(message: string): void;
    error(error: Error): void;
    error(error: unknown): void {
        if (typeof error === "string") {
            fail(error);

            return;
        }

        if (isError(error)) {
            if ("cause" in error) {
                // es2022
                // eslint-disable-next-line @typescript-eslint/no-base-to-string
                fail(error.cause != null ? error.cause.toString() : "error occured");

                return;
            }
            if ("name" in error && "message" in error) {
                // es5
                fail(error.message);

                return;
            }
        }

        // other primitives
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fail(error as any as string);
    }
}

const isError = (arg: unknown): arg is Error => {
    const error = arg as Error;
    // es2022
    if ("cause" in error && isError(error.cause)) return true;

    // es5
    if ("name" in error && "message" in error) return true;

    return false;
};

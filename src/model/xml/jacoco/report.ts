import { Counter } from "@model/xml/jacoco/counter";
import { Package } from "@model/xml/jacoco/package";
import { Sessioninfo } from "@model/xml/jacoco/session_info";

export interface Report {
    sessioninfo: Sessioninfo[];
    package: Package[];
    counter: Counter[];
    "@_name": string;
}

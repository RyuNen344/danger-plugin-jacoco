import { Counter } from "@/model/xml/jacoco/counter";
import { Group } from "@/model/xml/jacoco/group";
import { Package } from "@/model/xml/jacoco/package";
import { Sessioninfo } from "@/model/xml/jacoco/session_info";

export interface Report {
    "@_name": string;
    sessioninfo?: Sessioninfo[];
    group?: Group[];
    package?: Package[];
    counter?: Counter[];
}

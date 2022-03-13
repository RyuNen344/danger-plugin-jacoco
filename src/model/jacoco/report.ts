import { Counter } from "@/model/jacoco/counter";
import { Group } from "@/model/jacoco/group";
import { Package } from "@/model/jacoco/package";
import { SessionInfo } from "@/model/jacoco/session_info";

export interface Report {
    name: string;
    sessionInfo?: SessionInfo[];
    group?: Group[];
    package?: Package[];
    counter?: Counter[];
}

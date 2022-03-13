import { Report } from "@/model/jacoco/report";
import { XML } from "@/model/jacoco/xml";

export interface JaCoCo {
    xml: XML;
    report: Report;
}

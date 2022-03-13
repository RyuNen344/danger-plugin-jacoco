import { Report } from "@/model/jacoco/report";
import { XML } from "@/model/jacoco/xml_info";

export interface JaCoCo {
    xml: XML;
    report: Report;
}

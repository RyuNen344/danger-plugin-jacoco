import { Report } from "@/model/xml/jacoco/report";
import { XMLInfo } from "@/model/xml/jacoco/xml_info";

export interface JacocoXML {
    "?xml": XMLInfo;
    report: Report;
}

import { JacocoXML } from "@/model/xml/jacoco/jacoco_xml";
import { JacocoXmlConverter } from "@/model/xml/jacoco/jacoco_xml_converter";
import { XMLParser } from 'fast-xml-parser';

export function importXml(file: Buffer): JacocoXML {
    let parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "@_",
        allowBooleanAttributes: true
    });
    let json = JSON.stringify(parser.parse(file));
    return JacocoXmlConverter.toJacocoXML(json);
}

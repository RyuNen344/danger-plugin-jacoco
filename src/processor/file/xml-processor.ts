import { JaCoCo } from "@/model/jacoco/jacoco";
import { JaCoCoMapper } from "@/model/jacoco/mapper";
import { X2jOptionsOptional, XMLParser } from "fast-xml-parser";

export class XmlProcessor {
    private static readonly xmlOption: X2jOptionsOptional = {
        ignoreAttributes: false,
        attributeNamePrefix: "",
        allowBooleanAttributes: true,
        parseAttributeValue: true,
        parseTagValue: true,
    };

    private static readonly parser = new XMLParser(this.xmlOption);

    public static importXml = (file: Buffer): JaCoCo => JaCoCoMapper.toJaCoCo(JSON.stringify(this.parser.parse(file)));
}

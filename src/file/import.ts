import { JaCoCo } from "@/model/jacoco/jacoco";
import { JaCoCoMapper } from "@/model/jacoco/mapper";
import { X2jOptionsOptional, XMLParser } from 'fast-xml-parser';

const xmlOption: X2jOptionsOptional = {
    ignoreAttributes: false,
    attributeNamePrefix: "",
    allowBooleanAttributes: true,
    parseAttributeValue: true,
    parseTagValue: true
}

const parser = new XMLParser(xmlOption);

export function importXml(file: Buffer): JaCoCo {
    let json = JSON.stringify(parser.parse(file));
    return JaCoCoMapper.toJaCoCo(json);
}

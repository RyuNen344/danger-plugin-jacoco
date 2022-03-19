import { JaCoCo } from "@/model/jacoco/jacoco";
import { JaCoCoMapper } from "@/model/jacoco/mapper";
import { X2jOptionsOptional, XMLParser } from "fast-xml-parser";

const xmlOption: X2jOptionsOptional = {
    ignoreAttributes: false,
    attributeNamePrefix: "",
    allowBooleanAttributes: true,
    parseAttributeValue: true,
    parseTagValue: true,
};

const parser = new XMLParser(xmlOption);

export const importXml = (file: Buffer): JaCoCo => JaCoCoMapper.toJaCoCo(JSON.stringify(parser.parse(file)));

import { XMLParser } from 'fast-xml-parser';
import * as fs from 'fs';
import { JacocoXmlConverter } from '@model/xml/jacoco/jacoco_xml_converter';
import { Logger } from "tslog";

const log: Logger = new Logger();
const parser: XMLParser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    allowBooleanAttributes: true
});

log.debug("debug log");

const xmlReport = fs.readFileSync("test/resource/jacocoMergedReport.xml")

let parsed = JSON.stringify(parser.parse(xmlReport));
fs.writeFileSync("output.json", parsed);
const jacocoXML = JacocoXmlConverter.toJacocoXML(parsed);
log.debug(jacocoXML.report.counter.length);

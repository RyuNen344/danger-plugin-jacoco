import { importXml } from '@/file/import';
import * as fs from 'fs';
import { Logger } from 'tslog';

const log = new Logger();

describe("import xml file and deserialize it", () => {
    test('should success a.xml', () => {
        let xml = fs.readFileSync("test/__resource__/sample_jacoco_a.xml")
        let actual = importXml(xml);

        log.debug(actual.report.package);
        log.debug(actual.report.name);
    });

    test('should success b.xml', () => {
        let xml = fs.readFileSync("test/__resource__/sample_jacoco_b.xml")
        // let parser = new XMLParser({
        //     ignoreAttributes: false,
        //     attributeNamePrefix: "",
        //     allowBooleanAttributes: true,
        //     parseAttributeValue: true,
        //     parseTagValue: true
        // });
        // let json = JSON.stringify(parser.parse(xml, true));
        // fs.writeFileSync('dagashi3.json', json);

        let actual = importXml(xml);
        log.debug(actual.report.package);
        log.debug(actual.report.name);
        if (actual.report.package?.[0] != null) {
            log.debug(actual.report.package?.[0].sourceFile);
        }
    });

    test('should success dagashi.xml', () => {
        let xml = fs.readFileSync("test/__resource__/sample_jacoco_dagashi.xml")
        let actual = importXml(xml);
        log.debug(actual.report.package);
        log.debug(actual.report.name);
    });
});

import { importXml } from '@/file/import';
import * as fs from 'fs';

describe("import xml file and deserialize it", () => {
    test('should success a.xml', () => {
        let xml = fs.readFileSync("test/__resource__/sample_jacoco_a.xml")
        let actual = importXml(xml);
    });

    test('should success b.xml', () => {
        let xml = fs.readFileSync("test/__resource__/sample_jacoco_b.xml")
        let actual = importXml(xml);
    });

    test('should success dagashi.xml', () => {
        let xml = fs.readFileSync("test/__resource__/sample_jacoco_dagashi.xml")
        let actual = importXml(xml);
    });
});

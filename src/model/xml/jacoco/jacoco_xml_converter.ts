// To parse this data:
//
//   import { Convert, JacocoXML } from "./file";
//
//   const jacocoXML = Convert.toJacocoXML(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.
//
// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
// https://www.jacoco.org/jacoco/trunk/coverage/report.dtd

import { JacocoXML } from "@/model/xml/jacoco/jacoco_xml";

export class JacocoXmlConverter {
    public static toJacocoXML(json: string): JacocoXML {
        return cast(JSON.parse(json), r("JacocoXML"));
    }

    public static jacocoXMLToJson(value: JacocoXML): string {
        return JSON.stringify(uncast(value, r("JacocoXML")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`,);
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) { }
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems") ? transformArray(typ.arrayItems, val)
                : typ.hasOwnProperty("props") ? transformObject(getProps(typ), typ.additional, val)
                    : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "JacocoXML": o([
        { json: "?xml", js: "?xml", typ: r("XML") },
        { json: "report", js: "report", typ: r("Report") },
    ], false),
    "XML": o([
        { json: "@_version", js: "@_version", typ: "" },
        { json: "@_encoding", js: "@_encoding", typ: "" },
        { json: "@_standalone", js: "@_standalone", typ: "" },
    ], false),
    "Report": o([
        { json: "@_name", js: "@_name", typ: "" },
        { json: "sessioninfo", js: "sessioninfo", typ: u(undefined, a(r("Sessioninfo")), r("Sessioninfo")) },
        { json: "group", js: "group", typ: u(undefined, a(r("Group")), r("Group")) },
        { json: "package", js: "package", typ: u(undefined, a(r("Package")), r("Package")) },
        { json: "counter", js: "counter", typ: u(undefined, a(r("Counter")), r("Counter")) },
    ], false),
    "Sessioninfo": o([
        { json: "@_id", js: "@_id", typ: "" },
        { json: "@_start", js: "@_start", typ: "" },
        { json: "@_dump", js: "@_dump", typ: "" },
    ], false),
    "Group": o([
        { json: "@_name", js: "@_name", typ: "" },
        { json: "group", js: "group", typ: u(undefined, a(r("Group")), r("Group")) },
        { json: "package", js: "package", typ: u(undefined, a(r("Package")), r("Package")) },
        { json: "counter", js: "counter", typ: u(undefined, a(r("Counter")), r("Counter")) },
    ], false),
    "Package": o([
        { json: "@_name", js: "@_name", typ: "" },
        { json: "class", js: "class", typ: u(undefined, a(r("ClassElement")), r("ClassElement")) },
        { json: "sourcefile", js: "sourcefile", typ: u(undefined, a(r("SourcefileElement")), r("SourcefileElement")) },
        { json: "counter", js: "counter", typ: u(undefined, a(r("Counter")), r("Counter")) },
    ], false),
    "ClassElement": o([
        { json: "@_name", js: "@_name", typ: "" },
        { json: "@_sourcefilename", js: "@_sourcefilename", typ: u(undefined, "") },
        { json: "method", js: "method", typ: u(undefined, a(r("MethodElement")), r("MethodElement")) },
        { json: "counter", js: "counter", typ: u(undefined, a(r("Counter")), r("Counter")) },
    ], false),
    "MethodElement": o([
        { json: "@_name", js: "@_name", typ: "" },
        { json: "@_desc", js: "@_desc", typ: "" },
        { json: "@_line", js: "@_line", typ: u(undefined, "") },
        { json: "counter", js: "counter", typ: u(undefined, a(r("Counter")), r("Counter")) },
    ], false),
    "SourcefileElement": o([
        { json: "@_name", js: "@_name", typ: "" },
        { json: "line", js: "line", typ: u(undefined, a(r("LineElement")), r("LineElement")) },
        { json: "counter", js: "counter", typ: u(undefined, a(r("Counter")), r("Counter")) },
    ], false),
    "LineElement": o([
        { json: "@_nr", js: "@_nr", typ: "" },
        { json: "@_mi", js: "@_mi", typ: u(undefined, "") },
        { json: "@_ci", js: "@_ci", typ: u(undefined, "") },
        { json: "@_mb", js: "@_mb", typ: u(undefined, "") },
        { json: "@_cb", js: "@_cb", typ: u(undefined, "") },
    ], false),
    "Counter": o([
        { json: "@_type", js: "@_type", typ: r("Type") },
        { json: "@_missed", js: "@_missed", typ: "" },
        { json: "@_covered", js: "@_covered", typ: "" },
    ], false),
    "Type": [
        "BRANCH",
        "CLASS",
        "COMPLEXITY",
        "INSTRUCTION",
        "LINE",
        "METHOD",
    ],
};

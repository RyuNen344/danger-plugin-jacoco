/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { JaCoCo } from "@/model/jacoco/jacoco";

// To parse this data:
//
//   const jaCoCo = JaCoCoMapper.toJaCoCo(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.
//
// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
//
// JaCoCo xml definition is below
// https://www.jacoco.org/jacoco/trunk/coverage/report.dtd
//
export class JaCoCoMapper {
    public static toJaCoCo(json: string): JaCoCo {
        return cast(JSON.parse(json), r("JaCoCo"));
    }

    public static jaCoCoToJson(value: JaCoCo): string {
        return JSON.stringify(uncast(value, r("JaCoCo")), null, 2);
    }
}

const validate = (typ: any, val: any, key: any = "") => {
    if (key) {
        throw Error(
            `Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`
        );
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`);
}

const  jsonToJSProps = (typ: any): any => {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
        typ.jsonToJS = map;
    }

    return typ.jsonToJS;
}

const jsToJSONProps = (typ: any): any => {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
        typ.jsToJSON = map;
    }

    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ""): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;

        return validate(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {
                // noop
            }
        }

        return validate(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;

        return validate(cases, val);
    }

    function transformForceArray(typ: any, val: any) {
        if (!Array.isArray(val)) {
            return [transform(val, typ, getProps)];
        } else {
            return val.map((el) => transform(el, typ, getProps));
        }
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return validate("array", val);

        return val.map((el) => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return validate("Date", val);
        }

        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return validate("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach((key) => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach((key) => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });

        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;

        return validate(typ, val);
    }
    if (typ === false) return validate(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers")
            ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("forceArrayItems")
            ? transformForceArray(typ.forceArrayItems, val)
            : typ.hasOwnProperty("arrayItems")
            ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")
            ? transformObject(getProps(typ), typ.additional, val)
            : validate(typ, val);
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

function fa(typ: any) {
    return { forceArrayItems: typ };
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
    JaCoCo: o(
        [
            { json: "?xml", js: "xml", typ: r("XML") },
            { json: "report", js: "report", typ: r("Report") },
        ],
        false
    ),
    Report: o(
        [
            { json: "name", js: "name", typ: "" },
            { json: "sessioninfo", js: "sessionInfo", typ: u(undefined, fa(r("SessionInfo"))) },
            { json: "group", js: "group", typ: u(undefined, fa(r("Group"))) },
            { json: "package", js: "package", typ: u(undefined, fa(r("Package"))) },
            { json: "counter", js: "counter", typ: u(undefined, fa(r("Counter"))) },
        ],
        false
    ),
    Counter: o(
        [
            { json: "covered", js: "covered", typ: 0 },
            { json: "missed", js: "missed", typ: 0 },
            { json: "type", js: "type", typ: r("Type") },
        ],
        false
    ),
    Package: o(
        [
            { json: "name", js: "name", typ: "" },
            { json: "class", js: "class", typ: u(undefined, fa(r("Class"))) },
            { json: "sourcefile", js: "sourceFile", typ: u(undefined, fa(r("SourceFile"))) },
            { json: "counter", js: "counter", typ: u(undefined, fa(r("Counter"))) },
        ],
        false
    ),
    Group: o(
        [
            { json: "name", js: "name", typ: "" },
            { json: "group", js: "group", typ: u(undefined, fa(r("Group"))) },
            { json: "package", js: "package", typ: u(undefined, fa(r("Package"))) },
            { json: "counter", js: "counter", typ: u(undefined, fa(r("Counter"))) },
        ],
        false
    ),
    Class: o(
        [
            { json: "name", js: "name", typ: "" },
            { json: "sourcefilename", js: "sourceFileName", typ: u(undefined, "") },
            { json: "method", js: "method", typ: u(undefined, fa(r("Method"))) },
            { json: "counter", js: "counter", typ: u(undefined, fa(r("Counter"))) },
        ],
        false
    ),
    Method: o(
        [
            { json: "name", js: "name", typ: "" },
            { json: "desc", js: "desc", typ: "" },
            { json: "line", js: "line", typ: u(undefined, 0) },
            { json: "counter", js: "counter", typ: u(undefined, fa(r("Counter"))) },
        ],
        false
    ),
    SourceFile: o(
        [
            { json: "name", js: "name", typ: "" },
            { json: "line", js: "line", typ: u(undefined, fa(r("Line"))) },
            { json: "counter", js: "counter", typ: u(undefined, fa(r("Counter"))) },
        ],
        false
    ),
    Line: o(
        [
            { json: "nr", js: "nr", typ: 0 },
            { json: "mi", js: "mi", typ: u(undefined, 0) },
            { json: "ci", js: "ci", typ: u(undefined, 0) },
            { json: "mb", js: "mb", typ: u(undefined, 0) },
            { json: "cb", js: "cb", typ: u(undefined, 0) },
        ],
        false
    ),
    SessionInfo: o(
        [
            { json: "id", js: "id", typ: "" },
            { json: "dump", js: "dump", typ: 0 },
            { json: "start", js: "start", typ: 0 },
        ],
        false
    ),
    XML: o(
        [
            { json: "version", js: "version", typ: 0 },
            { json: "encoding", js: "encoding", typ: "" },
            { json: "standalone", js: "standalone", typ: "" },
        ],
        false
    ),
    Type: ["BRANCH", "CLASS", "COMPLEXITY", "INSTRUCTION", "LINE", "METHOD"],
};

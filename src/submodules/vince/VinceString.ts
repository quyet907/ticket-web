import {
	failure,
	Schema,
	schemaOf,
	StringSchema,
	tuple,
	ValidationResult,
} from "@deckchair-technicians/vice";
import { BlankStringSchema, LengthStringSchema, LowerCase, UpperCase } from "./schema/SchemaString";



export function isBlank(): Schema<any, string> {
	return new BlankStringSchema();
}

export function isLengthString(
	minLength: number,
	maxLength: number
): Schema<any, string> {
	var schema = new LengthStringSchema();
	schema.max = maxLength || -1;
	schema.min = minLength || -1;
	return schema;
}

export function upperCase():Schema<any , string>{
	return new UpperCase()
}

export function lowerCase():Schema<any , string>{
	return new LowerCase()
}



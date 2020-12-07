import { failure, StringSchema, ValidationResult,IsoUtcDateSchema } from "@deckchair-technicians/vice";


export class LowerCase extends IsoUtcDateSchema {
	conformString(value: string): ValidationResult<string> {
		if (typeof value === "string") {
			value = value.trim();
			value = value.toLowerCase();
			return !value ? failure("required") : value;
		} else {
			return failure("expected a valid string");
		}
	}
}


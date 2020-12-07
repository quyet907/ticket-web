import {
	failure,
	StringSchema,
	ValidationResult,
} from "@deckchair-technicians/vice";

export class LengthStringSchema extends StringSchema {
	public max: number = -1;
	public min: number = -1;

	conformString(value: string): ValidationResult<string> {
		if (typeof value === "string") {
			if (!value) {
				return failure("required");
			} else {
				if (value.length > this.max || value.length < this.min) {
					return failure(
						`characters in the range of ${this.min}-${this.max}`
					);
				} else return value;
			}
		} else {
			return failure("expected a valid string");
		}
	}
}

export class BlankStringSchema extends StringSchema {
	conformString(value: string): ValidationResult<string> {
		if (typeof value === "string") {
			value = value.trim();
			return !value ? failure("required") : value;
		} else {
			return failure("expected a valid string");
		}
	}
}

export class LowerCase extends StringSchema {
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

export class UpperCase extends StringSchema {
	conformString(value: string): ValidationResult<string> {
		if (typeof value === "string") {
			value = value.trim();
			value = value.toUpperCase();
			return !value ? failure("required") : value;
		} else {
			return failure("expected a valid string");
		}
	}
}

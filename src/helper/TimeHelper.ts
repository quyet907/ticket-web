import moment from "moment";

export class TimeHelper {
	public static HoursPlus(timeNow: Date, plus: number): Date {
		var getTime: Date = new Date(timeNow || new Date());
		getTime.setHours(getTime.getHours() + plus);
		return getTime;
	}

	public static HoursMinus(timeNow: Date, minus: number): Date {
		var getTime: Date = new Date(timeNow || new Date());
		getTime.setHours(getTime.getHours() - minus);
		return getTime;
	}

	public static deleteTime(time: Date, typeDelete: string): Date {
		return new Date(moment(time|| new Date()).format(typeDelete));
	}
}

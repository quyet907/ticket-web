import moment from "moment";

export class TimeHelper {
	public static HoursPlus(timeNow: Date, plus: number): Date {
		var getTime: Date = new Date(timeNow || new Date());
		getTime.setHours(getTime.getHours() + plus);
		return getTime;
	}

	public static TimeEndTrip(time : Date,timeStart: Date, plus: number) : Date{
		var getTime = new Date(time);
		var newTimeStart = new Date(timeStart)
		console.log(time)
		console.log(timeStart)
		getTime = new Date(moment(getTime).format("YYYY-MM-DD"));
		getTime.setHours(newTimeStart.getHours())
		getTime.setMinutes(newTimeStart.getMinutes());
		getTime.setHours(getTime.getHours()+plus)
		return getTime;
	}

	public static HoursMinus(timeNow: Date, minus: number): Date {
		var getTime: Date = new Date(timeNow || new Date());
		getTime.setHours(getTime.getHours() - minus);
		return getTime;
	}

}

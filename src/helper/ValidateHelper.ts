import { build,makeInstance, conformAs, data, isError, isSuccess, problems, ValidationResult } from "@deckchair-technicians/vice";

export type Constructor<T=object> = new(...args: any[]) => T;

export class ValidateHelper{
    public static validateTechnicians<T extends object>(c: Constructor<T>, value: T):ErrorValidate<T>[]| undefined{
            var check:any = conformAs(c, {...value});
            if(isError(check)){
              return ValidateHelper.convertProblemToObject(check);
            }
            return undefined
    }

    public static convertProblemToObject<T>(problems: any ): ErrorValidate<T>[]{
      var getProblem = problems.problems;
      var err:ErrorValidate<T>[]  = [];
      if(Array.isArray(getProblem)){
         err =  getProblem.map(problem =>{
          return {
            key: problem.path[0],
            message: ValidateHelper.convertMessenger(problem.message) 
          }
        })
      }
      return err;
    }

    public static convertMessenger(messageErr: string):string{
      switch (messageErr.toLowerCase()) {
        case "no value":
          return "Không được để trống"
        case "unexpected item":
          return "Không tồn tại thông tin này"
        default:
          return messageErr
      }
    }

    public static getMessenger<T>(key: keyof T , message:ErrorValidate<T>[] ):string{
      var get= message.find(err => err.key=== key)
      return get ? get.message : ""
    }

    public static isError<T>(key: keyof T , message:ErrorValidate<T>[] ):boolean{
      var get= message.find(err => err.key=== key)
      return get ? true : false
    }
}

export interface ErrorValidate<T>{
  key : keyof T;
  message : string;
}
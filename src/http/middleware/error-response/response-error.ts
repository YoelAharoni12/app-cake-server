export class ResponseError {
  constructor(public message:string, public statusCode:number,public details:object) {}
}

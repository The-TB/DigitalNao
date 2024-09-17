export class GenericResponseDTO<T> {
    result: T;
    message: string;
    statusCode: number;

    constructor(response: T, message: string, statusCode: number) {
        this.result = response;
        this.message = message;
        this.statusCode = statusCode;
    }
}
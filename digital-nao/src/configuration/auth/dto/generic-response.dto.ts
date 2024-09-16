export class GenericResponseDTO<T> {
    response: T;
    message: string;
    statusCode: number;

    constructor(response: T, message: string, statusCode: number) {
        this.response = response;
        this.message = message;
        this.statusCode = statusCode;
    }
}
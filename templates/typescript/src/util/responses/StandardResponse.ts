export const StandardResponse = (
    status: boolean = false, 
    message: string | null = null, 
    data: any = null, 
    errors: any = null) => {

    return {
        status,
        message,
        data,
        errors
    };
};
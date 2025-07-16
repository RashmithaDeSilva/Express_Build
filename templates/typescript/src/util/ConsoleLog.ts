import { LogTypesEnumType } from "./enums/LogTypesEnum";
import { LogTypesEnum } from './enums/LogTypesEnum';


function getFormattedDateTime(): string {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `[${ year }/${ month }/${ day } - ${ hours }:${ minutes }:${ seconds }]`;
}

function log(logType: LogTypesEnumType, messege: string): void {
    console.log(`${ getFormattedDateTime() } [${ logType }] - ${ messege }`);
}

function logError(messege: string): void {
    console.log(`${ getFormattedDateTime() } [${ LogTypesEnum.ERROR }] - ${ messege }`);
}

function logInfo(messege: string): void {
    console.log(`${ getFormattedDateTime() } [${ LogTypesEnum.INFO }] - ${ messege }`);
}

export { log, logError, logInfo }
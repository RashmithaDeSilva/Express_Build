import { LogTypesEnum } from './enums/LogTypesEnum.mjs';

function getFormattedDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `[${year}/${month}/${day} - ${hours}:${minutes}:${seconds}]`;
}

function log(logType, message) {
  console.log(`${getFormattedDateTime()} [${logType}] - ${message}`);
}

function logError(message) {
  console.log(`${getFormattedDateTime()} [${LogTypesEnum.ERROR}] - ${message}`);
}

function logInfo(message) {
  console.log(`${getFormattedDateTime()} [${LogTypesEnum.INFO}] - ${message}`);
}

export { log, logError, logInfo };

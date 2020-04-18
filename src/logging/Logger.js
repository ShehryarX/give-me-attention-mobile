export class LoggerImpl {
  log(msg) {
    console.log(msg);
  }

  error(err) {
    console.error(err);
  }
}

export const Logger = new LoggerImpl();

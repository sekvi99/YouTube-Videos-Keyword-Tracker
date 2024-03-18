export class ToastServiceMock {
  public success(message: string): void {
    console.log('Success message invoked');
  }

  public error(message: string): void {
    console.log('Error message invoked');
  }

  public warning(message: string): void {
    console.log('Warning message invoked');
  }

  public info(message: string): void {
    console.log('Info message invoked');
  }
}

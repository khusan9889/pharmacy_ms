export class ResultDto<T> {
  result: {
    data?: T;
  };
  error?: {
    message: string;
    data?: any;
  };
  message?: string;

  constructor(success: boolean, message?: string, data?: T, error?: any) {
    if (success) {
      this.result = { data };
      this.error = null; // Set error to null when success is true
      this.message = message || 'OK';
    } else {
      this.error = {
        message: error?.message || 'Internal server error',
        data: error?.data,
      };
      this.message = message || 'Error';
    }
  }
}
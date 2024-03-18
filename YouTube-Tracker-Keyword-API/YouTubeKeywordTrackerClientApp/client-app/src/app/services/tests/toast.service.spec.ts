import { TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { ToastService } from '../toast.service';

describe('ToastService', () => {
  let toastService: ToastService;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    const toastrSpy = jasmine.createSpyObj('ToastrService', [
      'success',
      'error',
      'warning',
      'info',
    ]);

    TestBed.configureTestingModule({
      providers: [
        ToastService,
        { provide: ToastrService, useValue: toastrSpy },
      ],
    });

    toastService = TestBed.inject(ToastService);
    toastrServiceSpy = TestBed.inject(
      ToastrService
    ) as jasmine.SpyObj<ToastrService>;
  });

  it('should be created', () => {
    expect(toastService).toBeTruthy();
  });

  it('should call success method of ToastrService with correct parameters', () => {
    const message = 'Success Message';
    toastService.success(message);
    expect(toastrServiceSpy.success).toHaveBeenCalledWith(message, 'Success');
  });

  it('should call error method of ToastrService with correct parameters', () => {
    const message = 'Error Message';
    toastService.error(message);
    expect(toastrServiceSpy.error).toHaveBeenCalledWith(message, 'Error');
  });

  it('should call warning method of ToastrService with correct parameters', () => {
    const message = 'Warning Message';
    toastService.warning(message);
    expect(toastrServiceSpy.warning).toHaveBeenCalledWith(message, 'Warning');
  });

  it('should call info method of ToastrService with correct parameters', () => {
    const message = 'Info Message';
    toastService.info(message);
    expect(toastrServiceSpy.info).toHaveBeenCalledWith(message);
  });
});

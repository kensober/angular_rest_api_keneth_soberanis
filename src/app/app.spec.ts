import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
describe('App', () => {
  beforeEach(async () =>
    TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents(),
  );
  it('crea la aplicación', () => {
    expect(TestBed.createComponent(App).componentInstance).toBeTruthy();
  });
  it('muestra el header', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-header')).toBeTruthy();
  });
});

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: AppComponent;
  beforeEach(() => {
    fixture = new AppComponent();
  })

  it('add two numbers', () => {
    expect(fixture.sum(1, 2)).toBe(3);
  });
});

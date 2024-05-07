import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain logo', () => {
    const logo: HTMLImageElement = fixture.nativeElement.querySelector('.content-header__logo');
    expect(logo.src).toContain('https://githubanotaai.github.io/frontend-interview-mock-data/assets/128x128.png');
  });

  it('should contain title', () => {
    const span: HTMLSpanElement = fixture.nativeElement.querySelector('.content-header__title-subtitle__title');
    expect(span.innerHTML).toContain('Teste de Desenvolvedor Fron-End - Anota AI');
  });

  it('should contain subtitle', () => {
    const span: HTMLSpanElement = fixture.nativeElement.querySelector('.content-header__title-subtitle__subtitle');
    expect(span.innerHTML).toContain('Keidson Roby da Silva');
  });

});

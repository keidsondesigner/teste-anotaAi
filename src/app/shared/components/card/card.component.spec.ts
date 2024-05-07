import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { productAMock } from '../../../mocks/product.mock';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.product = productAMock
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain img card', () => {
    const img: HTMLImageElement = fixture.nativeElement.querySelector('.container-card__image');
    expect(img.src).toContain(productAMock.img);
  });

  it('should contain type card', () => {
    const span: HTMLSpanElement = fixture.nativeElement.querySelector('.container-card__type');
    expect(span.innerHTML).toContain(productAMock.type);
  });

  it('should contain type title', () => {
    const heading: HTMLHeadingElement = fixture.nativeElement.querySelector('.container-card__content-title');
    expect(heading.innerHTML).toContain(productAMock.title);
  });

  it('should contain type description', () => {
    const description: HTMLParagraphElement  = fixture.nativeElement.querySelector('.container-card__content-description');
    expect(description.innerHTML).toContain(productAMock.description);
  });

  it('should emit event from onDelete output', () => {
    fixture.detectChanges();
    const spy = jest.spyOn(component.onDelete, 'emit');
    const event = new Event('click');
    const btnDebugEl = fixture.nativeElement.querySelector('.container-card__content-button');

    btnDebugEl.dispatchEvent(event);
    expect(spy).toHaveBeenCalled();
  });
});

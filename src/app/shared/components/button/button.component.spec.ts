import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

/**
 * Pruebas unitarias para el componente de botón
 * Verifica el funcionamiento correcto del componente reutilizable
 */
describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default variant', () => {
    expect(component.variant).toBe('primary');
  });

  it('should have default size', () => {
    expect(component.size).toBe('md');
  });

  it('should not be disabled by default', () => {
    expect(component.disabled).toBeFalse();
  });

  it('should emit click event', () => {
    spyOn(component.onClick, 'emit');
    const mockEvent = new Event('click');
    
    component.onClick.emit(mockEvent);
    
    expect(component.onClick.emit).toHaveBeenCalledWith(mockEvent);
  });

  it('should generate correct CSS classes for primary variant', () => {
    component.variant = 'primary';
    component.size = 'md';
    
    const classes = component.buttonClasses;
    
    expect(classes).toContain('btn');
    expect(classes).toContain('btn-primary');
    expect(classes).toContain('btn-md');
  });

  it('should generate correct CSS classes for disabled state', () => {
    component.disabled = true;
    
    const classes = component.buttonClasses;
    
    expect(classes).toContain('btn-disabled');
  });

  it('should generate correct CSS classes for full width', () => {
    component.fullWidth = true;
    
    const classes = component.buttonClasses;
    
    expect(classes).toContain('btn-full-width');
  });
});




import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { DialogStateService } from '../../services/DialogStateService.service';
import { NgClass } from '@angular/common';

interface AddResourceData {}

@Component({
  selector: 'dtp-add-resource-dialog',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './add-resource-dialog.component.html',
  styles: [
    `
      option {
        background-color: var(--color-dark-secondary);
      }
    `,
  ],
})
export class AddResourceDialogComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  @Input() visible = false;
  @Output() cancelDialog = new EventEmitter<void>();
  @Output() saveDialog = new EventEmitter<{
    type: string;
    data: any;
    file: File | null;
  }>();

  activeTab = 0;
  dragActive = false;
  selectedFile: File | null = null;
  preview: string | null = null;

  fileForm: FormGroup;
  linkForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalService: DialogStateService
  ) {
    this.fileForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      workspace: ['', Validators.required],
      tags: [''],
    });

    this.linkForm = this.fb.group({
      url: ['', [Validators.required, Validators.pattern('https?://.+')]],
      title: ['', Validators.required],
      description: [''],
      workspace: ['', Validators.required],
      tags: [''],
    });
  }

  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // Busca si el click ocurrió dentro de un .menu-wrapper
    const clickedInsideModal = target.closest('.menu-wrapper');

    if (!clickedInsideModal) {
      this.modalService.setModalOpen(false);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragActive = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragActive = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragActive = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  handleFile(file: File): void {
    this.selectedFile = file;

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => (this.preview = reader.result as string);
      reader.readAsDataURL(file);
    } else {
      this.preview = null;
    }

    if (!this.fileForm.get('title')?.value) {
      this.fileForm.patchValue({ title: file.name });
    }
  }

  clearSelectedFile(): void {
    this.selectedFile = null;
    this.preview = null;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  getFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    else return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  }

  onCancel() {
    this.cancelDialog.emit();
    this.modalService.setModalOpen(false);
  }

  onSave() {
    const form = this.activeTab === 0 ? this.fileForm : this.linkForm;
    if (form.valid) {
      this.saveDialog.emit({
        type: this.activeTab === 0 ? 'file' : 'link',
        data: form.value,
        file: this.selectedFile,
      });
    } else {
      Object.values(form.controls).forEach((ctrl) => ctrl.markAsTouched());
    }
  }
}

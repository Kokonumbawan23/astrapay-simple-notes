import { NoteService } from './../../service/note.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { NoteDto } from '../../dto/NoteDto';
import { AxiosError } from 'axios';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-note',
  standalone: false,
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
})
export class NoteComponent implements OnInit {
  constructor(
    private confirmationservice: ConfirmationService,
    private noteService: NoteService
  ) {}

  data: NoteDto[] = [];
  error: Partial<AxiosError> = {};
  formVisibility: boolean = false;
  formType: string = 'Create';

  formGroup: FormGroup = new FormGroup({
    id: new FormControl(null),
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  async ngOnInit(): Promise<void> {
    try {
      this.data = await this.noteService.getNotes();
    } catch (error) {
      this.error = error as AxiosError;
    }
  }

  showEditForm(note: NoteDto) {
    this.formType = 'Edit';
    this.formGroup.patchValue(note);
    this.formVisibility = true;
  }

  showCreateForm() {
    this.formType = 'Create';
    this.formVisibility = true;
  }

  async submitForm() {
    this.formVisibility = false;
    let response;
    try {

      if (this.formType === 'Create') {
        this.formGroup.removeControl('id');
        response = await this.noteService.createNote(this.formGroup.value);
        if (response === 'Success') {
          this.formGroup.reset();
        }
      } else if (this.formType === 'Edit') {
        response = await this.noteService.updateNote(
          this.formGroup.value.id,
          this.formGroup.value
        );
        this.formGroup.addControl('id', new FormControl(null));
        if(response === 'Success') {
          this.formGroup.reset();
        }
      } else {
        console.log(this.formGroup);
        response = await this.noteService.deleteNote(this.formGroup.value.id);
      }
      this.data = await this.noteService.getNotes();
    } catch (error) {
      this.error = error as AxiosError;
    }
  }

  confirmDelete(note: NoteDto) {
    this.formType = 'Delete';
    this.formGroup.patchValue(note);
    console.log(this.formGroup);
    this.confirmationservice.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Deletion',
      icon: 'pi pi-trash',
      accept: this.submitForm.bind(this),
      reject: () => {},
    });
  }
}

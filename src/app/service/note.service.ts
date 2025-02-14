import { CreateUpdateNoteRequestDto } from '../dto/CreateUpdateNoteRequestDto';
import { Injectable } from '@angular/core';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { NoteDto } from '../dto/NoteDto';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private apiUrl = 'http://localhost:8000/v1/notes/';

  async getNotes(): Promise<NoteDto[]> {
    const response = await axios.get(`${this.apiUrl}`);
    const notes: NoteDto[] = response.data.data.notes;
    return notes;
  }

  async createNote(
    reqDto: CreateUpdateNoteRequestDto
  ): Promise<String> {
    const response = await axios.post(`${this.apiUrl}`, reqDto);

    const status = response.data.message;

    return status;
  }

  async updateNote(
    id: number,
    reqDto: CreateUpdateNoteRequestDto
  ): Promise<String> {
    const response = await axios.put(`${this.apiUrl}${id}`, reqDto);

    const status = response.data.message;
    return status;
  }

  async deleteNote(id: number): Promise<String> {
    const response = await axios.delete(`${this.apiUrl}${id}`);

    const status = response.data.message;
    console.log(status);
    return status;
  }
}

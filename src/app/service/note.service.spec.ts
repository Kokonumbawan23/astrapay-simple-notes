import { TestBed } from '@angular/core/testing';

import { NoteService } from './note.service';

describe('NoteService', () => {
  let service: NoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return notes', async () => {
    const notes = await service.getNotes();
    expect(notes).toBeTruthy();
  });

  it('should create a note', async () => {
    const note = await service.createNote({
      title: 'Test Note',
      content: 'Test Content',
    });
    expect(note).toBe('Success');
  });

  it('should update a note', async () => {
    const note = await service.updateNote(0, {
      title: 'Test Note',
      content: 'Test Content',
    });
    expect(note).toBe('Success');
  });

  it('should delete a note', async () => {
    const note = await service.deleteNote(0);
    expect(note).toBe('Success');
  });
});

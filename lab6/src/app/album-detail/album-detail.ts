import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable, switchMap } from 'rxjs';
import { Album } from '../models/album';
import { AlbumService } from '../services/album.service';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './album-detail.html',
  styleUrls: ['./album-detail.css']
})
export class AlbumDetailComponent implements OnInit {
  album$!: Observable<Album>;
  editedTitle: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService
  ) { }

  ngOnInit(): void {
    this.album$ = this.route.params.pipe(
      switchMap(params => {
        const id = +params['id'];
        return this.albumService.getAlbum(id);
      })
    );

    this.album$.subscribe(album => {
      this.editedTitle = album.title;
    });
  }

  saveTitle(album: Album): void {
    const updatedAlbum: Album = {
      ...album,
      title: this.editedTitle
    };

    this.albumService.updateAlbum(updatedAlbum).subscribe({
      next: (updated) => {
        console.log('Album updated:', updated);
        alert('Album title updated successfully!');
      },
      error: (error) => {
        console.error('Error updating album:', error);
        alert('Failed to update album. Please try again.');
      }
    });
  }

  viewPhotos(id: number): void {
    this.router.navigate(['/albums', id, 'photos']);
  }

  goBack(): void {
    this.router.navigate(['/albums']);
  }
}

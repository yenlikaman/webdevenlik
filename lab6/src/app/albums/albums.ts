import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Observable, BehaviorSubject, catchError, of } from 'rxjs';
import { Album } from '../models/album';
import { AlbumService } from '../services/album.service';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './albums.html',
  styleUrls: ['./albums.css']
})
export class AlbumsComponent implements OnInit {
  albums$!: Observable<Album[]>;
  loading$ = new BehaviorSubject<boolean>(true);
  error$ = new BehaviorSubject<string | null>(null);

  constructor(
    private albumService: AlbumService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAlbums();
  }

  loadAlbums(): void {
    this.loading$.next(true);
    this.error$.next(null);

    this.albums$ = this.albumService.getAlbums().pipe(
      catchError(error => {
        this.error$.next('Failed to load albums. Please try again.');
        this.loading$.next(false);
        return of([]);
      })
    );

    this.albums$.subscribe(() => {
      this.loading$.next(false);
    });
  }

  navigateToAlbum(id: number): void {
    this.router.navigate(['/albums', id]);
  }

  deleteAlbum(id: number, event: Event): void {
    event.stopPropagation();

    if (confirm('Are you sure you want to delete this album?')) {
      this.albumService.deleteAlbum(id).subscribe({
        next: () => {
          this.loadAlbums();
        },
        error: (error) => {
          console.error('Error deleting album:', error);
          alert('Failed to delete album. Please try again.');
        }
      });
    }
  }
}

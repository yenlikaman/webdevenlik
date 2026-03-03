import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Photo } from '../models/photo';
import { AlbumService } from '../services/album.service';

@Component({
  selector: 'app-album-photos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './album-photos.html',
  styleUrls: ['./album-photos.css']
})
export class AlbumPhotosComponent implements OnInit {
  photos$!: Observable<Photo[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.photos$ = this.albumService.getAlbumPhotos(id);
  }

  goBack(): void {
    const id = this.route.snapshot.params['id'];
    this.router.navigate(['/albums', id]);
  }
}

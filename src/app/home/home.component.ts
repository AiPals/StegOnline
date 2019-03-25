import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  imageTitle: string;
  uploadImageText: string;
  dragDropText: string;
  dragOverDropper: boolean;

  constructor(private imageService: ImageService) { }

  uploadImage(input: any) {
    //Handle file upload on homescreen
    if (input.target.files && input.target.files[0]) {
      var file: File = input.target.files[0];

      if (!file.type.match(/image\/.*/)) {
        this.dragDropText = `"${file.name}" is not a valid image file.`;
        return;
      }

      var reader: FileReader = new FileReader();
      reader.onload = async (event: Event) => {
        this.uploadImageText = "CHANGE IMAGE";
        this.dragDropText = `"${file.name}" loaded successfully!`;
        this.imageTitle = file.name;
        this.imageService.fileName = file.name;
        this.imageService.initiateImage((reader.result as string), true);
      };
      reader.readAsDataURL(file);
    }
  }

  toggleDrag() {
    //Handle drag over upload box
    this.dragOverDropper = !this.dragOverDropper;
  }

  ngOnInit() {
    this.dragOverDropper = false;
    this.uploadImageText = "UPLOAD IMAGE";
    this.dragDropText = "Drag and drop your image here";
  }

}
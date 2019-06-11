import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {
  form: FormGroup;
  error: any;
  userId = 1;
  uploadResponse: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private uploadService: UploadService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      avatar: ['']
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);

      this.form.get('avatar').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('avatar', this.form.get('avatar').value);

    this.uploadService.upload(formData).subscribe(
      res => {
        console.log(res);
        this.uploadResponse = res;
      },
      err => (this.error = err)
    );
  }
}

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
  files = [];
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

      for (let index = 0; index < event.target.files.length; index++) {
        const element = event.target.files.item(index);
        const id = new Date().getTime();
        this.files.push({
          id,
          name: element.name,
          size: element.size,
          file: element
        });
      }

      this.files.forEach(v => {
        if (!v.status) {
          const formData = new FormData();
          formData.append('avatar', v.file);
          this.uploadService.upload(formData).subscribe(
            res => {
              console.log(res);
              if (res.status) {
                v.progress = res.progress;
              } else if (res.msg) {
                v.status = res.msg;
              }
            },
            err => (this.error = err)
          );
        }
      });
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

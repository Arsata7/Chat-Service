import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MsgService } from '../msg.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent implements OnInit {
  @Input() userID: number | undefined;
  messages: any[] = [];
  form: FormGroup;
  constructor(fb: FormBuilder, private msgService: MsgService) {
    this.form = fb.group({
      message: [''],
      picture: [''],
    });
  }
  ngOnInit(): void {
    this.msgService.msgObservable$.subscribe((msg) => {
      this.messages.push(msg);
    });
  }
  displayMessages() {
    const picture =
      this.userID === 1
        ? `assets/images/man-portrait.jpg`
        : `assets/images/woman-portrait.jpg`;
    this.form.controls['picture'].setValue(picture);
    const msgs = {
      message: this.form.get('message')?.value,
      userID: this.userID,
      picture: this.form.get('picture')?.value,
    };
    this.msgService.sendMessage(msgs);
    this.form.reset();
  }
}

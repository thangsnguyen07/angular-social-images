import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-followers-popup',
  templateUrl: './followers-popup.component.html',
  styleUrls: ['./followers-popup.component.scss'],
})
export class FollowersPopupComponent implements OnInit {
  @Output() onClose: EventEmitter<void> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  handleClose() {
    this.onClose.emit();
  }

  faClose = faXmark;
}

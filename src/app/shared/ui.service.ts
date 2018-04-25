import { Subject } from 'rxjs/Subject';
import { MatSnackBar } from '@angular/material';

export class UIService {

  loadingStateChanged = new Subject<boolean>();

  constructor(private snackBar: MatSnackBar) {}

  showSnackbar(message, action, duration) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }
}

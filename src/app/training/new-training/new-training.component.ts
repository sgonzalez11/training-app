import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  trainings: Observable<Exercise[]>;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    this.trainings = this.db
      .collection('availableExercises')
      .snapshotChanges()
      .map(docArray => {
        // the map belows is just a javascript map function is not part of rxjs operators.
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data().name,
            duration: doc.payload.doc.data().duration,
            calories: doc.payload.doc.data().calories,
          };
        });
      });
      // this.trainings = this.trainingService.getAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}

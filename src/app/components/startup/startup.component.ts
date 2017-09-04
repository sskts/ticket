/**
 * StartupComponent
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.scss']
})
export class StartupComponent implements OnInit {
  public config: Object;
  public tutorial: boolean;
  public step: number;

  constructor() { }

  public ngOnInit() {
    this.step = 0;
    this.tutorial = false;
    this.config = {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      spaceBetween: 30,
      onSlideNextEnd: (a, b, c) => {
        this.step += 1;
      },
      onSlidePrevEnd: () => {
        this.step -= 1;
      }
    };
    this.tutorialStart();
  }

  private tutorialStart() {
    const timeout = 3000;
    setTimeout(
      () => {
        this.step = 1;
        this.tutorial = true;
      },
      timeout);
  }

}

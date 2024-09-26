import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Category } from '../../../core/models';
import { Filters } from '../../../core/models/filters.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {  Location } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { MultiRangeSliderComponent } from '../multi-range-slider/multi-range-slider.component';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, MultiRangeSliderComponent],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent implements OnInit {

  @Input() listCategories: Category[] = [];
  @Output() eventofiltros: EventEmitter<Filters> = new EventEmitter();

  routeFilters: string | null = null;
  filters!: Filters 

  id_cat: string = "";
  // salary_max: number | undefined;
  // salary_min: number | undefined;
  
  
  
  
  
  
  
  
  
  
  
  //valores por defect
  salary_min: number = 0;
  salary_max: number = 2000;

  updateMinPrice(newMinPrice: number): void {
    this.salary_min = newMinPrice;
    console.log(this.salary_min);
  }

  updateMaxPrice(newMaxPrice: number): void {
    this.salary_max = newMaxPrice;
    console.log(this.salary_max);
  
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  constructor( private ActivatedRoute: ActivatedRoute, private Router: Router, private Location: Location ) 
  {
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
  }

    ngOnInit() : void {
      this.ActivatedRoute.snapshot.paramMap.get('filters') != undefined ? this.Highlights() : "";
      this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
    }

    public filter_jobs() {

      this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
      console.log(this.routeFilters);
      
      if (this.routeFilters != null) {
        this.filters = new Filters();
        this.filters = JSON.parse(atob(this.routeFilters));
        console.log(this.filters.category);
      } else {
        this.filters = new Filters();
      }
      if (this.id_cat) {
        this.filters.category = this.id_cat;
      }
      
      //this.salary_calc(this.salary_min, this.salary_max);
      this.filters.salary_min = this.salary_min ? this.salary_min : undefined;
      this.filters.salary_max = this.salary_max == 0 || this.salary_max == null ? undefined : this.salary_max;

      setTimeout(() => {
          this.Location.replaceState('/shop/' + btoa(JSON.stringify(this.filters)));
          this.eventofiltros.emit(this.filters);
      }, 200);

    }

  // public salary_calc(salary_min: number | undefined, salary_max: number | undefined) {    
  //     if (typeof salary_min == 'number' && typeof salary_max == 'number') {
  //       if(salary_min > salary_max){
  //         this.salary_min = salary_max;
  //         this.salary_max = salary_max;
  //       }else{
  //         this.salary_min = salary_min;
  //         this.salary_max = salary_max;
  //       }
  //     }
  //   }
    

    public remove_filters(){
      window.location.assign("http://localhost:4200/shop")
      this.filters.category && this.id_cat === "";
      this.filters.salary_min = undefined;
      this.filters.salary_max = undefined;
    }

    Highlights() {
      let routeFilters = JSON.parse(atob(this.ActivatedRoute.snapshot.paramMap.get('filters') || ''));
      
      if (routeFilters.search == undefined) {
        this.id_cat = routeFilters.category || '';
        this.salary_min = routeFilters.salary_min;
        this.salary_max = routeFilters.salary_max;
      }
    }
}
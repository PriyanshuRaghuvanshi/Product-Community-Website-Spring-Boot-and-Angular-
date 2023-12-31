import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-review',
  templateUrl: './show-review.component.html',
  styleUrls: ['./show-review.component.css']
})
export class ShowReviewComponent implements OnInit {
  constructor(private service: ServicesService, private router: Router) { }
  review: any
  p: any
  product: any
  ngOnInit(): void {
    this.service.showReviews(localStorage.getItem("reviewProductId")).subscribe(
      (data)=> {
       
        this.p = localStorage.getItem("products");
        if(this.p!=null)
        {
          this.p = JSON.parse(this.p);
          this.p.forEach((element: any) => {
            if(element.productId == localStorage.getItem("reviewProductId"))
              {
                this.product = element;
            }
          });
        }
          
        this.review = data},
      (err)=> console.log(err)
      )
  }

  logout(){
    this.service.logout();
    this.router.navigate(['login']);
  }

  loggedIn(){
    return this.service.isLogIn();
  }
  currentUser(){
    return this.service.getUser().firstName+" "+this.service.getUser().lastName;
  }

  routerHome(){
    window.location.href = "home";
  }
}

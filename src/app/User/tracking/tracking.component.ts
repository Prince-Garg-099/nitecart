import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/Admin/services/admin.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
  getOrderId: any;
  getParamorderid: any;
  Orders: any;

  constructor(public adminservice: AdminService, private service: UserService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.getParamorderid = this.router.snapshot.paramMap.get('order_id');
    if (this.getParamorderid) {
      this.service.getSingleData(this.getParamorderid).subscribe((res) => {
        this.Orders = res.datas
      });
    }
  }

}

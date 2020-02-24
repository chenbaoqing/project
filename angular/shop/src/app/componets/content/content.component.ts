import { Component, OnInit } from '@angular/core';
import cartList from './data'
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  public cartList: any = cartList
  public checked: boolean = true
  public total:Number 
  constructor() { }

  ngOnInit() {
  }
  handleChange() {
    // var checked = this.checked
    // var cartList = this.cartList
    // cartList.forEach(item => (item.isSelected = checked));
    // this.cartList = cartList
    this.cartList.forEach(item => (item.isSelected = this.checked));

  }
  onChange() {
    // var cartList = this.cartList
    // var checked = cartList.every(item => item.isSelected)
    // this.checked = checked
     this.checked = this.cartList.every(item => item.isSelected)
  }
  sum(){
    var total = 0;
    var cartList = this.cartList
    for(let i=0;i<cartList.length;i++){
      if(cartList[i].isSelected){
        total=total+cartList[i].productCount+cartList[i].productPrice;
      }else{
        continue;
      }
    }
    return total.toFixed(2);
  }
  sub(a,b){
    return (a*b).toFixed(2)
  }
  handleDel(ite){
    var cartList=this.cartList.filter(item=>item!==ite)
    this.cartList=cartList
  }
}
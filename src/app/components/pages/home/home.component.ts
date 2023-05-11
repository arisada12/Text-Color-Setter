import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  bgColorForm!:FormGroup
  show = false
  isSubmited = false
  aColor:string = "gray"
  value:string = "white"
  fontColor:string = "gray"
  borderColor!:string

  constructor(private formBuilder:FormBuilder){
    this.bgColorForm = formBuilder.group({
      bgColor: ["", [Validators.required]]
    })
  }

  get fc(){
    return this.bgColorForm.controls
  }

  submit(){
    this.isSubmited = true
    if(this.bgColorForm.invalid) return
    const fv = this.bgColorForm.value
    this.value = fv.bgColor
    if(fv.bgColor === "#ffffff"){
      this.aColor = "black"
      this.borderColor = "black"
    }else{
      this.aColor = fv.bgColor
      this.borderColor = "white"
    }
    let color = this.value.replace("#", "")
    //convert hex to rgb
    let red = parseInt(color.substring(0,2),16)
    let green = parseInt(color.substring(2,4),16)
    let blue = parseInt(color.substring(4,6),16)
    //check itensity
    let intensity = (red * 0.3) + (green * 0.6) + (blue * 0.1) //ratio 30% red 60% green 10% blue
    if(intensity > 181){ // just divided 361/2 = 180.5 > 181 and it work great! But, if you prefer 255/2 it's up to you
      this.fontColor = "black"
    }else{
      this.fontColor = "white"
    }
    this.show = true
  }
}

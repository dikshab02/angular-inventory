import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DialogData } from '../inventory/inventory.component';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
unit: any[] = [];

  popUpForm2 = new FormGroup({
    name: new FormControl<string>(''),
    description: new FormControl<string>(''),
    measureUnit: new FormControl<string>(''),
    imageUrl: new FormControl<string>('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXwBFRcXHhoeOyEhO3xTRlN8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fP/AABEIAIIAbwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAACBQEGB//EADoQAAICAQIEAwYCBgsAAAAAAAECAAMRBCEFEjFBUWFxExQiMpHBgaEGFSMzUuE0NkJDRHKxstHw8f/EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACERAAMBAAMAAgIDAAAAAAAAAAABAhEDEjEiQSFREyNx/9oADAMBAAIRAxEAPwBljBMZYtBsZmZnCZOaUJleaIA3NKM0GWlWaMRYvBM+ZVmlC0QHWMCxlyYJjJYipM6pgyZdYgDpDpAJD1ykA3mVJnMzhMoo4TKzpnMQA5OMIVELEBQST2EYGgbH7R1Q+HUyXSn0l0l6ZrCDM1Tw5WB5LxzeBXaZ+pofT2FLFwex7EeIkq5rxhui7GCYy7GBYxgQneXSCzCJABhIwkXSHSUhhQ0mYJWlwYAWlgJUS4gAxRZ7PZdnY488Smpu1aAe7UixubcEgbY84Fms5uWsEtsRjtNGgWW1qWHx43nPSbrc0OSVGPd04Fbbcc2N8dMyayn3nSlcftEHMuP9PxhVqIbcYMKwCDPfynI6c1qJk8i5gWM0+Mab2N/tFH7Ozf0PcTLaehL7LSjghkgRDJKAYSHSASHSMAatLhouGlw0QDAaXDRcNLBowG6LfZ2q+AceM2arDyAk4nnlbcTYrckAzLlupWImpTesZv1Ps6SxUEZx5xJrvaZ5SAR2ndYSdOQNpnLbyjm6zlmNWj7DuorGr0r19yMrns08y4KsQRgjYgz0ldoPKVGTjfzES4zov8VUMq3z+vjNuN9fix+mMBvDViUAhkE6ADIIwggUEOojAzgZZWg5YRAGBlwYIGWEoAwM0KdTkcp9JmAy6sQwwdplyzqJo07mL6Zpm1tmaWmKWoUbvMq9Dpr2rYEY6ZmEfokZrfkJwdpoU2JZV7OwZVxysJkLZG6WwFOds9IUg3DMvoNF7V9QDsfEdpEEc4hVi0+W49D/ADiyidEPVptU9WFQQ6QKw6SyTKkEkkYywMuDBZnQ0BBwZYNAhp3mh6A5RdymPX1pr6AG+GwfK32mQjDO8e01rA8v0M4+SHL1CEGSymwpYpDCMVOekZ1oFyBm+dYgjMoyNx4iNPsjOlg7q3Bpqs64PKfMGKAYOIRrVs0zqDvsR9ZNPTZqDy1LzMBkiacZ1r5cCf2nhFhkh6+F6k9VC+pjCcJu7ss20yw82Zwz0Cfo8n9u0n0jFfAtKvVSx8zGB5YZPTeGq0t9vyVMfwnsKeHVIMJSPpO6x6uG6N9TcPhXoq9WPYRaGM81VwfVP1AUecfp/R/OOew58ofg3EdfqrnOt0S1acjKMAVIPhgneaj6vlHwKE8z1k1fU1niqjP/AFfodAoa/GcZwepmPqH921PvN9+QRlaa0+FR23+83L3LnmY5bz6/SZC1i5uW1xU9WVZX25kztM+zr/DX+GZRn8S4o+pvDU1clajBztmV01d7c7KAWTBdM9QRsRL6vm5ymnNTH+FBzExVNVrtLdzMqErsVtQETRSsxGTifGOErdXlcf8Ae0FVrLtDfVqqQSajiwDuh6xu4niOk9/0qDnr+G5FADL9NiPDvA6LUjT6ujUOA1Z6+DKdj99oJYyI/q1fTPW6fVvqaltoZnrcZUis7xkG8bFHbz2H3gOF6T9XtdXSwOifFlS53QnqPToR+M0PaCHVfs27b9C3slQZsYAQJ1tCnlpQ2t5CA91DHN9jWHwzLc61jkqT0VRI1inibCNqL2+YrWPBdzKOAMM+MjcFzkj/AIlq9Ne55rD7PyG5jVejrQ8xXmbxbeJS2a/CPBHkst+TOP4jsIWrh2f3ljHPXG385ohAJDLUL7JfK34LWaHT26dqHqBqYYI6fnPAcV4e3Dte2iuctQfiqduwPQ/Yz6HYSAfynlf0qqOo91dh8SqwPptLTz8EY3+TF4ZS9NtzOpR0PJg9Qe8Hq3NhJPckzdfSkcO0uqI3ZeSz/MNgfoPymEFLekPsifWX4NrTw/XpY37l/gtHip7/AIdZtazhR0uv9koB02oOQCNlbxmF7DqQNp61HbUcL0rE5b2YGe+emfyiZblUsY1w42LpxXZtybKfEQyM2d//ACLU8wZQdgIdep5RnpINInqsKWk4HrDcNANPMQOYscnvJJJXppfg6vzkdpedkm5ylRKt834SSRDKW9phcb+Wv1P2kkkP00XgR/6tWep/3TyyTskoygJ/cz0Gh/oWn9PuZJIM1Q9X+5z3l6O85JILR//Z')
  });
  constructor(public dialogRef: MatDialogRef<AddProductComponent>,
    public productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  submitForm2() {
    this.dialogRef.close(this.popUpForm2.value);
  }

  onNoClick() {
    this.dialogRef.close();
  }

}

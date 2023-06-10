import { Component, OnInit } from '@angular/core';
import { specialities } from "../Doctor_Specialities";
import { DoctorType } from "../../types/doctor.type";
import { DoctorService } from "../service/doctor.service";

@Component({
  selector: 'app-doctor-add',
  templateUrl: './doctor-add.component.html',
  styleUrls: ['./doctor-add.component.css']
})
export class DoctorAddComponent implements OnInit {
  image_url: string | undefined;
  model: DoctorType = {
    imageHash: "",
    Doj: null,
    city: "",
    docID: "",
    emailID: "",
    fName: "",
    lName: "",
    phone: null,
    state: "",
    department: "",
    document: ""
  };
  Specialities: string[] = specialities;

  selectedDocument: File | null | undefined = null;
  selectedImage: File | null | undefined = null
  prgShow: boolean = false;
  prgSuccess: boolean = false;
  prgWarning: boolean = false;
  prgMsg: string = "Laoding...";

  constructor(private ds: DoctorService) {
  }

  ngOnInit(): void {
  }

  previewImage(event: any) {
    this.selectedImage = (event.target as HTMLInputElement).files?.item(0)
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.image_url = event.target.result;
        if (this.image_url != null) {
          this.model.imageHash = this.image_url
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  onDocumentSelected(ev: Event) {
    this.selectedDocument = (ev.target as HTMLInputElement).files?.item(0)
  }

  onAddDocSubmit() {
    this.prgShow = true
    this.prgMsg = "Uploading data to IPFS"
    this.ds.uploadDocument(this.selectedDocument).then((docIPFS: string) => {
      this.model.document = docIPFS
      this.ds.uploadImage(this.selectedImage).then((imgIPFS: any) => {
        this.model.imageHash = imgIPFS
        this.prgMsg = "Adding doctor to Blockchain Network"
        this.ds.addDoctorToNetwork(this.model).then((r: boolean) => {
          this.prgSuccess = true
          this.prgMsg = "doctor Added to Network"
          this.model = {
            imageHash: "",
            Doj: null,
            city: "",
            docID: "",
            emailID: "",
            fName: "",
            lName: "",
            phone: null,
            state: "",
            department: "",
            document: ""
          }
        }).catch((er: any) => {
          this.prgWarning = true
          this.prgMsg = "Adding Doctor Failed"
          console.log(er)
        })
      })
    })
  }

  closePrg() {
    this.prgShow = false
    this.prgSuccess = false
    this.prgWarning = false
    this.prgMsg = "Laoding...!"
  }
}

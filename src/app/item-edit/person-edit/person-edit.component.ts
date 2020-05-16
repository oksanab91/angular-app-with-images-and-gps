import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import {
  PersonListStore, PersonStore, ModalImageStore, 
  personSelect, imageUrlSelect, imageCaptionSelect } from '@core/store';
import { PersonService, AlertService } from '@core/service';
import { Person } from '@models/models';
import { fadeInAnimation } from 'src/app/app-animations';


@Component({
  selector: 'person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss'],  
  animations: [fadeInAnimation]  
})
export class PersonEditComponent implements OnInit, OnDestroy {  
  person: Person;
  personId = -1;  
  formMode: string ='edit';
  personForm: FormGroup;
  addressGroup: FormGroup;
  pictureGroup: FormGroup;  
  subscriptionModal: Subscription;
  subscriptionAlert: Subscription;
  
  constructor(private listStore: PersonListStore,
              public personStore: PersonStore,
              private modalStore: ModalImageStore,
              private personService: PersonService,
              private route: ActivatedRoute, 
              private alertService: AlertService) {

      // this.getModalPictureResult();       
  }

  async ngOnInit() {    
    this.alertService.reset();
    this.modalStore.reset();

    this.personId = + this.route.snapshot.paramMap.get('id');    
    this.personId = this.personId ? this.personId : -1;
    this.formMode = this.personId<0 ? 'add' : 'edit';   
   
    this.buildForm()
    await this.getPerson();    
    this.personForm.patchValue(this.person);
  }

  buildForm(){
    this.addressGroup = new FormGroup({
      street: new FormControl(),
      city: new FormControl(),
      country: new FormControl(),
      state: new FormControl(),
      postalcode: new FormControl()
    });

    this.pictureGroup = new FormGroup({      
      url: new FormControl(),
      caption: new FormControl()      
    });

    this.personForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      position: new FormControl(),        
      company: new FormControl(),

      address: this.addressGroup,

      shortAddress: new FormControl(),     
      phone: new FormControl('',[Validators.required, Validators.pattern(/^(\({1}\+{1}\d+\){1})?(\({1}\d+\){1})?([0-9]+)$/)]),  

      picture: this.pictureGroup
    });
    
  }
  
  async onSubmit() {    
    this.shortAddress.setValue(this.setShortAddress());    

    if(this.formMode == 'edit') await this.updatePerson(this.personForm.value);
    else this.addPerson(this.personForm.value);

    await this.getPerson();
    this.personForm.reset(this.person);
  }

  get name() {
    return this.personForm.get('name');
  }

  get phone() {
    return this.personForm.get('phone');
  }

  get url() {
    return this.pictureGroup.get('url');
  }
  get caption() {
    return this.pictureGroup.get('caption');
  }

  get shortAddress() {    
    return this.personForm.get('shortAddress');
  }  

  get street() {
    return this.addressGroup.get('street');
  }

  setShortAddress(): string {
    return this.personService.buildShortAddress(this.addressGroup.value);    
  }

  async getPerson() {
    if(this.personId<0) this.personStore.init();
    else {
      await this.listStore.load();
      this.personStore.load(this.personId);
    }
    
    this.person = personSelect(this.personStore.state);    
  }

  async updatePerson(person: Person) {
    await this.personStore.update(person);

    if(this.subscriptionAlert) this.subscriptionAlert.unsubscribe();
    this.subscriptionAlert = this.personStore.state$.pipe(take(1)).subscribe(res => this.alertService.set(res.message));
    
    await this.listStore.load();
  }

  async addPerson(person: Person) {
    await this.personStore.create(person);    

    if(this.subscriptionAlert) this.subscriptionAlert.unsubscribe();
    this.subscriptionAlert = this.personStore.state$.pipe(take(1)).subscribe(res => this.alertService.set(res.message));
    
    await this.listStore.load();
  }

  openModalPicture() {   
    this.modalStore.reset();
    this.modalStore.open(this.pictureGroup.value);

    this.getModalPictureResult();
  }  

  async getModalPictureResult() {        
    if(this.subscriptionModal) this.subscriptionModal.unsubscribe();
    
    this.subscriptionModal = this.modalStore.state$.subscribe(
      state => {        
        if(state.image && imageUrlSelect(state)) 
          { this.pictureGroup.setValue({url: imageUrlSelect(state), caption: imageCaptionSelect(state)}) }
      }
    );    
  }

  ngOnDestroy() {
    if(this.subscriptionModal) this.subscriptionModal.unsubscribe();
    if(this.subscriptionAlert) this.subscriptionAlert.unsubscribe();
  }

}

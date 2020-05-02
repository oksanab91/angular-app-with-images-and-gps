import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person, Picture } from '@models/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PersonService, AlertService, ModalService } from '@core/service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent implements OnInit, OnDestroy {  
  person: Person;
  persontId = -1;
  personPicture = new Picture();
  defaultPicture: Picture = {url: "assets/empty.jpg", caption: 'Empty'};
  formMode: string ='edit';
  personForm: FormGroup;
  addressGroup: FormGroup;  
  subscriptionModal: Subscription;
  subscriptionAlert: Subscription;
  
  constructor(private personService: PersonService, 
              private route: ActivatedRoute, 
              private alertService: AlertService,
              private modalService: ModalService) {

      this.getModalPictureResult();       
  }

  ngOnInit() {    
    this.alertService.reset();
    this.modalService.reset();

    this.persontId = + this.route.snapshot.paramMap.get('id');    
    this.persontId = this.persontId ? this.persontId : -1;
    this.formMode = this.persontId<0 ? 'add' : 'edit';   
   
    this.buildForm();

    this.person = this.getPerson();
    if(this.person.picture && this.person.picture.url) this.personPicture = {...this.person.picture};
    else this.personPicture = {...this.defaultPicture};

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

    this.personForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      position: new FormControl(),        
      company: new FormControl(),

      address: this.addressGroup,

      shortAddress: new FormControl(),     
      phone: new FormControl('',[Validators.required, Validators.pattern(/^(\({1}\+{1}\d+\){1})?(\({1}\d+\){1})?([0-9]+)$/)]),  
      picture: new FormGroup({
        url: new FormControl(this.defaultPicture.url),
        caption: new FormControl(this.defaultPicture.caption)
      })
    });
    
  }
  
  onSubmit() {    
    this.shortAddress.setValue(this.setShortAddress());
    this.url.setValue(this.personPicture.url);
    this.caption.setValue(this.personPicture.caption);   

    if(this.formMode == 'edit') this.updatePerson(this.personForm.value);
    else this.addPerson(this.personForm.value);
    
    this.person = this.getPerson();
            
    this.person = {...this.person, picture: this.person.picture.url ? this.person.picture : this.defaultPicture};
    this.personPicture = {...this.person.picture};        
    this.personForm.reset(this.person);    
  }

  get name() {
    return this.personForm.get('name');
  }

  get phone() {
    return this.personForm.get('phone');
  }

  get url() {
    return this.personForm.get('picture.url');
  }
  get caption() {
    return this.personForm.get('picture.caption');
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

  getPerson(): Person {
    if(this.persontId<0) return new Person();
    return this.personService.get(this.persontId);    
  }

  updatePerson(person: Person) {
    const alert = this.personService.update(person);
    if(this.subscriptionAlert) this.subscriptionAlert.unsubscribe();
    
    this.subscriptionAlert = alert.pipe(take(1)).subscribe(res => this.alertService.set(res));              
  }

  addPerson(person: Person) {
    const alert = this.personService.add(person);    
    if(this.subscriptionAlert) this.subscriptionAlert.unsubscribe();

    this.subscriptionAlert = alert.pipe(take(1)).subscribe(res => this.alertService.set(res));
  }

  openModalPicture() {    
    this.modalService.reset();
    this.modalService.open(this.personPicture);    
  }  

  getModalPictureResult() {        
    if(this.subscriptionModal) this.subscriptionModal.unsubscribe();
    
    this.subscriptionModal = this.modalService.sharedResult.subscribe(
      result => {
        if(result && result.url) this.personPicture = {...result};
      }
    );    
  }

  ngOnDestroy() {
    if(this.subscriptionModal) this.subscriptionModal.unsubscribe();
    if(this.subscriptionAlert) this.subscriptionAlert.unsubscribe();
  }

}

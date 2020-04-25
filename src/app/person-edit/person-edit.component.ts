import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person, Picture } from '../models/person';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PersonService } from '../service/person.service';
import { of, Observable, Subject, Subscription } from 'rxjs';
import { AlertService } from '../service/alert.service';
import { map, tap, take, switchMap } from 'rxjs/operators';
import { Alert } from '../models/Alert';
import { ModalService } from '../service/modal.service';

@Component({
  selector: 'person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent implements OnInit, OnDestroy {  
  person$: Observable<Person>;
  persontId = -1;
  personPicture = new Picture();
  defaultPicture: Picture = {url: "assets/empty.jpg", caption: 'Empty'};
  formMode: string ='edit';
  personForm: FormGroup;
  addressGroup: FormGroup;  
  subscriptionModal: Subscription;
  
  constructor(private personService: PersonService, 
              private route: ActivatedRoute, 
              private alertService: AlertService,
              private modalService: ModalService) {

      this.getModalResult();       
  }

  ngOnInit() {    
    this.alertService.reset();
    this.modalService.reset();

    this.persontId = + this.route.snapshot.paramMap.get('id');    
    this.persontId = this.persontId ? this.persontId : -1;
    this.formMode = this.persontId<0 ? 'add' : 'edit';   
   
    this.buildForm();

    this.person$ = this.getPerson().pipe(
      tap(person => {
        if(person.picture && person.picture.url) this.personPicture = {...person.picture};
        else this.personPicture = {...this.defaultPicture};

        this.personForm.patchValue(person)}
        ));
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

    this.updatePerson(this.personForm.value);
    
    this.person$ = this.getPerson().pipe(
      map(person => {        
        const obj = {...person, picture: person.picture.url ? person.picture : this.defaultPicture};
        this.personPicture = {...obj.picture};        
        this.personForm.reset(obj);
        
        return obj;
      }
    ));
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

  setShortAddress(): string {
    return this.personService.buildShortAddress(this.addressGroup.value);    
  }

  get street() {
    return this.addressGroup.get('street');
  }

  getPerson() {
    if(this.persontId<0) return of(new Person());
    return this.personService.get(this.persontId);    
  }

  updatePerson(person) {
    const updated = this.personService.update(person);    
    let alert;

    updated.pipe(take(1)).subscribe(item => {  
      if(item) {
        alert = this.getSuccess(item.name);
      }
      else {
        alert = this.getError();    
      }

      this.alertService.set(alert);      
    });              
  }

  openModal() {    
    this.modalService.reset();
    this.modalService.open(this.personPicture)
      .pipe(take(1)).subscribe();
  }  

  getModalResult() {        
    if(this.subscriptionModal) this.subscriptionModal.unsubscribe();
    
    this.subscriptionModal = this.modalService.sharedResult.subscribe(
      result => {
        if(result && result.url) this.personPicture = {...result};
      }
    );    
  }

  private getSuccess(name: string): Alert {    
    const message = this.formMode === 'add' 
      ? `Thank you for adding ${name}` 
      : `Thank you for updating ${name}`;
      
    return {type: 'success', message: message};
  }

  private getError(): Alert {    
    return {type: 'danger', message: `Error updating`};
  }

  ngOnDestroy() {
    if(this.subscriptionModal) this.subscriptionModal.unsubscribe();    
  }

}

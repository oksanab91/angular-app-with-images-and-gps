import { Injectable } from '@angular/core';
import { Store } from './store';
import { PersonListState, PersonState } from './store-state';
import { Person } from '@models/models';
import { StoreService } from '@core/service';

@Injectable({
    providedIn: 'root'
})

//============== List Store ==================
export class PersonListStore extends Store<PersonListState> {    
    constructor (private mutator: StoreService) {
        super(new PersonListState());
        this.load();

        // super("todo", new TodoMutators(), new TodoState());
    }

    async load () {        
        const items = await this.mutator.load().toPromise();

        this.setState({
            ...this.state,
            list: [...items]            
        });
    }

    get (id: number) {
        const person = this.mutator.get(id);
        
        this.setState({
            ...this.state,
            person: {...person}
        });
    }
    
    removePerson (id: number, name: string) {
        let message = {type: 'warning', message: `${name} deleted successfully`};       
        if(id<0) message = {type: 'danger', message: `error deleting ${name}`};        

        this.setState({
            ...this.state,
            list: this.state.list.filter(item => item.id !== id),
            message: message
        });        
    }

    async search(filter: string) {
        const items = await this.mutator.search(filter).toPromise();
                
        this.setState({
            ...this.state,
            list: [...items]
        });
    }
}

export const personListSelect = (state: PersonListState) => state.list;
export const messageSelect = (state: PersonListState) => state.message;

//============== Person Store ==================

const InitPersonState: PersonState = {
    person: new Person({url: "assets/empty.jpg", caption: 'Image'}),
    message: null
}

@Injectable({
    providedIn: 'root'
})
export class PersonStore extends Store<PersonState> {
    constructor (private mutator: StoreService) {
        super(new PersonState());
        this.setState( InitPersonState );
    }

    load (id: number) {        
        const person = this.mutator.get(id);
        this.setState({
            ...this.state,
            person: {...person}
        });
    }

    init () {
        this.setState({
            ...InitPersonState
        });
    }
    
    async update (person: Person) {        
        const item = await this.mutator.update(person).toPromise();
        let message = {type: 'success', message: `Thank you for updating contact ${item.name}`};        
        if(!item) message = {type: 'danger', message: `Error updating contact ${person.name}`};

        this.setState({
            ...this.state,
            person: {...item},
            message: message
        });
                
    }

    async create (person: Person) {        
        const item = await this.mutator.add(person).toPromise();        
        let message = {type: 'success', message: `Thank you for adding contact ${item.name}`};        
        if(!item) message = {type: 'danger', message: `Error adding contact ${person.name}`};

        this.setState({
            ...this.state,
            person: {...item},
            message: message
        });
                
    }

}

export const personSelect = (state: PersonState) => state.person;
export const pictureSelect = (state: PersonState) => state.person.picture;
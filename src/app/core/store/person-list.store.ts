import { Injectable } from '@angular/core';
import { Store } from './store';
import { PersonListState, PersonState } from './person-list-state';
import { Person } from '@models/models';
import { StoreService } from '@core/service';

@Injectable({
    providedIn: 'root'
})
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

    async addPerson (person: Person) {
        const item = await this.mutator.add(person).toPromise();
        
        this.setState({
            ...this.state,
            list: [...this.state.list, item],
            message: {type: 'success', message: `Thank you for adding ${item.name}`}            
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

    async updatePerson (person: Person) {
        const ind = this.mutator.findIndex(person.id);
        const item = await this.mutator.update(person).toPromise();
        if(item) this.state.list[ind] = item;

        let message = {type: 'success', message: `Thank you for updating ${item.name}`};        
        if(!item) message = {type: 'danger', message: `Error updating ${person.name}`};

        this.setState({
            ...this.state,
            list: [...this.state.list],
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

@Injectable()
export class PersonStore extends Store<PersonState> {
    constructor (private mutator: StoreService) {
        super(new PersonState());
    }

    load (id: number) {
        const person = this.mutator.get(id);
        this.setState({
            ...this.state,
            person: {...person}
        });
    }
}
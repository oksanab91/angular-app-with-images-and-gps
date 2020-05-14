import { Injectable } from '@angular/core';
import { ModalImageState } from './store-state';
import { Store } from './store';
import { Picture } from '@models/models';


const InitModalImageState: ModalImageState = {
    image: {url: "assets/empty.jpg", caption: 'Image'},
    show: false,
    message: null
};

@Injectable()
export class ModalImageStore extends Store<ModalImageState> {
    constructor () {
        super(new ModalImageState());
        this.setState( InitModalImageState );
    }

    open(img: Picture) {
        if(!img) img = {url: "assets/empty.jpg", caption: 'Image'};        
        this.setState({
            ...this.state,
            image: {...img},
            show: true
        });
    }

    ok(img: Picture) {        
        this.setState({
            ...this.state,
            image: {...img},            
            show: false,
            message: 'ok'
        });
    }
    
    cancel() {
        this.setState({
            ...this.state,            
            show: false,
            message: 'cancel'
        });
    }
    
    reset() {        
        this.setState({
            ...InitModalImageState
        });  
    }

}

export const imageSelect = (state: ModalImageState) => state.image;
export const imageUrlSelect = (state: ModalImageState) => state.image.url;
export const imageCaptionSelect = (state: ModalImageState) => state.image.caption;
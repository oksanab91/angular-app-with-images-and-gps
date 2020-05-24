import { trigger, animate, transition, style, query, stagger } from '@angular/animations';

export const fadeInAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('fadeInAnimation', [

        // route 'enter' transition
        transition(':enter', [

            // css styles at start of transition
            style({ opacity: 0 }),

            // animation and styles at end of transition
            animate('.3s', style({ opacity: 1 }))
        ]),
    ]);

export const fadeInOutAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('fadeInOutAnimation', [

        // route 'enter' transition
        transition(':enter', [

            // css styles at start of transition
            style({ opacity: 0 }),

            // animation and styles at end of transition
            animate('.3s', style({ opacity: 1 }))
        ]),

        transition(':leave', [

            // css styles at start of transition
            style({ opacity: 1 }),

            // animation and styles at end of transition
            animate('.3s', style({ opacity: 0 }))
        ])
    ]);


export const fadeInOutQueryAnimation =    
    trigger('fadeInOutQueryAnimation', [

        transition(':enter', [
            query('div', [
                style({opacity: 0}),
                stagger(-30, [
                    animate('.3s', style({ opacity: 1 }))
                ])         
            ])
        ]),

        transition(':leave', [
            query('div', [
                style({opacity: 1}),
                stagger(-30, [
                    animate('.2s', style({ opacity: 0 }))
                ])
            ])
        ])

    ]);
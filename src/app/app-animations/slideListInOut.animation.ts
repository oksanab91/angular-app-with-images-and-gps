import { trigger, state, animate, transition, style, query, stagger } from '@angular/animations';

export const slideListInOutAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('slideListInOutAnimation', [
        transition(':enter', [
            query('widget, job-widget', [
                style({opacity: 0, transform: 'translateY(-100px)'}),
                stagger(-30, [
                    animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
                ])
            ], {optional: true})
        ]),

        transition(':leave', [
            query('widget, job-widget', [
                style({opacity: 1, transform: 'none'}),
                stagger(-30, [
                    animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 0, transform: 'translateY(-250px)' }))
                ])
            ], {optional: true})
        ])
    ])

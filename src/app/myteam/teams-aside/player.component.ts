import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'fpl-player',
    template: `<p>{{ player.name }}</p>`,
    styles: [``]
})
export class PlayerComponent {

    @Input() player;

    constructor() {
        console.log(this.player);
    }

}

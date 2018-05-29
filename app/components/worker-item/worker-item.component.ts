import { Component, OnInit, Input } from '@angular/core';
import { WorkersService } from '~/services/workers.service';
import { Worker } from '~/models/worker';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
    moduleId: module.id,
	selector: 'WorkerItem',
	templateUrl: 'worker-item.component.html',
	styleUrls: ['worker-item.component.css']
})

export class WorkerItemComponent implements OnInit {
	@Input() worker : Worker; 
	@Input() filter : string; 
	constructor(
		private workersService : WorkersService,
		private _router : RouterExtensions
	) { }

	ngOnInit() { }

	selectWorker() {
		this.workersService.selectWorker(this.worker);
		this._router.navigate(['/worker-detail'])
	}
}
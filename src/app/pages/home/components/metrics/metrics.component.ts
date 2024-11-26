import { Component, Input } from '@angular/core';

import { Metric } from 'src/types/metric.type';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
})
export class MetricsComponent {
  @Input() metrics: Metric[] = [];
}

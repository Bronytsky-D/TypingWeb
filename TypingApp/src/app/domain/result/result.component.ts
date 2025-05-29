import { Component, Input } from '@angular/core';
import { WordStat } from '../../core/modules/interfaces/word.stat';
import { Router } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { GameResultService } from '../../core/modules/services/game-result.service';

@Component({
  selector: 'app-result',
  standalone: false,
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {
  gameStats: any = null;
  wordStats: WordStat[] = [];
  wpmTimeline: { second: number; wpm: number }[] = [];

  wpmChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'WPM',
        borderColor: '#f58518',
        backgroundColor: 'rgba(245, 133, 24, 0.2)',
        tension: 0.3,
        fill: true,
      }
    ]
  };

  chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: { legend: { display: true } },
    scales: {
      x: { title: { display: true, text: 'Секунди' } },
      y: { beginAtZero: true, title: { display: true, text: 'WPM' } }
    }
  };

  constructor(private router: Router,private gameResultService: GameResultService) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state;
    if (state) {
      this.gameStats = state['gameStats'];
      this.wordStats = state['wordStats'];
      this.wpmChartData = state['wpmChartData'];
    }
  }


 ngOnInit(): void {
    const { gameStats, wordStats, wpmTimeline } = this.gameResultService.getResults();
    this.gameStats = gameStats;
    this.wordStats = wordStats;
    this.wpmChartData.labels = wpmTimeline.map(p => `${p.second}s`);
    this.wpmChartData.datasets[0].data = wpmTimeline.map(p => p.wpm);
  }

}

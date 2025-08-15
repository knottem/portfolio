import { Component } from '@angular/core';
import {ScrollInViewDirective} from "../shared/scroll-in-view.directive";
import {TranslatePipe} from "@ngx-translate/core";
import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';

type ExperienceType = 'work' | 'education';

interface ExperienceItemDto {
  id: string;
  title: string;
  org: string;
  location?: string;
  start: string;
  end?: string | null;
  summaryKey?: string;
  detailKeys?: string[];
  tech?: string[];
  link?: string;
  linkTextKey?: string;
}

export interface ExperienceItem extends ExperienceItemDto {
  type: ExperienceType;
  period: string;
  open?: boolean;
}

@Component({
  selector: 'app-experience',
    imports: [
        ScrollInViewDirective,
        TranslatePipe,
        CommonModule
    ],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {

  activeFilter: 'all' | ExperienceType = 'all';
  items: ExperienceItem[] = [];
  loading = true;
  error: string | null = null;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ work: ExperienceItemDto[]; education: ExperienceItemDto[] }>('/assets/experience.json')
      .subscribe({
        next: (payload) => {
          const workItems = (payload.work ?? []).map(dto => this.toItem(dto, 'work'));
          const eduItems  = (payload.education ?? []).map(dto => this.toItem(dto, 'education'));

          this.items = [...workItems, ...eduItems]
            .sort((a, b) => this.compareByStartDesc(a.start, b.start));

          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load experience data.';
          this.loading = false;
        }
      });
  }

  private toItem(dto: ExperienceItemDto, type: ExperienceType): ExperienceItem {
    return {
      ...dto,
      type,
      period: this.formatPeriod(dto.start, dto.end),
      open: false
    };
  }

  private formatPeriod(start: string, end?: string | null): string {
    const s = this.pretty(start);
    const e = end ? this.pretty(end) : 'Present';
    return `${s} — ${e}`;
  }

  private pretty(s: string): string {
    return (s ?? '').trim();
  }

  private compareByStartDesc(a: string, b: string): number {
    const toNum = (v: string) => {
      const [yy, mm] = (v ?? '').split('-');
      const year = Number(yy) || 0;
      const month = Number(mm) || 0;
      return year * 100 + month; // 202401, 202400 for YYYY
    };
    return toNum(b) - toNum(a);
  }

  get filteredItems(): ExperienceItem[] {
    if (this.activeFilter === 'all') return this.items;
    return this.items.filter(i => i.type === this.activeFilter);
  }

  get hasWork(): boolean {
    return this.items.some(i => i.type === 'work');
  }
  get hasEducation(): boolean {
    return this.items.some(i => i.type === 'education');
  }

  hasDetails(item: ExperienceItemDto): boolean {
    return (item.detailKeys?.length ?? 0) > 0 || !!item.link;
  }

  setFilter(f: 'all' | ExperienceType) { this.activeFilter = f; }
  toggle(item: ExperienceItem) { item.open = !item.open; }
  trackById(_i: number, item: ExperienceItem) { return item.id; }
}

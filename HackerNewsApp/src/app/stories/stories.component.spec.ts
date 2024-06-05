import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { StoriesComponent } from './stories.component';
import { HackerNewsService } from '../service/hacker-news.service';

describe('StoriesComponent', () => {
  let component: StoriesComponent;
  let fixture: ComponentFixture<StoriesComponent>;
  let hackerNewsService: HackerNewsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [StoriesComponent],
      providers: [HackerNewsService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoriesComponent);
    component = fixture.componentInstance;
    hackerNewsService = TestBed.inject(HackerNewsService);

    // Spy on the service method
    spyOn(hackerNewsService, 'getNewestStories').and.returnValue(of([
      { id: 1, title: 'Story 1', url: 'http://example.com/story1' },
      { id: 2, title: 'Story 2', url: 'http://example.com/story2' }
    ]));
  });

  it('should fetch newest stories on initialization', () => {
    fixture.detectChanges(); // triggers ngOnInit

    expect(component.stories.length).toBe(2);
    expect(component.stories[0].title).toBe('Story 1');
    expect(component.stories[1].title).toBe('Story 2');
  });
});

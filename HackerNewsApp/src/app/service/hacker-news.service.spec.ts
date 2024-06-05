import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HackerNewsService, Story } from './hacker-news.service';


describe('HackerNewsService', () => {
  let service: HackerNewsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HackerNewsService]
    });
    service = TestBed.inject(HackerNewsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should retrieve newest stories from the API', () => {
    const dummyStories: Story[] = [
      { id: 1, title: 'Story 1', url: 'http://example.com/story1' }, 
      { id: 2, title: 'Story 2', url: 'http://example.com/story2' }
    ];

    service.getNewestStories().subscribe(stories => {
      expect(stories).toEqual(dummyStories);
    });

    const req = httpTestingController.expectOne('https://localhost:7183/api/Stories');
    expect(req.request.method).toEqual('GET');
    req.flush(dummyStories);
  });
});

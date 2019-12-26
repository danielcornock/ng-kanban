import { TestBed } from "@angular/core/testing";

import { StoryApiService } from "./story-api.service";

describe("StoryApiService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: StoryApiService = TestBed.get(StoryApiService);
    expect(service).toBeTruthy();
  });
});

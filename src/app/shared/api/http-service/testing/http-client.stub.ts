export class HttpClientStub {
  post = jasmine.createSpy("HttpClientStub.post");
  put = jasmine.createSpy("HttpClientStub.put");
  get = jasmine.createSpy("HttpClientStub.get");
  delete = jasmine.createSpy("HttpClientStub.delete");
}

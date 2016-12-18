import { SasakiAppPage } from './app.po';

describe('sasaki-app App', function() {
  let page: SasakiAppPage;

  beforeEach(() => {
    page = new SasakiAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

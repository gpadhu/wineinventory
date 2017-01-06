import { WineInventoryPage } from './app.po';

describe('wine-inventory App', function() {
  let page: WineInventoryPage;

  beforeEach(() => {
    page = new WineInventoryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

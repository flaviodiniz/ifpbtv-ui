import { DesafiourbanaUiPage } from './app.po';

describe('desafiourbana-ui App', () => {
  let page: DesafiourbanaUiPage;

  beforeEach(() => {
    page = new DesafiourbanaUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

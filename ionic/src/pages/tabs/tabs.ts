import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { Tab1Root } from '../pages';
import { Tab2Root } from '../pages';
import { Tab3Root } from '../pages';
import { Tab4Root } from '../pages';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;
  tab4Root: any = Tab4Root;

  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";
  tab4Title = " ";

  constructor(public navCtrl: NavController, public translateService: TranslateService) {
    translateService.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE']).subscribe(values => {
      this.tab1Title = '课程';
      this.tab2Title = '搜索';
      this.tab3Title = '单词';
      this.tab4Title = '设置';
    });
  }
}

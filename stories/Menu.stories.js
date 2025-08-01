import { Menu } from '../src/components/Menu.js';
import '../src/components/menu.css';

export default {
  title: 'components/Menu',
  argTypes: {
    items: {
      control: 'object',
      description: 'メニュー項目のリスト'
    }
  }
};

export const Default = (args) => Menu(args);

Default.args = {
  items: ['ホーム', '会社情報', 'サービス', 'お問い合わせ']
};

import { Footer } from '../src/components/Footer.js';
import '../src/components/footer.css';

export default {
  title: 'components/Footer',
  argTypes: {
    copyright: {
      control: 'text',
      description: 'コピーライト表示（会社名など）'
    }
  }
};

export const Default = (args) => Footer(args);

Default.args = {
  copyright: 'マイサイト'
};
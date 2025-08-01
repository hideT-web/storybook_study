import { Header } from '../src/components/Header.js';
import '../src/components/header.css';

export default {
  title: 'components/Header',
  argTypes: {
    titleText: { control: 'text' },
    subtitleText: { control: 'text' }
  }
};

export const Default = (args) => Header(args);

Default.args = {
  titleText: 'マイサイト',
  subtitleText: 'ようこそ！'
};

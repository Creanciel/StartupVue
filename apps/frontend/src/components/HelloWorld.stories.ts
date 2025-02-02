import type { Meta, StoryObj } from '@storybook/vue3';
import HelloWorld from './HelloWorld.vue';
import { ref } from 'vue';

const meta = {
  title: 'HelloWorld',
  component: HelloWorld,
  tags: ['autodocs'],
  argTypes: {
    msg: { control: 'text' },
  },
} satisfies Meta<typeof HelloWorld>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    msg: 'Hello Storybook',
  },
};

export const CustomMessage: Story = {
  args: {
    msg: 'カスタムメッセージ',
  },
};

export const LongMessage: Story = {
  args: {
    msg: 'これは長いメッセージのサンプルです。storybookでの表示確認用です。',
  },
};

export const Rendering: Story = {
  args: {
    msg: '_',
  },
  render: () => ({
    components: { HelloWorld },
    setup: () => {
      const value = ref<string>('Hello World in render');
      return {
        value,
      };
    },
    template: `
    <div class="bg-red-500">
        <HelloWorld :msg="value" />
    </div>
`,
  }),
};

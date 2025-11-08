import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/index.ts';

// Define types for our components
interface SlateLitArgs {
  placeholder: string;
  readOnly: boolean;
  value: any[];
}

interface RichTextEditorArgs {
  value: any[];
}

const meta: Meta<SlateLitArgs> = {
  title: 'Components/SlateLit',
  component: 'slate-lit',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A text editor component using Slate and Lit libraries.',
      },
    },
  },
  argTypes: {
    placeholder: { control: 'text' },
    readOnly: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<SlateLitArgs>;

export const Default: Story = {
  args: {
    placeholder: 'This is slate-lit component',
    readOnly: false,
    value: [],
  },
  render: (args) => html`
    <slate-lit 
      .placeholder=${args.placeholder}
      .readOnly=${args.readOnly}
      .value=${args.value}
    ></slate-lit>
  `,
};

const richTextValue = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text: ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Try it out for yourself!' }],
  },
];

export const RichTextEditor: StoryObj<RichTextEditorArgs> = {
  args: {
    value: richTextValue,
  },
  render: (args) => html`
    <rich-text-editor .value=${args.value}></rich-text-editor>
  `,
};

export const RichTextEditorDarkTheme: StoryObj<RichTextEditorArgs> = {
  args: {
    value: richTextValue,
  },
  render: (args) => html`
    <style>
      .dark-theme {
        --slate-lit-text-color: #e8eaed;
        --slate-lit-bg-color: #303236;
        --slate-lit-code-background-color: hsl(220, 11%, 10%);
        --slate-lit-highlight-color: hsl(60, 100%, 50%);
      }
    </style>
    <rich-text-editor class="dark-theme" .value=${args.value}></rich-text-editor>
  `,
};
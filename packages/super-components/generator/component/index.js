/* eslint-disable import/extensions */
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readdirSync, writeFileSync } from 'node:fs';

const currentDirectory = dirname(fileURLToPath(import.meta.url));

const currentComponentList = readdirSync(
  join(currentDirectory, '../../components/'),
  {
    encoding: 'utf-8',
    withFileTypes: true,
  },
)
  .filter((folder) => folder.isDirectory())
  .map((folder) => folder.name);

const getSuperComponentSetupContent = (
  componentTag,
) => `/* DO NOT MODIFY: this file is generated by the super-component generator */
${JSON.stringify([
  ...currentComponentList,
  componentTag,
])}.forEach((component) =>
  import(
    \`../../components/\${component}/loader/index.js\`
  ).then(({ defineCustomElements }) => defineCustomElements()),
);
`;

export default (plop) => {
  plop.setGenerator('component', {
    description: 'Create a new super-component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the new component ?',
        default: 'Manager Hello',
        validate: (name) => name.length > 1,
      },
      {
        type: 'input',
        name: 'componentTag',
        message: 'What is the tag of the new component ? (start with msc-)',
        default: 'msc-hello',
        validate: (componentTag) =>
          componentTag.length > 1 &&
          componentTag.startsWith('msc-') &&
          !currentComponentList.includes(componentTag),
      },
      {
        type: 'input',
        name: 'packageName',
        message:
          'What is the package name of the new component (without msc-) ?',
        validate: (packageName) => packageName.length > 1,
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description of the new component',
        validate: (description) => description.length > 1,
      },
    ],
    actions: () => {
      return [
        {
          type: 'addMany',
          destination: join(
            currentDirectory,
            '../../components/{{ componentTag }}',
          ),
          globOptions: { dot: true },
          templateFiles: join(currentDirectory, './templates/**'),
          base: join(currentDirectory, './templates'),
        },
        ({ componentTag }) => {
          writeFileSync(
            join(
              currentDirectory,
              '../../storybook/.storybook/define-super-components.ts',
            ),
            getSuperComponentSetupContent(componentTag),
            { encoding: 'utf-8', flag: 'w' },
          );
        },
        ({ name }) =>
          `Component ${name} generated. Please run \n yarn install then yarn msc:storybook to see your component in the storybook`,
      ];
    },
  });
};

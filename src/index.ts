import type { Plugin } from 'rollup';
import { createFilter } from '@rollup/pluginutils';
import type { FilterPattern } from '@rollup/pluginutils';

export type ImportAsStringOptions = {
  include: FilterPattern;
  exclude?: FilterPattern;
  transform?: (content: string, file: string) => string;
};

export function importAsString(options: ImportAsStringOptions): Plugin {
  const { include, exclude, transform = content => content } = options;

  const filter = createFilter(include, exclude);

  return {
    name: 'importAsString',
    transform(code, id) {
      if (filter(id)) {
        const content = transform(code, id).replaceAll('`', '`');
        return {
          code: `export default \`${content}\`;`,
          map: { mappings: '' },
        };
      }
    },
  };
}

export default importAsString;

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
        const content = JSON.stringify(transform(code, id));
        return {
          code: `export default ${JSON.stringify(content)};`,
          map: { mappings: '' },
        };
      }
    },
  };
}

export default importAsString;
